// src/components/PDFViewer/utils/pdfRenderer.js

/**
 * Renders a PDF page to a canvas element
 * @param {Object} pdfDoc - The PDF document object
 * @param {number} pageNum - Page number to render (1-based)
 * @param {HTMLCanvasElement} canvas - Canvas element to render to
 * @param {number} scale - Scale factor for rendering (default: 1.5)
 * @returns {Promise} Resolves when rendering is complete
 */
export const renderPdfPage = async (pdfDoc, pageNum, canvas, scale = 1.5) => {
    if (!pdfDoc || !canvas) {
      throw new Error('PDF document and canvas are required');
    }
    
    // Get the page
    const page = await pdfDoc.getPage(pageNum);
    
    // Set viewport with scale
    const viewport = page.getViewport({ scale });
    
    // Get device pixel ratio for high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Prepare canvas
    const context = canvas.getContext('2d');
    
    // Set canvas internal resolution (higher for high-DPI)
    canvas.width = viewport.width * devicePixelRatio;
    canvas.height = viewport.height * devicePixelRatio;
    
    // Scale CSS size back to viewport size
    canvas.style.width = viewport.width + 'px';
    canvas.style.height = viewport.height + 'px';
    
    // Scale the context to handle device pixel ratio
    context.scale(devicePixelRatio, devicePixelRatio);
    
    // Render PDF page to canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    await page.render(renderContext).promise;
  };
  
  /**
   * Calculates optimal scale for PDF rendering
   * @param {number} containerWidth - Container width in pixels
   * @param {number} pageWidth - Original page width
   * @returns {number} Optimal scale factor
   */
  export const calculateOptimalScale = (containerWidth, pageWidth) => {
    const padding = 40; // Account for container padding
    const availableWidth = containerWidth - padding;
    return Math.min(availableWidth / pageWidth, 2); // Max scale of 2
  };