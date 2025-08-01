# Bio-Block: Secure Document Management System

Bio-Block is a decentralized document management system that leverages blockchain technology, IPFS (InterPlanetary File System), and vector databases to provide secure, verifiable storage and retrieval of documents with advanced search and filtering capabilities.

**🌐 Live Demo: [https://healthyprototype.vercel.app/](https://healthyprototype.vercel.app/)**

**🔗 Backend Services:**
- **Python Backend**: [https://bioblock-python-backend.onrender.com](https://bioblock-python-backend.onrender.com)
- **JavaScript Backend**: [https://bioblock-js-backend.onrender.com](https://bioblock-js-backend.onrender.com)

## Recent Updates (ImagePHIremoval Branch)

- **Image PHI Anonymization**: New OCR + NLP-based anonymization for medical images (JPEG, PNG) using Tesseract OCR and spaCy NLP
- **Dual-Backend Architecture**: Smart routing system - Excel files to JavaScript backend (port 3001), image files to Python backend (port 3002)
- **Enhanced File Support**: Streamlined to support only Excel (.xlsx, .xls) and image files (.jpg, .jpeg, .png) with PHI removal capabilities
- **Advanced PHI Detection**: Comprehensive entity recognition for medical images including names, dates, addresses, phone numbers, and medical identifiers
- **Improved Upload Flow**: Updated upload interface with dual-backend routing and enhanced progress tracking for image anonymization
- **Simplified Gender Options**: Standardized gender field to Male, Female, Other (now optional) across upload and search interfaces
- **Updated Search Filters**: Removed price range filter, updated file type options to match supported formats
- **Complete UI Redesign**: Modern glassmorphism design with gradient backgrounds and enhanced visual appeal
- **Enhanced Upload Experience**: Interactive progress modal with real-time step tracking during document upload
- **Improved Main Dashboard**: Redesigned homepage with feature cards, gradient text effects, and modern navigation
- **Advanced Search Interface**: Enhanced search page with collapsible filter panels and improved result display

## Features

- **Modern UI/UX Design**: Complete interface redesign with glassmorphism effects, gradient backgrounds, and responsive layouts
- **Interactive Upload Process**: Step-by-step progress modal showing real-time upload status with visual indicators
- **Document Upload**: Upload documents to IPFS with secure, decentralized storage
- **Enhanced Data Collection**: Comprehensive metadata collection including dataset title, disease tags, data type (Personal/Institution), demographics, and data source
- **Advanced Document Anonymization**: 
  - **Excel Files**: Automatic PHI anonymization with wallet-based hashing for personal data
  - **Image Files**: OCR + NLP-based PHI detection and masking for medical images (JPEG, PNG)
  - **Dual-Backend Processing**: Smart routing - Excel files to JavaScript backend, images to Python backend
- **Supported File Types**: Streamlined support for Excel (.xlsx, .xls) and image files (.jpg, .jpeg, .png) only
- **Blockchain Verification**: Store document hashes on the Ethereum blockchain for tamper-proof verification
- **Advanced Search & Filtering**: Find documents using natural language queries with vector search and comprehensive metadata filtering
- **Enhanced User Dashboard**: Complete dashboard with modern design to view earnings, withdraw funds, and manage documents
- **Document Management**: View all uploaded documents with improved pricing and download capabilities
- **Document Downloads**: Direct download of owned documents with original encryption/decryption
- **Document Marketplace**: Set prices for documents and earn from document purchases
- **Earnings Tracking**: Real-time earnings display and withdrawal functionality
- **Wallet Integration**: Seamless connection with Ethereum wallets (like MetaMask)
- **Environment Flexibility**: Easy switching between local and production environments

## Project Structure

```
healthy/
├── prototype/                 # React frontend application
│   ├── src/
│   │   ├── App.js            # Main application with navigation
│   │   ├── contractService.js # Smart contract interactions
│   │   ├── UploadFile.js     # IPFS upload via Pinata
│   │   ├── upload_data.js    # Document upload interface
│   │   ├── search_data.js    # Document search interface
│   │   ├── search.js         # Enhanced search component
│   │   ├── Dashboard.js      # User dashboard with earnings and document management
│   │   ├── encryptionUtils.js # Document encryption utilities
│   │   └── DocumentStorage.sol # Smart contract source
│   └── package.json
├── python_backend/           # FastAPI service
│   ├── main.py               # ChromaDB, search endpoints, and image PHI anonymization
│   ├── requirements.txt
│   ├── vercel.json           # Vercel deployment config
│   └── chroma_db/            # Local ChromaDB storage
├── javascript_backend/        # Express.js API server
│   ├── controllers/          # Business logic controllers
│   │   ├── anonymizeController.js # Excel file anonymization logic
│   │   └── healthController.js    # Health check logic
│   ├── routes/              # API route definitions
│   │   ├── anonymize.js     # Excel anonymization routes
│   │   └── health.js        # Health check routes
│   ├── server.js            # Main server file
│   ├── vercel.json          # Vercel deployment config
│   └── package.json
├── testing/                  # Test files and utilities
└── README.md
```

## Architecture

The project consists of multiple components:

### Frontend (React)
- Modern UI built with React.js and Tailwind CSS featuring glassmorphism design
- Gradient backgrounds, rounded corners, and shadow effects for enhanced visual appeal
- Interactive progress modals with real-time step tracking during uploads
- Wallet integration using Ethereum provider
- Enhanced document upload and search interfaces with improved user experience
- Complete user dashboard with earnings tracking and modern design elements
- Document management with download functionality and visual improvements
- Real-time earnings display and withdrawal capabilities

### JavaScript Backend (Express)
- RESTful API with organized MVC structure
- Controllers for business logic separation
- Route handlers for API endpoints
- **Excel File Processing**: File upload handling with multer for Excel anonymization
- Wallet-based anonymization for personal data types
- CORS enabled for cross-origin requests

### Python Backend (FastAPI)
- Text embedding service using ChromaDB
- Document search functionality with similarity scoring
- Vector storage and retrieval for semantic search
- **Image PHI Anonymization**: OCR + NLP processing for medical images
- Tesseract OCR for text extraction from images
- spaCy NLP for medical entity recognition and masking

**Updated Dependencies (requirements.txt):**
- `fastapi` - Web framework
- `uvicorn[standard]` - ASGI server
- `chromadb` - Vector database
- `opencv-python` - Computer vision library
- `pytesseract` - Tesseract OCR wrapper
- `spacy` - Natural language processing
- `numpy` - Numerical computing
- `Pillow` - Image processing library
- `python-multipart` - File upload handling

### Smart Contracts (Solidity)
- Document verification on Ethereum blockchain
- Document marketplace functionality
- Earnings tracking and withdrawal system
- User document ownership management

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- MetaMask or other Ethereum wallet
- Access to Ethereum testnet (Sepolia)

### Python Backend Dependencies
The Python backend requires additional system-level dependencies for image PHI anonymization:

- **Tesseract OCR**: Text extraction from images
  - Windows: Download installer from GitHub
  - macOS: Install via Homebrew
  - Linux: Install via package manager
- **spaCy English Model**: Natural language processing for medical entity recognition
- **OpenCV**: Image processing and computer vision
- **PIL/Pillow**: Python image processing library

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bio-block.git
   cd bio-block
   ```

2. **Set up environment variables**

   Create a `.env` file in the `javascript_backend` directory:
   ```env
   QDRANT_API_KEY=your_qdrant_api_key
   QDRANT_URL=your_qdrant_url
   ```

   Create a `.env` file in the `prototype` directory:
   ```env
   REACT_APP_PINATA_JWT=your_pinata_jwt_key
   REACT_APP_ENCRYPTION_KEY=your_32_byte_encryption_key
   REACT_APP_PYTHON_BACKEND_URL=your_deployed_python_backend_url
   REACT_APP_JS_BACKEND_URL=http://localhost:3001
   ```
   *Note: 
   - Generate a secure 32-byte encryption key for document encryption
   - Replace `your_deployed_python_backend_url` with your actual deployment URL
   - JavaScript backend URL can be updated when deployed*

3. **Install frontend dependencies**
   ```bash
   cd prototype
   npm install
   ```

4. **Install JavaScript backend dependencies**
   ```bash
   cd ../javascript_backend
   npm install
   ```

5. **Install Python backend dependencies**
   ```bash
   cd ../python_backend
   pip install -r requirements.txt
   ```

6. **Install additional dependencies for image PHI anonymization**
   
   **Download spaCy English model:**
   ```bash
   python -m spacy download en_core_web_sm
   ```
   
   **Install Tesseract OCR:**
   - **Windows**: Download from [UB-Mannheim/tesseract](https://github.com/UB-Mannheim/tesseract/wiki)
   - **macOS**: `brew install tesseract`
   - **Linux**: `sudo apt install tesseract-ocr`

### Running the Application

**Option 1: Using Deployed Python Backend**

1. **Start the JavaScript backend (port 3001)**
   ```bash
   cd javascript_backend
   node server.js
   ```

2. **Start the React frontend**
   ```bash
   cd prototype
   npm start
   ```
   *The frontend will automatically use the deployed Python backend*

**Option 2: Full Local Development**

1. **Start the Python backend (port 3002)**
   ```bash
   cd python_backend
   uvicorn main:app --reload --port 3002
   ```

2. **Start the JavaScript backend (port 3001)**
   ```bash
   cd javascript_backend
   node server.js
   ```

3. **Start the React frontend**
   ```bash
   cd prototype
   npm start
   ```
   *Update environment variables to use localhost URLs for local development*

4. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### JavaScript Backend (Express.js)
**🌐 Live URL**: `https://bioblock-js-backend.onrender.com`
**🔧 Local URL**: `http://localhost:3001`

- `GET /` - Root endpoint with API information
- `GET /api/health` - Health check endpoint to verify server status
- `POST /api/anonymize` - Anonymize PHI (Personal Health Information) in Excel files
  - Input: Excel file (.xlsx or .xls) via multipart form data
  - Optional: Wallet address for personal data anonymization
  - Output: Anonymized Excel file with appropriate ID generation
- Organized with MVC architecture (controllers and routes)

### Python Backend (FastAPI)
**🌐 Live URL**: `https://bioblock-python-backend.onrender.com`
**🔧 Local URL**: `http://localhost:3002`

- `GET /` - Health check and API information
- `POST /store` - Store document summaries and metadata in ChromaDB
- `POST /search` - Search documents using natural language queries
- `POST /filter` - Filter documents by metadata criteria (data type, gender, data source, file type)
- `POST /search_with_filter` - Combined semantic search with metadata filtering
- `POST /anonymize_image` - Anonymize PHI in medical images
  - Input: Image file (.jpg, .jpeg, .png) via multipart form data
  - Optional: Wallet address for personal data anonymization
  - Output: Anonymized image with PHI text masked/removed
  - Uses: Tesseract OCR + spaCy NLP for medical entity detection
- Returns similarity scores, document metadata, and summaries

### Example API Usage
```bash
# Health check - JavaScript backend
curl https://bioblock-js-backend.onrender.com/api/health

# Health check - Python backend
curl https://bioblock-python-backend.onrender.com/

# Search documents (POST request)
curl -X POST https://bioblock-python-backend.onrender.com/search \
  -H "Content-Type: application/json" \
  -d '{"query": "patient information", "k": 5}'

# Filter documents by metadata
curl -X POST https://bioblock-python-backend.onrender.com/filter \
  -H "Content-Type: application/json" \
  -d '{"filters": {"dataType": "Personal", "gender": "Male"}, "n_results": 10}'

# Combined search with filters
curl -X POST https://bioblock-python-backend.onrender.com/search_with_filter \
  -H "Content-Type: application/json" \
  -d '{"query": "diabetes research", "filters": {"dataType": "Institution", "dataSource": "Hospital"}, "n_results": 5}'

# Anonymize medical image (multipart form data)
curl -X POST https://bioblock-python-backend.onrender.com/anonymize_image \
  -F "file=@medical_scan.jpg" \
  -F "walletAddress=0x1234..."
```

## Environment Configuration

The application uses environment variables to configure backend URLs:

- **REACT_APP_PYTHON_BACKEND_URL**: Python backend URL (deployed on Render)
- **REACT_APP_JS_BACKEND_URL**: JavaScript backend URL (localhost or deployed)
- **REACT_APP_PINATA_JWT**: Pinata API key for IPFS uploads
- **REACT_APP_ENCRYPTION_KEY**: 32-byte key for document encryption

This allows seamless switching between local development and production environments.

## Enhanced Upload System

The document upload system has been significantly enhanced with both comprehensive metadata collection and an interactive user experience:

### Visual Progress Tracking
- **Interactive Progress Modal**: Step-by-step visual feedback during upload process
- **Real-time Status Updates**: Each upload stage is clearly displayed with progress indicators
- **Six-Step Process Visualization**:
  1. 📁 Preparing file
  2. 🔄 Anonymizing data (for Excel/Image files)
  3. 🔒 Encrypting file
  4. 📤 Uploading to IPFS
  5. ⛓️ Storing on blockchain
  6. 💾 Saving metadata
- **Error Handling**: Clear visual feedback for any step failures with specific error messages
- **Success Confirmation**: Complete process confirmation with transaction details

### Required Fields
- **Dataset Title**: Unique identifier for the document
- **Description**: Detailed content description
- **Disease Tags**: Medical condition tags (e.g., cancer, diabetes, heart disease)
- **Data Type**: Personal or Institution
- **Gender** (Optional): Male, Female, Other
- **Data Source**: Hospital, Clinic, Laboratory, Research Institution, Medical Device, Electronic Health Record, Patient Self-Reported, Insurance Claims, Other
- **Price**: ETH price for document access
- **File Types**: Excel (.xlsx, .xls) and Images (.jpg, .jpeg, .png) only### Data Processing
All collected metadata is formatted and sent to the Python backend as:
```
Dataset Title: {user input}
Description: {user input}
Disease Tags: {user input}
Data Type: Personal/Institution
Gender: {user selection}
Age: {user input} or Age Range: {user selection}
Data Source: {user selection}
```

### Anonymization Logic
- **Excel Files**: 
  - Personal Data: Uses wallet address for consistent anonymization across all patient data
  - Institution Data: Uses standard anonymization methods without wallet dependency
- **Image Files**: 
  - OCR text extraction using Tesseract
  - NLP entity recognition using spaCy for medical terms
  - Automatic masking of detected PHI (names, dates, addresses, phone numbers, medical IDs)
  - Maintains image quality while removing sensitive information

## Advanced Search & Filtering System

The platform features a sophisticated search system that combines semantic search with comprehensive filtering capabilities:

### Search Options
1. **Semantic Search**: Natural language queries using vector similarity
2. **Metadata Filtering**: Filter documents by specific criteria without search queries
3. **Combined Search**: Semantic search enhanced with metadata filters for precise results

### Available Filters
- **Data Type**: Personal or Institution
- **Gender**: Male, Female, Other
- **Data Source**: Hospital, Clinic, Laboratory, Research Institution, Medical Device, Electronic Health Record, Patient Self-Reported, Insurance Claims, Other
- **File Type**: Excel (XLSX, XLS) and Images (JPEG, PNG)

### Search Endpoints
- `/search` - Semantic search with natural language queries
- `/filter` - Pure metadata filtering without text search
- `/search_with_filter` - Combined semantic and metadata filtering

## How It Works

1. **Modern Interface**: Users interact through a beautifully designed interface with glassmorphism effects and gradient backgrounds
2. **Document Upload**: Users upload files through the enhanced React interface with comprehensive metadata collection
3. **Interactive Progress**: Real-time progress modal shows each step of the upload process with visual indicators
4. **Data Collection**: Enhanced form collects dataset title, description, disease tags, data type, demographics, and data source
5. **File Processing**: Smart routing - Excel files to JavaScript backend for Excel anonymization, image files to Python backend for OCR + NLP processing
6. **PHI Anonymization**: 
   - Excel: Standard cell-based anonymization with wallet-based hashing for personal data
   - Images: OCR text extraction + spaCy NLP entity recognition with automatic masking
6. **IPFS Storage**: Files are encrypted and stored on IPFS using Pinata service with progress tracking
7. **Blockchain Recording**: Document hashes are stored on Ethereum for verification with transaction feedback
8. **Vector Embedding**: Document summaries with metadata are converted to vectors and stored in ChromaDB
9. **Enhanced Search Experience**: Users can search using natural language queries with improved filter interfaces
10. **Advanced Filtering**: Apply metadata filters through collapsible panels for precise document discovery
11. **Document Management**: Users can view all their uploaded documents in the modernized dashboard
12. **Earnings Tracking**: Real-time tracking of earnings from document purchases with enhanced visual display
13. **Secure Downloads**: Direct download of owned documents with automatic decryption
14. **Marketplace**: Users can purchase documents from others and earn from their own uploads

## Smart Contract

The project uses a smart contract (`DocumentStorage.sol`) deployed on the Ethereum blockchain. Key functionalities include:

- Store document IPFS hashes linked to user addresses
- Set prices for documents
- Purchase documents from other users
- Withdraw earnings from document sales
- Track user document ownership
- Manage document marketplace transactions

## Security Features

- Document hashes stored on blockchain for verification
- Decentralized storage via IPFS
- File encryption/decryption for secure document handling
- Secure wallet integration
- Advanced document anonymization with data type-specific handling
- **Excel Files**: Personal data anonymization using wallet-based hashing
- **Image Files**: OCR + NLP-based PHI detection and masking using Tesseract and spaCy
- **Dual-Backend Architecture**: Smart file routing for optimized processing
- Advanced document search with multiple filter options (data type, gender, data source, file type)
- Hash-based file naming for download security
- Interactive progress tracking with secure step-by-step validation
- Enhanced UI security with modern design patterns and user feedback systems

## Deployment

### Live Application
**🌐 Frontend**: [https://healthyprototype.vercel.app/](https://healthyprototype.vercel.app/)
**🔗 Python Backend**: [https://bioblock-python-backend.onrender.com](https://bioblock-python-backend.onrender.com)
**🔗 JavaScript Backend**: [https://bioblock-js-backend.onrender.com](https://bioblock-js-backend.onrender.com)

### Current Deployment Status
- **Frontend**: ✅ Deployed on Vercel
- **Python Backend**: ✅ Deployed on Render
- **JavaScript Backend**: ✅ Deployed on Render
- **Smart Contract**: 🔄 Ready for Ethereum mainnet deployment

### Deployment Options
- **Frontend**: Deployed to Vercel with environment variables configured
- **Python Backend**: Can be deployed to Render or Vercel with included configuration
- **JavaScript Backend**: Can be deployed to Render, Vercel, or Heroku
  - **Render**: Use build command `npm install` and start command `node server.js`
  - **Vercel**: Uses included `vercel.json` configuration
- **Smart Contract**: Should be deployed to Ethereum mainnet for production use

### Environment Variables for Production
The application uses the following production URLs:
```env
REACT_APP_PYTHON_BACKEND_URL=https://bioblock-python-backend.onrender.com
REACT_APP_JS_BACKEND_URL=https://bioblock-js-backend.onrender.com
REACT_APP_PINATA_JWT=your_pinata_jwt_key_here
REACT_APP_ENCRYPTION_KEY=your_32_byte_encryption_key_here
```

### Deployment Commands for Render
For JavaScript backend deployment on Render:
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

For Python backend deployment on Render:
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [IPFS](https://ipfs.io/) for decentralized storage
- [Pinata](https://pinata.cloud/) for IPFS pinning service
- [Ethereum](https://ethereum.org/) for blockchain functionality
- [ChromaDB](https://www.trychroma.com/) for vector database capabilities
- [Qdrant](https://qdrant.tech/) for vector search capabilities
- [React](https://reactjs.org/) for frontend framework
- [FastAPI](https://fastapi.tiangolo.com/) for Python backend
- [Express.js](https://expressjs.com/) for JavaScript backend