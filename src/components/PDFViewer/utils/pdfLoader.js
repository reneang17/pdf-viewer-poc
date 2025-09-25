// src/components/PDFViewer/utils/pdfLoader.js

/**
 * Dynamically loads PDF.js library from CDN
 * @returns {Promise} PDF.js library object
 */
export const loadPdfJs = async () => {
    // Return if already loaded
    if (window.pdfjsLib) return window.pdfjsLib;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      
      script.onload = () => {
        // Set worker source
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      };
      
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  /**
   * Loads a PDF document from a file
   * @param {File} file - The PDF file to load
   * @returns {Promise} PDF document object
   */
  export const loadPdfFromFile = async (file) => {
    const pdfjsLib = await loadPdfJs();
    
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          resolve(pdf);
        } catch (err) {
          reject(err);
        }
      };
      
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(file);
    });
  };