import React, { useState } from 'react';
import { Search, Filter, ArrowLeft, Download, ShoppingCart, Eye, FileText, Calendar, DollarSign, User, Building, X } from 'lucide-react';
import { decryptFile } from './encryptionUtils';
import { purchaseDocument, getDocumentPrice } from './contractService';

export default function SearchData({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [downloading, setDownloading] = useState({});
  const [purchasing, setPurchasing] = useState({});
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dataType: '',
    gender: '',
    ageRange: '',
    dataSource: '',
    priceRange: '',
    fileType: ''
  });
  const [useFilters, setUseFilters] = useState(false);

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim() && !useFilters) {
      alert('Please enter a search query or use filters');
      return;
    }

    setIsSearching(true);
    try {
      const backendUrl = process.env.REACT_APP_PYTHON_BACKEND_URL || 'http://localhost:3002';

      let endpoint = '/search';
      let requestBody = {};
      
      if (useFilters && Object.values(filters).some(value => value !== '')) {
        // Use search_with_filter or filter endpoint based on whether there's a query
        if (searchQuery.trim()) {
          endpoint = '/search_with_filter';
          requestBody = {
            query: searchQuery.trim(),
            filters: buildFiltersObject(),
            n_results: 10
          };
        } else {
          endpoint = '/filter';
          requestBody = {
            filters: buildFiltersObject(),
            n_results: 10
          };
        }
      } else {
        // Regular search
        requestBody = {
          query: searchQuery.trim()
        };
      }

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Search API failed: ${response.statusText}`);
      }

      const result = await response.json();
      setSearchResults(result);
    } catch (error) {
      console.error('Search Error:', error);
      alert(`Search Error: ${error.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  const buildFiltersObject = () => {
    const filterObj = {};
    
    // Map UI filters directly to backend expected format
    if (filters.dataType) {
      filterObj['dataType'] = filters.dataType;
    }
    
    if (filters.gender) {
      filterObj['gender'] = filters.gender;
    }
    
    if (filters.dataSource) {
      filterObj['dataSource'] = filters.dataSource;
    }
    
    if (filters.ageRange) {
      filterObj['ageRange'] = filters.ageRange;
    }
    
    if (filters.fileType) {
      filterObj['fileType'] = filters.fileType;
    }
    
    if (filters.priceRange) {
      filterObj['priceRange'] = filters.priceRange;
    }
    
    return filterObj;
  };

  const resetFilters = () => {
    setFilters({
      dataType: '',
      gender: '',
      ageRange: '',
      dataSource: '',
      priceRange: '',
      fileType: ''
    });
    setUseFilters(false);
  };

  const handlePurchaseAndDownload = async (result, index) => {
    const cid = result.cid || result.ipfsHash || result.hash;
    if (!cid) return;

    setPurchasing(prev => ({ ...prev, [index]: true }));
    
    try {
      const price = result.metadata?.price || await getDocumentPrice(cid);
      
      if (!price || parseFloat(price) <= 0) {
        alert('Unable to get document price');
        return;
      }

      const confirmed = window.confirm(`Purchase this document for ${price} ETH?`);
      if (!confirmed) return;

      const txHash = await purchaseDocument(cid, price);
      console.log('Purchase successful:', txHash);

      setDownloading(prev => ({ ...prev, [index]: true }));
      
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      const encryptedData = await response.text();
      
      const decryptedData = decryptFile(encryptedData);
      const bytes = new Uint8Array(atob(decryptedData).split('').map(char => char.charCodeAt(0)));
      
      const blob = new Blob([bytes], { type: result.metadata?.fileType || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = result.metadata?.fileName || `document_${index + 1}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Purchase/Download Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setPurchasing(prev => ({ ...prev, [index]: false }));
      setDownloading(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header with Gradient */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 h-2"></div>
      
      {/* Header Section */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              <ArrowLeft size={18} className="text-gray-600" />
              <span className="font-medium text-gray-700">Back to Main</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Search Documents
              </h1>
              <p className="text-gray-600 text-sm mt-1">Find medical documents using advanced search and filtering</p>
            </div>
            
            <div className="w-32"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your search query (e.g., 'diabetes research', 'cancer treatment')..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white shadow-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSearchSubmit}
                disabled={isSearching}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none font-semibold"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Search Documents
                  </>
                )}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-3 px-6 py-4 border-2 rounded-2xl transition-all duration-200 font-medium ${
                  showFilters 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <Filter size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {useFilters && (
              <div className="flex items-center gap-3 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Filters Active</span>
                <button
                  onClick={resetFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
                >
                  <X size={14} className="inline mr-1" />
                  Clear
                </button>
              </div>
            )}
          </div>
          
          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter size={20} className="text-blue-600" />
                Advanced Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Data Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Building size={16} className="text-blue-600" />
                    Data Type
                  </label>
                  <select
                    value={filters.dataType}
                    onChange={(e) => {
                      setFilters({...filters, dataType: e.target.value});
                      setUseFilters(true);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="">All Types</option>
                    <option value="Personal">Personal</option>
                    <option value="Institution">Institution</option>
                  </select>
                </div>
                
                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <User size={16} className="text-purple-600" />
                    Gender
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) => {
                      setFilters({...filters, gender: e.target.value});
                      setUseFilters(true);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Mixed">Mixed</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                
                {/* Data Source Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Building size={16} className="text-green-600" />
                    Data Source
                  </label>
                  <select
                    value={filters.dataSource}
                    onChange={(e) => {
                      setFilters({...filters, dataSource: e.target.value});
                      setUseFilters(true);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="">All Sources</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Research Institution">Research Institution</option>
                    <option value="Medical Device">Medical Device</option>
                    <option value="Electronic Health Record">Electronic Health Record</option>
                    <option value="Patient Self-Reported">Patient Self-Reported</option>
                    <option value="Insurance Claims">Insurance Claims</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {/* File Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-orange-600" />
                    File Type
                  </label>
                  <select
                    value={filters.fileType}
                    onChange={(e) => {
                      setFilters({...filters, fileType: e.target.value});
                      setUseFilters(true);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="">All Types</option>
                    <option value="application/pdf">PDF</option>
                    <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">DOCX</option>
                    <option value="application/msword">DOC</option>
                    <option value="text/plain">TXT</option>
                    <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">XLSX</option>
                    <option value="application/vnd.ms-excel">XLS</option>
                    <option value="text/csv">CSV</option>
                    <option value="application/json">JSON</option>
                  </select>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <DollarSign size={16} className="text-green-600" />
                    Price Range (ETH)
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => {
                      setFilters({...filters, priceRange: e.target.value});
                      setUseFilters(true);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                  >
                    <option value="">All Prices</option>
                    <option value="0-0.01">0 - 0.01 ETH</option>
                    <option value="0.01-0.05">0.01 - 0.05 ETH</option>
                    <option value="0.05-0.1">0.05 - 0.1 ETH</option>
                    <option value="0.1-0.5">0.1 - 0.5 ETH</option>
                    <option value="0.5-1">0.5 - 1 ETH</option>
                    <option value="1-999">1+ ETH</option>
                  </select>
                </div>
              </div>
              
              {/* Filter Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={handleSearchSubmit}
                  disabled={isSearching}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {searchResults && (
          <div className="space-y-6">
            {(() => {
              const resultsArray = Array.isArray(searchResults) 
                ? searchResults 
                : searchResults.results || searchResults.data || [];
              
              return (
                <>
                  {/* Results Header */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <Eye size={24} className="text-blue-600" />
                        {useFilters ? 'Filtered Results' : 'Search Results'}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold">
                          {resultsArray.length || 0} found
                        </span>
                        {useFilters && (
                          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-sm flex items-center gap-2">
                            <Filter size={14} />
                            Filters applied
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Results Grid */}
                  {resultsArray.length === 0 ? (
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Search size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Documents Found</h3>
                      <p className="text-gray-500 mb-6">No documents found matching your search criteria. Try adjusting your search terms or filters.</p>
                      
                      {/* Debug Information */}
                      <details className="mt-6 p-4 bg-gray-50 rounded-xl text-left">
                        <summary className="cursor-pointer text-sm font-medium text-gray-600 mb-2">Debug Information</summary>
                        <pre className="text-xs text-gray-500 overflow-auto max-h-32 bg-white p-3 rounded border">
                          {JSON.stringify(searchResults, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {resultsArray.map((result, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-200">
                          {/* Document Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                                <FileText size={20} className="text-blue-600 flex-shrink-0" />
                                {(() => {
                                  const fullText = result.summary || result.description || result.content || result.document || '';
                                  const titleMatch = fullText.match(/^Dataset Title:\s*(.+?)$/m);
                                  return titleMatch ? titleMatch[1].trim() : (result.metadata?.fileName || result.title || result.fileName || `Document ${index + 1}`);
                                })()}
                              </h4>
                              
                              <p className="text-gray-600 leading-relaxed mb-4">
                                {(() => {
                                  const fullText = result.summary || result.description || result.content || result.document || '';
                                  const summaryMatch = fullText.match(/^Dataset Title:\s*.+?\n(.+?)(?:\nDisease Tags:|$)/s);
                                  if (summaryMatch) {
                                    return summaryMatch[1].trim();
                                  }
                                  return fullText || 'No summary available';
                                })()}
                              </p>
                            </div>
                            
                            {/* Price Badge */}
                            {result.metadata?.price && (
                              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
                                {result.metadata.price} ETH
                              </div>
                            )}
                          </div>
                          
                          {/* Metadata Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {result.metadata?.fileType && (
                              <div className="bg-blue-50 rounded-xl p-3">
                                <div className="text-xs font-medium text-blue-600 mb-1">File Type</div>
                                <div className="text-sm font-semibold text-blue-800">{result.metadata.fileType.split('/').pop().toUpperCase()}</div>
                              </div>
                            )}
                            {result.metadata?.fileSize && (
                              <div className="bg-purple-50 rounded-xl p-3">
                                <div className="text-xs font-medium text-purple-600 mb-1">Size</div>
                                <div className="text-sm font-semibold text-purple-800">{(result.metadata.fileSize / 1024).toFixed(1)} KB</div>
                              </div>
                            )}
                            {result.metadata?.uploadDate && (
                              <div className="bg-orange-50 rounded-xl p-3">
                                <div className="text-xs font-medium text-orange-600 mb-1 flex items-center gap-1">
                                  <Calendar size={12} />
                                  Uploaded
                                </div>
                                <div className="text-sm font-semibold text-orange-800">{new Date(result.metadata.uploadDate).toLocaleDateString()}</div>
                              </div>
                            )}
                            {result.metadata?.dataSource && (
                              <div className="bg-green-50 rounded-xl p-3">
                                <div className="text-xs font-medium text-green-600 mb-1">Source</div>
                                <div className="text-sm font-semibold text-green-800">{result.metadata.dataSource}</div>
                              </div>
                            )}
                          </div>
                          
                          {/* Additional Metadata */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {result.metadata?.gender && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                👤 {result.metadata.gender}
                              </span>
                            )}
                            {result.metadata?.dataType && (
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                                🔐 {result.metadata.dataType}
                              </span>
                            )}
                          </div>
                          
                          {/* Action Button */}
                          <div className="flex justify-end pt-4 border-t border-gray-200">
                            {(result.cid || result.ipfsHash || result.hash) && (
                              <button
                                onClick={() => handlePurchaseAndDownload(result, index)}
                                disabled={purchasing[index] || downloading[index]}
                                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none font-semibold"
                              >
                                {purchasing[index] ? (
                                  <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Purchasing...
                                  </>
                                ) : downloading[index] ? (
                                  <>
                                    <Download size={20} />
                                    Downloading...
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart size={20} />
                                    Purchase & Download
                                    <span className="text-green-100">({result.metadata?.price || '...'} ETH)</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}