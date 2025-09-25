// src/components/PDFViewer/ErrorMessage.jsx
import React from "react";

const ErrorMessage = ({ error, styles }) => {
  if (!error) return null;

  return <div style={styles.error}>{error}</div>;
};

export default ErrorMessage;
