// src/components/PDFViewer/styles/defaultStyles.js

export const defaultStyles = {
  container: {
    maxWidth: "100%",
    padding: "16px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  controls: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  fileInput: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  pdfSelector: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
  },

  input: {
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },

  select: {
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    minWidth: "200px",
  },

  navigation: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },

  pageInput: {
    width: "50px",
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "14px",
  },

  button: {
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },

  pageInfo: {
    fontSize: "14px",
    color: "#666",
  },

  canvasContainer: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    minHeight: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  canvas: {
    maxWidth: "100%",
    height: "auto",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },

  error: {
    padding: "8px",
    backgroundColor: "#fee",
    border: "1px solid #fcc",
    borderRadius: "4px",
    color: "#c00",
    fontSize: "14px",
    marginBottom: "16px",
  },

  loading: {
    color: "#666",
    fontSize: "14px",
  },

  placeholder: {
    color: "#999",
    fontSize: "14px",
  },
};
