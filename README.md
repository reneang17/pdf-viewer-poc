# PDF Viewer POC

A modern React-based PDF viewer component built with PDF.js. This project demonstrates how to create an interactive PDF viewer with navigation controls and file upload functionality.

**The main feature of this PDF reader is its universality—it is designed to work seamlessly across any browser and device.** While native or built-in PDF readers on browsers and mobile devices (like Preview) often only retain partial functionality, this viewer ensures that both functionality and aesthetics are fully preserved. To solve such lack of universality, this tool comes to the rescue. 

While other iterations of this project (e.g. [forestViewer](https://github.com/reneang17/forestViewer) and [spotlight](https://github.com/reneang17/spotlight)) focused more on aesthetics and UI/UX, this repo and [pdf-storage-api](https://github.com/reneang17/pdf-storage-api) iteration focuses on creating a full back and front end, to demonstrate the feasibility of making this reader a service.

If you are interested in seeing this project workign visit [pdf-viewer-poc](https://reneang17.github.io/pdf-viewer-poc/).

## Features

- 📄 PDF file upload and viewing
- 🧭 Page navigation (Previous/Next/Go to page)
- 📱 Responsive design
- ⚡ Fast rendering with PDF.js
- ✨ Clean, modern UI

## Technologies Used

- **React 18.3.1** - Frontend framework
- **PDF.js 3.11.174** - PDF rendering library
- **Vite** - Build tool and development server
- **ESLint & Prettier** - Code quality and formatting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/reneang17/pdf-viewer-poc.git
cd pdf-viewer-poc
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

1. Click "Select PDF File" to upload a PDF document
2. Use the navigation controls to move between pages
3. Enter a specific page number and click "Go" to jump to that page

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues and enhancement requests!
# Trigger deployment
