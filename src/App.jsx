// src/App.jsx
import React from "react";
import PDFViewer from "./components/PDFViewer";

function App() {
  return (
    <div>
      <h1>PDF Viewer POC</h1>
      <PDFViewer apiBaseUrl="https://pdf-storage-api.vercel.app/api" />
    </div>
  );
}

export default App;
