// Simple test for streaming encryption
import StreamingEncryption from '../src/utils/streamingEncryption.js';

const testStreamingEncryption = async () => {
  console.log('Testing Streaming Encryption...');
  
  // Create a test file (simulate large file)
  const testData = 'This is a test file content that will be encrypted in chunks.'.repeat(1000);
  const testFile = new File([testData], 'test.txt', { type: 'text/plain' });
  
  console.log(`Test file size: ${testFile.size} bytes`);
  
  const streamer = new StreamingEncryption(1024); // Small chunks for testing
  
  try {
    // Test encryption
    console.log('Starting encryption...');
    const encrypted = await streamer.encryptFileStream(
      testFile,
      (progress) => console.log(`Encryption: ${progress.toFixed(1)}%`)
    );
    
    console.log('Encryption completed');
    console.log(`Encrypted data length: ${encrypted.length} bytes`);
    
    // Test decryption
    console.log('Starting decryption...');
    const decrypted = await streamer.decryptFileStream(
      encrypted,
      (progress) => console.log(`Decryption: ${progress.toFixed(1)}%`)
    );
    
    console.log('Decryption completed');
    console.log(`Decrypted data length: ${decrypted.length} bytes`);
    
    // Verify integrity
    const decryptedText = new TextDecoder().decode(decrypted);
    const originalText = await testFile.text();
    
    if (decryptedText === originalText) {
      console.log('✅ Test PASSED: Data integrity verified');
    } else {
      console.log('❌ Test FAILED: Data integrity check failed');
      console.log('Original length:', originalText.length);
      console.log('Decrypted length:', decryptedText.length);
    }
    
  } catch (error) {
    console.error('❌ Test FAILED:', error);
  }
};

// Run test
// testStreamingEncryption();

export default testStreamingEncryption;
