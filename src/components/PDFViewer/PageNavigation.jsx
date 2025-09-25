// src/components/PDFViewer/PageNavigation.jsx
import React, { useState, useEffect } from 'react';

const PageNavigation = ({ currentPage, totalPages, onPageChange, styles }) => {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(inputValue);
    if (!isNaN(pageNum)) {
      onPageChange(pageNum);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGoToPage();
    }
  };

  return (
    <div style={styles.navigation}>
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        style={{
          ...styles.button,
          opacity: currentPage <= 1 ? 0.5 : 1,
        }}
      >
        ←
      </button>
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        style={styles.pageInput}
      />
      
      <span style={styles.pageInfo}>/ {totalPages}</span>
      
      <button
        onClick={handleGoToPage}
        style={styles.button}
      >
        Go
      </button>
      
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        style={{
          ...styles.button,
          opacity: currentPage >= totalPages ? 0.5 : 1,
        }}
      >
        →
      </button>
    </div>
  );
};

export default PageNavigation;