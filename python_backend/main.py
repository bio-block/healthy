from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import chromadb
import time
import uuid
import cv2
import pytesseract
import spacy
from pytesseract import Output
import numpy as np
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="new_user_data")

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

try:
    nlp = spacy.load("en_core_web_sm")
except IOError:
    print("Warning: spaCy English model not found. Image anonymization will not work.")
    nlp = None


try:
    pytesseract.get_tesseract_version()
    tesseract_available = True
except Exception:
    print("Warning: Tesseract OCR not found. Image anonymization will not work.")
    tesseract_available = False

PHI_LABELS = {"PERSON", "ORG", "GPE", "DATE", "LOC", "FAC", "NORP"}

class StoreRequest(BaseModel):
    summary: str
    dataset_title: str
    cid: str
    metadata: Optional[Dict[str, Any]] = {}

class SearchRequest(BaseModel):
    query: str

class FilterRequest(BaseModel):
    filters: Dict[str, Any]
    n_results: Optional[int] = 10

def generate_id() -> str:
    timestamp = int(time.time() * 1000)
    random_suffix = hash(str(uuid.uuid4())) % 10000
    return f"{timestamp}{random_suffix}"

def mask_phi_in_image(image_cv):
    """
    Detect and mask PHI (Personal Health Information) in an image using OCR and NLP
    """
    if nlp is None:
        raise HTTPException(status_code=500, detail="spaCy English model not available. Please install it with: python -m spacy download en_core_web_sm")
    
    if not tesseract_available:
        raise HTTPException(status_code=500, detail="Tesseract OCR not available. Please install Tesseract: Windows: Download from https://github.com/UB-Mannheim/tesseract/wiki, macOS: brew install tesseract, Linux: sudo apt install tesseract-ocr")
    
    try:
        # Convert BGR to RGB for OCR processing
        rgb_image = cv2.cvtColor(image_cv, cv2.COLOR_BGR2RGB)
        
        
        ocr_data = pytesseract.image_to_data(rgb_image, output_type=Output.DICT)
        
        full_text = " ".join(ocr_data["text"])
        
        doc = nlp(full_text)
        
        phi_entities = set(ent.text.strip() for ent in doc.ents if ent.label_ in PHI_LABELS)
        
       
        for i, word in enumerate(ocr_data["text"]):
            if word.strip() in phi_entities:
                x, y, w, h = ocr_data["left"][i], ocr_data["top"][i], ocr_data["width"][i], ocr_data["height"][i]
                cv2.rectangle(image_cv, (x, y), (x + w, y + h), (0, 0, 0), -1)
        
        return image_cv
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.get("/")
async def root():
    return {
        "message": "Bio-Block Python Backend API", 
        "endpoints": {
            "/store": "Store document data",
            "/search": "Search documents", 
            "/filter": "Filter documents by metadata",
            "/search_with_filter": "Combined search and filter",
            "/anonymize_image": "Anonymize PHI in images"
        }
    }

@app.post("/anonymize_image")
async def anonymize_image(file: UploadFile = File(...)):
    """
    Anonymize PHI in JPEG/JPG/PNG images using OCR and NLP
    """
    try:
       
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        if file.content_type not in ['image/jpeg', 'image/jpg', 'image/png']:
            raise HTTPException(status_code=400, detail="Only JPEG, JPG, and PNG images are supported")
        
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
       
        image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        masked_image = mask_phi_in_image(image_cv)
        
        masked_image_rgb = cv2.cvtColor(masked_image, cv2.COLOR_BGR2RGB)
        masked_pil = Image.fromarray(masked_image_rgb)
        
        img_buffer = io.BytesIO()
        masked_pil.save(img_buffer, format='JPEG', quality=95)
        img_buffer.seek(0)

        return StreamingResponse(
            io.BytesIO(img_buffer.read()),
            media_type="image/jpeg",
            headers={"Content-Disposition": f"attachment; filename=anonymized_{file.filename}"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to anonymize image: {str(e)}")


@app.post("/store")
async def store_data(request: StoreRequest):
    try:
        print(f"Received request: {request}")  
        doc_id = generate_id()
        print(f"Generated ID: {doc_id}") 
        
     
        combined_document = f"Dataset Title: {request.dataset_title}\n{request.summary}"
        
        disease_tags = request.metadata.get("disease_tags")
        if disease_tags:
            combined_document += f"\nDisease Tags: {disease_tags}"
        
        metadata = {
            "cid": request.cid,
            "dataset_title": request.dataset_title,
            **request.metadata
        }
        print(f"Metadata: {metadata}") 
        print(f"Combined document: {combined_document}")
        
        collection.add(
            ids=[doc_id],
            documents=[combined_document],
            metadatas=[metadata]
        )
        
        return {"message": "Stored successfully", "cid": request.cid}
        
    except Exception as e:
        print(f"Error in store_data: {str(e)}") 
        print(f"Error type: {type(e)}") 
        import traceback
        traceback.print_exc()  
        raise HTTPException(status_code=500, detail=f"Failed to store data: {str(e)}")

@app.post("/search")
async def search_data(request: SearchRequest):
    try:
        search_results = collection.query(
            query_texts=[request.query],
            n_results=5,
            include=["documents", "metadatas", "distances"]
        )
        
        results = []
        if search_results["ids"][0]:
            for i, doc_id in enumerate(search_results["ids"][0]):
                metadata = search_results["metadatas"][0][i]
                distance = search_results["distances"][0][i]
                document = search_results["documents"][0][i]
                
                score = 1 / (1 + distance)
                
                results.append({
                    "id": doc_id,
                    "cid": metadata.get("cid", ""),
                    "score": score,
                    "summary": document,
                    "metadata": metadata
                })
        
        return {"results": results}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to search data")

@app.post("/filter")
async def filter_data(request: FilterRequest):
    try:
        print(f"Filter request: {request.filters}") 
        
        filters = request.filters
        if len(filters) > 1:
           
            and_conditions = [{key: value} for key, value in filters.items()]
            where_clause = {"$and": and_conditions}
        else:
           
            where_clause = filters
            
        print(f"Where clause: {where_clause}")  
        
       
        search_results = collection.get(
            where=where_clause,
            include=["documents", "metadatas"]
        )
        
        print(f"Filter results count: {len(search_results['ids']) if search_results['ids'] else 0}")  # Debug log
        
        results = []
        if search_results["ids"]:
            for i, doc_id in enumerate(search_results["ids"]):
                metadata = search_results["metadatas"][i]
                document = search_results["documents"][i]
                
                results.append({
                    "id": doc_id,
                    "cid": metadata.get("cid", ""),
                    "summary": document,
                    "metadata": metadata
                })
        
        if request.n_results and len(results) > request.n_results:
            results = results[:request.n_results]
        
        return {"results": results, "total_found": len(search_results["ids"])}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to filter data: {str(e)}")

@app.post("/search_with_filter")
async def search_with_filter(request: Dict[str, Any]):
    """
    Combined semantic search with metadata filtering
    Request body should contain:
    - query: text to search for
    - filters: metadata filters (optional)
    - n_results: number of results (optional, default 5)
    """
    try:
        query = request.get("query")
        filters = request.get("filters", {})
        n_results = request.get("n_results", 5)
        
        print(f"Search with filter - Query: {query}, Filters: {filters}")  
        
        if not query:
            raise HTTPException(status_code=400, detail="Query is required")
     
        search_kwargs = {
            "query_texts": [query],
            "n_results": n_results,
            "include": ["documents", "metadatas", "distances"]
        }
        
        if filters:
         
            if len(filters) > 1:
                and_conditions = [{key: value} for key, value in filters.items()]
                search_kwargs["where"] = {"$and": and_conditions}
            else:
                search_kwargs["where"] = filters
        
        search_results = collection.query(**search_kwargs)
        
        results = []
        if search_results["ids"][0]:
            for i, doc_id in enumerate(search_results["ids"][0]):
                metadata = search_results["metadatas"][0][i]
                distance = search_results["distances"][0][i]
                document = search_results["documents"][0][i]
           
                score = 1 / (1 + distance)
                
                results.append({
                    "id": doc_id,
                    "cid": metadata.get("cid", ""),
                    "score": score,
                    "summary": document,
                    "metadata": metadata
                })
        
        return {"results": results}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to search with filter: {str(e)}")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3002)