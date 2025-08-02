# Bio-Block: Secure Document Management System

Bio-Block is a decentralized document management system that leverages blockchain technology, IPFS (InterPlanetary File System), and vector databases to provide secure, verifiable storage and retrieval of documents with advanced search and filtering capabilities.

**🌐 Live Demo: [https://healthyprototype.vercel.app/](https://healthyprototype.vercel.app/)**

**🔗 Backend Services:**
- **Python Backend**: [https://bioblock-python-backend.onrender.com](https://bioblock-python-backend.onrender.com)
- **JavaScript Backend**: [https://bioblock-js-backend.onrender.com](https://bioblock-js-backend.onrender.com)

## Recent Updates (Optimization Branch)

### 🚀 **Streaming Encryption for Large Files (Latest)**
- **Memory-Safe Processing**: Revolutionary streaming encryption system that prevents browser crashes on large files
- **Automatic Threshold Detection**: Files >5MB after anonymization automatically use streaming encryption
- **Chunk-Based Processing**: Intelligent chunk processing (512KB to 4MB chunks based on file size) for optimal memory usage
- **Real-Time Progress Tracking**: Visual progress indicators for streaming encryption with chunk-by-chunk feedback
- **Hybrid Architecture**: Seamless fallback between streaming and traditional encryption based on file size
- **Browser Compatibility**: Uses native browser APIs (TextEncoder/TextDecoder) instead of Node.js Buffer for universal compatibility
- **Smart Decryption**: Automatic detection of encryption format (streaming vs traditional) for backward compatibility
- **Performance Optimization**: Reduced memory usage from GB+ to MB for large file processing, eliminating browser crashes

### 📊 **Enhanced Features**
- **Excel Preview Feature**: New preview functionality that generates 5% sample data from anonymized Excel files for user evaluation before purchase
- **Integrated Preview Generation**: Preview is extracted from already anonymized data ensuring consistency and efficiency
- **Free Preview Downloads**: Users can download Excel previews without payment or wallet connection to evaluate data structure
- **Preview Visual Indicators**: Search results show "Preview Available" badges and dedicated preview download buttons for Excel files
- **Image PHI Anonymization**: New OCR + NLP-based anonymization for medical images (JPEG, PNG) using Tesseract OCR and spaCy NLP
- **Dual-Backend Architecture**: Smart routing system - Excel files to JavaScript backend (port 3001), image files to Python backend (port 3002)
- **Enhanced File Support**: Streamlined to support only Excel (.xlsx, .xls) and image files (.jpg, .jpeg, .png) with PHI removal capabilities
- **Advanced PHI Detection**: Comprehensive entity recognition for medical images including names, dates, addresses, phone numbers, and medical identifiers
- **Improved Upload Flow**: Updated upload interface with dual-backend routing and enhanced progress tracking for image anonymization
- **Simplified Gender Options**: Standardized gender field to Male, Female, Other (now optional) across upload and search interfaces
- **Updated Search Filters**: Removed price range filter, updated file type options to match supported formats

### 🎨 **UI/UX Improvements**
- **Complete UI Redesign**: Modern glassmorphism design with gradient backgrounds and enhanced visual appeal
- **Enhanced Upload Experience**: Interactive progress modal with real-time step tracking during document upload
- **Improved Main Dashboard**: Redesigned homepage with feature cards, gradient text effects, and modern navigation
- **Advanced Search Interface**: Enhanced search page with collapsible filter panels and improved result display

## Features

- **🔄 Streaming Encryption**: Revolutionary memory-safe encryption system for large files (>5MB) that prevents browser crashes and provides real-time progress tracking
- **⚡ Hybrid Processing**: Intelligent switching between streaming and traditional encryption based on file size for optimal performance
- **🧠 Smart File Handling**: Automatic threshold detection and chunk-based processing with adaptive chunk sizes (512KB to 4MB)
- **📱 Browser-Native**: Uses TextEncoder/TextDecoder APIs for universal browser compatibility without Node.js dependencies
- **🔄 Backward Compatibility**: Smart decryption automatically detects and handles both streaming and traditional encryption formats
- **Modern UI/UX Design**: Complete interface redesign with glassmorphism effects, gradient backgrounds, and responsive layouts
- **Interactive Upload Process**: Step-by-step progress modal showing real-time upload status with visual indicators for both anonymization and encryption
- **Document Upload**: Upload documents to IPFS with secure, decentralized storage and memory-efficient processing
- **Enhanced Data Collection**: Comprehensive metadata collection including dataset title, disease tags, data type (Personal/Institution), demographics, and data source
- **Advanced Document Anonymization**: 
  - **Excel Files**: Automatic PHI anonymization with wallet-based hashing for personal data and integrated 5% preview generation
  - **Image Files**: OCR + NLP-based PHI detection and masking for medical images (JPEG, PNG)
  - **Dual-Backend Processing**: Smart routing - Excel files to JavaScript backend, images to Python backend
  - **Preview Generation**: Free 5% sample extraction from anonymized Excel data for evaluation before purchase
- **Supported File Types**: Streamlined support for Excel (.xlsx, .xls) and image files (.jpg, .jpeg, .png) only
- **Blockchain Verification**: Store document hashes on the Ethereum blockchain for tamper-proof verification
- **Advanced Search & Filtering**: Find documents using natural language queries with vector search and comprehensive metadata filtering
- **Enhanced User Dashboard**: Complete dashboard with modern design to view earnings, withdraw funds, and manage documents
- **Document Management**: View all uploaded documents with improved pricing and download capabilities
- **Document Downloads**: Direct download of owned documents with original encryption/decryption
- **Document Marketplace**: Set prices for documents and earn from document purchases with preview functionality for Excel files
- **Excel Preview System**: Free preview downloads showing 5% sample of anonymized Excel data for informed purchase decisions
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
│   │   ├── upload_data.js    # Document upload interface with streaming encryption
│   │   ├── search_data.js    # Document search interface with smart decryption
│   │   ├── search.js         # Enhanced search component
│   │   ├── Dashboard.js      # User dashboard with earnings and document management
│   │   ├── encryptionUtils.js # Traditional document encryption utilities
│   │   ├── utils/
│   │   │   └── streamingEncryption.js # Memory-safe streaming encryption for large files
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
- `POST /api/anonymize` - Anonymize PHI (Personal Health Information) in Excel files with optional preview generation
  - Input: Excel file (.xlsx or .xls) via multipart form data
  - Optional: Wallet address for personal data anonymization
  - Optional: `generatePreview=true` parameter to create 5% sample preview
  - Output: Full anonymized Excel file, and preview file (if requested) containing first 5% of rows (min 5, max 50)
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
- **Interactive Progress Modal**: Step-by-step visual feedback during upload process with streaming encryption progress
- **Real-time Status Updates**: Each upload stage is clearly displayed with progress indicators, including chunk-by-chunk encryption progress
- **Six-Step Process Visualization**:
  1. 📁 Preparing file
  2. 🔄 Anonymizing data (for Excel/Image files)
  3. 🔒 Encrypting file (with streaming progress for large files >5MB)
  4. 📤 Uploading to IPFS
  5. ⛓️ Storing on blockchain
  6. 💾 Saving metadata
- **Streaming Encryption Feedback**: Real-time chunk processing progress with percentage completion for large files
- **Memory Usage Indicators**: Visual feedback showing when streaming encryption is being used to prevent browser crashes
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
  - **Preview Generation**: Extracts first 5% of rows from already anonymized data (minimum 5 rows, maximum 50 rows)
  - **Integrated Processing**: Preview generated during anonymization process for efficiency and consistency
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

## Advanced Streaming Encryption System

Bio-Block features a revolutionary streaming encryption system designed to handle large files without browser memory limitations.

### 🧠 **Intelligent Processing Logic**

```javascript
// Automatic streaming decision based on anonymized file size
const shouldUseStreaming = fileSize > 5 * 1024 * 1024; // 5MB threshold

if (shouldUseStreaming) {
  // 🔄 Streaming encryption for large files
  const encryptedFile = await streamer.encryptFileStream(file, progressCallback);
} else {
  // ⚡ Traditional encryption for small files  
  const encryptedFile = encryptFile(fileData);
}
```

### 📊 **Chunk Processing Architecture**

- **Adaptive Chunk Sizes**: Automatically optimized based on file size
  - Files < 10MB: 512KB chunks
  - Files < 100MB: 1MB chunks  
  - Files < 1GB: 2MB chunks
  - Files > 1GB: 4MB chunks

- **Memory Management**: Each chunk processed independently, preventing memory overflow
- **Progress Tracking**: Real-time feedback showing chunk processing progress
- **UI Responsiveness**: Non-blocking processing keeps browser interface responsive

### 🔄 **Smart Decryption Compatibility**

```javascript
// Automatic format detection for backward compatibility
function smartDecrypt(encryptedData) {
  if (isStreamingFormat(encryptedData)) {
    return decryptFileStream(encryptedData);
  } else {
    return traditionalDecrypt(encryptedData);
  }
}
```

### 💡 **Performance Benefits**

- **Memory Usage**: Reduced from GB+ to MB for large files
- **Browser Stability**: Eliminates crashes on files >50MB
- **Processing Speed**: Optimized chunk sizes for faster encryption
- **User Experience**: Visual progress tracking with real-time feedback

### 🔧 **Technical Implementation**

```javascript
// StreamingEncryption class features:
class StreamingEncryption {
  // Intelligent chunk size optimization
  getOptimalChunkSize(fileSize) { ... }
  
  // Memory-safe streaming encryption
  async encryptFileStream(file, progressCallback) { ... }
  
  // Compatible streaming decryption  
  async decryptFileStream(encryptedData, progressCallback) { ... }
  
  // Automatic format detection
  shouldUseStreaming(fileSize) { ... }
}
```

## Excel Preview System

Bio-Block features an innovative preview system for Excel files that allows users to evaluate data quality and structure before making a purchase decision.

1. **Integrated Generation**: During the Excel anonymization process, the system automatically extracts the first 5% of rows from the **already anonymized** data
2. **Smart Sampling**: Preview contains minimum 5 rows and maximum 50 rows, ensuring useful sample size regardless of file size
3. **Consistency**: Preview data is identical in anonymization quality to the full file since it's extracted post-anonymization
4. **Dual Upload**: Both the full anonymized file and the preview file are encrypted and uploaded to IPFS separately
5. **Free Access**: Users can download previews without payment or wallet connection

### Preview Features

- **📊 Data Structure**: Shows column headers and data types
- **🔒 Anonymization Quality**: Displays actual anonymized data, not raw PHI
- **📏 Sample Size**: 5% of total rows (adaptive based on file size)
- **💰 Free Download**: No ETH payment required for preview access
- **🎯 Purchase Confidence**: Informed decision-making before buying full dataset

### User Experience

- **Visual Indicators**: Search results show "Preview Available" badges for Excel files
- **Dedicated Button**: Blue "Preview (5%)" download button alongside purchase button
- **Instant Download**: Immediate access without MetaMask or transaction confirmation
- **File Naming**: Preview files are clearly labeled as `preview_{originalFileName}.xlsx`

### Technical Implementation

```javascript
// Preview generation during anonymization
if (generatePreview && isExcelFile) {
  const previewRows = Math.max(5, Math.min(50, Math.ceil(totalRows * 0.05)));
  const previewData = anonymizedData.slice(0, previewRows);
  return { mainFile: fullAnonymizedFile, previewFile: previewSample };
}
```

The preview system enhances user trust and purchase confidence by providing transparent access to data quality and structure before financial commitment.

## How It Works

1. **Modern Interface**: Users interact through a beautifully designed interface with glassmorphism effects and gradient backgrounds
2. **Document Upload**: Users upload files through the enhanced React interface with comprehensive metadata collection
3. **Interactive Progress**: Real-time progress modal shows each step of the upload process with visual indicators
4. **Data Collection**: Enhanced form collects dataset title, description, disease tags, data type, demographics, and data source
5. **File Processing**: Smart routing - Excel files to JavaScript backend for Excel anonymization, image files to Python backend for OCR + NLP processing
6. **PHI Anonymization**: 
   - Excel: Standard cell-based anonymization with wallet-based hashing for personal data and integrated 5% preview generation
   - Images: OCR text extraction + spaCy NLP entity recognition with automatic masking
7. **Memory-Safe Encryption**: Revolutionary streaming encryption system automatically engages for files >5MB after anonymization, preventing browser crashes
8. **Chunk Processing**: Large files processed in optimized chunks (512KB to 4MB) with real-time progress tracking and UI responsiveness
9. **Preview Generation**: For Excel files, 5% sample is extracted from the anonymized data and uploaded separately to IPFS for free evaluation
10. **IPFS Storage**: Both main files and preview files (if applicable) are encrypted using streaming or traditional encryption and stored on IPFS using Pinata service with progress tracking
11. **Blockchain Recording**: Document hashes are stored on Ethereum for verification with transaction feedback
12. **Vector Embedding**: Document summaries with metadata are converted to vectors and stored in ChromaDB
11. **Enhanced Search Experience**: Users can search using natural language queries with improved filter interfaces
12. **Advanced Filtering**: Apply metadata filters through collapsible panels for precise document discovery
13. **Preview Downloads**: Users can download Excel previews for free to evaluate data structure before purchase
14. **Smart Decryption**: Automatic detection and handling of both streaming and traditional encryption formats for backward compatibility
15. **Document Management**: Users can view all their uploaded documents in the modernized dashboard
16. **Earnings Tracking**: Real-time tracking of earnings from document purchases with enhanced visual display
17. **Secure Downloads**: Direct download of owned documents with automatic decryption supporting both encryption formats
18. **Marketplace**: Users can purchase documents from others and earn from their own uploads

## Smart Contract

The project uses a smart contract (`DocumentStorage.sol`) deployed on the Ethereum blockchain. Key functionalities include:

- Store document IPFS hashes linked to user addresses
- Set prices for documents
- Purchase documents from other users
- Withdraw earnings from document sales
- Track user document ownership
- Manage document marketplace transactions

## Security Features

- **🔄 Streaming Encryption**: Memory-safe encryption for large files with chunk-based processing to prevent browser crashes
- **🔧 Hybrid Encryption System**: Automatic switching between streaming and traditional encryption based on file size (5MB threshold)
- **🧠 Smart Decryption**: Automatic detection and handling of both encryption formats for seamless backward compatibility
- **⚡ Browser-Native Processing**: Uses TextEncoder/TextDecoder APIs instead of Node.js Buffer for universal browser compatibility
- Document hashes stored on blockchain for verification
- Decentralized storage via IPFS with memory-efficient processing
- File encryption/decryption for secure document handling with optimized chunk processing
- Secure wallet integration
- Advanced document anonymization with data type-specific handling
- **Excel Files**: Personal data anonymization using wallet-based hashing with secure preview generation
- **Image Files**: OCR + NLP-based PHI detection and masking using Tesseract and spaCy
- **Dual-Backend Architecture**: Smart file routing for optimized processing
- **Preview Security**: Previews generated from already anonymized data ensuring no PHI exposure
- Advanced document search with multiple filter options (data type, gender, data source, file type)
- Hash-based file naming for download security
- Interactive progress tracking with secure step-by-step validation
- Enhanced UI security with modern design patterns and user feedback systems
- **Free Preview Access**: No payment or wallet connection required for preview downloads, enabling safe evaluation

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