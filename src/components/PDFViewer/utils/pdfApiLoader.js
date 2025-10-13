// src/components/PDFViewer/utils/pdfApiLoader.js
import { loadPdfJs } from "./pdfLoader";

const API_BASE_URL = "https://pdf-storage-api.vercel.app/api";

/**
 * Fetches list of PDFs from the API
 * @param {string} baseUrl - API base URL
 * @returns {Promise<Array>} Array of PDF metadata
 */
export const fetchPDFsFromAPI = async (baseUrl = API_BASE_URL) => {
  try {
    const response = await fetch(`${baseUrl}/pdfs`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch PDFs");
    }

    return result.data || [];
  } catch (error) {
    throw new Error(`Failed to fetch PDFs: ${error.message}`);
  }
};

/**
 * Gets download URL for a specific PDF
 * @param {string} pdfId - PDF ID
 * @param {string} baseUrl - API base URL
 * @returns {Promise<string>} Download URL
 */
export const getPDFDownloadUrl = async (pdfId, baseUrl = API_BASE_URL) => {
  try {
    const response = await fetch(`${baseUrl}/pdfs/${pdfId}/download`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to get download URL");
    }

    return result.data.url;
  } catch (error) {
    throw new Error(`Failed to get download URL: ${error.message}`);
  }
};

/**
 * Loads a PDF document from API URL
 * @param {string} pdfId - PDF ID
 * @param {string} baseUrl - API base URL
 * @returns {Promise} PDF document object
 */
export const loadPdfFromUrl = async (pdfId, baseUrl = API_BASE_URL) => {
  const pdfjsLib = await loadPdfJs();

  try {
    // Get the download URL
    const downloadUrl = await getPDFDownloadUrl(pdfId, baseUrl);

    // Load PDF from URL
    const pdf = await pdfjsLib.getDocument(downloadUrl).promise;
    return pdf;
  } catch (error) {
    throw new Error(`Failed to load PDF from API: ${error.message}`);
  }
};

