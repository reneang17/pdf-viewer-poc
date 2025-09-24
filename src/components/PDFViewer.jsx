import React, { useState, useEffect, useRef } from 'react';

// Load PDF.js from CDN
const loadPdfJs = async () => {
  if (window.pdfjsLib) return window.pdfjsLib;
  
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve(window.pdfjsLib);
    };
    document.head.appendChild(script);
  });
};

// Styles configuration
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e1e4e8'
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '28px',
    fontWeight: '600',
    color: '#24292e'
  },
  subtitle: {
    margin: '0',
    fontSize: '14px',
    color: '#586069'
  },
  controls: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  fileInput: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#24292e'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #d1d5da',
    borderRadius: '6px',
    fontSize: '14px'
  },
  navigation: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  pageInput: {
    width: '60px',
    padding: '8px 12px',
    border: '1px solid #d1d5da',
    borderRadius: '6px',
    fontSize: '14px',
    textAlign: 'center'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#0969da',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonHover: {
    backgroundColor: '#0860ca'
  },
  pageInfo: {
    fontSize: '14px',
    color: '#586069',
    display: 'flex',
    alignItems: 'center'
  },
  canvasContainer: {
    border: '1px solid #d1d5da',
    borderRadius: '6px',
    padding: '20px',
    backgroundColor: '#f6f8fa',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '400px',
    alignItems: 'center'
  },
  canvas: {
    maxWidth: '100%',
    height: 'auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  error: {
    padding: '12px',
    backgroundColor: '#ffebe9',
    border: '1px solid #ff8182',
    borderRadius: '6px',
    color: '#cf222e',
    fontSize: '14px',
    marginBottom: '20px'
  },
  loading: {
    padding: '12px',
    backgroundColor: '#ddf4ff',
    border: '1px solid #54aeff',
    borderRadius: '6px',
    color: '#0969da',
    fontSize: '14px'
  },
  placeholder: {
    textAlign: 'center',
    color: '#586069',
    fontSize: '16px',
    padding: '40px'
  }
};

const PDFViewer = () => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageInputValue, setPageInputValue] = useState('1');
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadPdfJs().catch(err => {
      setError('Failed to load PDF.js library');
      console.error(err);
    });
  }, []);

  const renderPage = async (num) => {
    if (!pdfDoc) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const page = await pdfDoc.getPage(num);
      const viewport = page.getViewport({ scale: 1.5 });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      setLoading(false);
    } catch (err) {
      setError(`Failed to render page: ${err.message}`);
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const pdfjsLib = await loadPdfJs();
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          
          setPdfDoc(pdf);
          setPageCount(pdf.numPages);
          setPageNum(1);
          setPageInputValue('1');
          
          // Render first page
          setTimeout(() => {
            renderPage(1);
          }, 0);
        } catch (err) {
          setError(`Failed to load PDF: ${err.message}`);
          setLoading(false);
        }
      };
      
      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      setError(`Error loading file: ${err.message}`);
      setLoading(false);
    }
  };

  const goToPage = () => {
    const num = parseInt(pageInputValue);
    
    if (isNaN(num)) {
      setError('Please enter a valid page number');
      return;
    }
    
    if (num < 1 || num > pageCount) {
      setError(`Page number must be between 1 and ${pageCount}`);
      return;
    }
    
    setPageNum(num);
    renderPage(num);
  };

  const prevPage = () => {
    if (pageNum <= 1) return;
    const newPage = pageNum - 1;
    setPageNum(newPage);
    setPageInputValue(newPage.toString());
    renderPage(newPage);
  };

  const nextPage = () => {
    if (pageNum >= pageCount) return;
    const newPage = pageNum + 1;
    setPageNum(newPage);
    setPageInputValue(newPage.toString());
    renderPage(newPage);
  };

  const handlePageInputChange = (e) => {
    setPageInputValue(e.target.value);
  };

  const handlePageInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      goToPage();
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>PDF Viewer Component</h1>
        <p style={styles.subtitle}>Load and navigate through PDF files using PDF.js</p>
      </header>

      {error && (
        <div style={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={styles.controls}>
        <div style={styles.fileInput}>
          <label style={styles.label}>Select PDF File:</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            style={styles.input}
          />
        </div>

        {pdfDoc && (
          <div style={styles.navigation}>
            <button
              onClick={prevPage}
              disabled={pageNum <= 1}
              style={{
                ...styles.button,
                opacity: pageNum <= 1 ? 0.5 : 1,
                cursor: pageNum <= 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            
            <input
              type="text"
              value={pageInputValue}
              onChange={handlePageInputChange}
              onKeyPress={handlePageInputKeyPress}
              style={styles.pageInput}
            />
            
            <button
              onClick={goToPage}
              style={styles.button}
            >
              Go
            </button>
            
            <button
              onClick={nextPage}
              disabled={pageNum >= pageCount}
              style={{
                ...styles.button,
                opacity: pageNum >= pageCount ? 0.5 : 1,
                cursor: pageNum >= pageCount ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
            
            <span style={styles.pageInfo}>
              Page {pageNum} of {pageCount}
            </span>
          </div>
        )}
      </div>

      <div style={styles.canvasContainer}>
        {loading && (
          <div style={styles.loading}>
            Loading PDF...
          </div>
        )}
        
        {!pdfDoc && !loading && (
          <div style={styles.placeholder}>
            Select a PDF file to begin viewing
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          style={{
            ...styles.canvas,
            display: pdfDoc && !loading ? 'block' : 'none'
          }}
        />
      </div>
    </div>
  );
};

export default PDFViewer;