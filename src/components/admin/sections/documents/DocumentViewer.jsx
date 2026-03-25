import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocuments } from '../../../../contexts/MockDocumentContext';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
  Maximize, Minimize, Download, BookmarkPlus, MessageSquare,
  RotateCw, Printer, Share2
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DocumentViewer({ document, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    const handleArrowKeys = (e) => {
      if (e.key === 'ArrowLeft' && pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      } else if (e.key === 'ArrowRight' && pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleArrowKeys);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleArrowKeys);
    };
  }, [onClose, isFullscreen, pageNumber, numPages]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = () => {
    toast.success('Download startar...');
    // In real app: trigger actual download
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: `Kolla in detta dokument: ${document.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Länk kopierad!');
    }
  };

  // Render different file types
  const renderContent = () => {
    switch (document.fileType) {
      case 'pdf':
        return (
          <div className="flex flex-col items-center overflow-auto">
            <Document
              file={document.filePath}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center h-96">
                  <p className="text-red-600 mb-4">Kunde inte ladda PDF</p>
                  <p className="text-sm text-slate-600">
                    Detta är en demo. I produktion skulle PDF:en laddas från Supabase Storage.
                  </p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>
        );

      case 'video':
        return (
          <div className="flex items-center justify-center h-full">
            <video
              controls
              className="max-w-full max-h-full"
              src={document.filePath}
            >
              Din webbläsare stöder inte video.
            </video>
          </div>
        );

      case 'image':
        return (
          <div className="flex items-center justify-center h-full p-4">
            <img
              src={document.filePath}
              alt={document.title}
              className="max-w-full max-h-full object-contain"
              style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
            />
          </div>
        );

      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-6xl">🎵</div>
            <audio controls src={document.filePath} className="w-96">
              Din webbläsare stöder inte audio.
            </audio>
            <div className="text-center">
              <div className="font-semibold text-slate-900">{document.title}</div>
              <div className="text-sm text-slate-600">{document.description}</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-600">Filtypen stöds inte för förhandsgranskning</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black/90 z-50 flex flex-col ${
          isFullscreen ? '' : 'p-4'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isFullscreen) {
            onClose();
          }
        }}
      >
        {/* Top Toolbar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
            <div>
              <h2 className="text-lg font-semibold">{document.title}</h2>
              {document.description && (
                <p className="text-sm text-slate-400">{document.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {document.fileType === 'pdf' && (
              <>
                <button
                  onClick={handleRotate}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Rotera"
                >
                  <RotateCw size={20} />
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Skriv ut"
                >
                  <Printer size={20} />
                </button>
              </>
            )}
            <button
              onClick={handleShare}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              title="Dela"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              title="Ladda ner"
            >
              <Download size={20} />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              title={isFullscreen ? 'Avsluta fullskärm' : 'Fullskärm'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden bg-slate-800 relative">
          {renderContent()}

          {/* PDF Controls Overlay */}
          {document.fileType === 'pdf' && numPages && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  title="Zooma ut"
                >
                  <ZoomOut size={20} />
                </button>
                <span className="text-white text-sm font-medium min-w-[4rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= 3.0}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  title="Zooma in"
                >
                  <ZoomIn size={20} />
                </button>
              </div>

              {/* Page Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPageNumber(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  title="Föregående sida"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2 text-white">
                  <input
                    type="number"
                    value={pageNumber}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= numPages) {
                        setPageNumber(page);
                      }
                    }}
                    className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-center focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min={1}
                    max={numPages}
                  />
                  <span className="text-slate-400">/ {numPages}</span>
                </div>
                <button
                  onClick={() => setPageNumber(pageNumber + 1)}
                  disabled={pageNumber >= numPages}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  title="Nästa sida"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Annotation Toggle */}
              <div className="border-l border-slate-700 pl-4">
                <button
                  onClick={() => setShowAnnotations(!showAnnotations)}
                  className={`p-2 rounded-lg transition-colors ${
                    showAnnotations ? 'bg-orange-500 text-white' : 'hover:bg-slate-800 text-white'
                  }`}
                  title="Anteckningar"
                >
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Image/Video Zoom Controls */}
          {(document.fileType === 'image' || document.fileType === 'video') && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 text-white"
              >
                <ZoomOut size={20} />
              </button>
              <span className="text-white text-sm font-medium min-w-[4rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 3.0}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 text-white"
              >
                <ZoomIn size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="absolute top-20 right-6 bg-slate-900/95 backdrop-blur rounded-lg p-4 text-white text-sm max-w-xs">
          <div className="font-semibold mb-2">Tangentbordsgenvägar:</div>
          <div className="space-y-1 text-slate-300">
            <div><kbd className="bg-slate-800 px-2 py-0.5 rounded">←</kbd> / <kbd className="bg-slate-800 px-2 py-0.5 rounded">→</kbd> Bläddra sidor</div>
            <div><kbd className="bg-slate-800 px-2 py-0.5 rounded">Esc</kbd> Stäng</div>
            <div><kbd className="bg-slate-800 px-2 py-0.5 rounded">F</kbd> Fullskärm</div>
          </div>
        </div>

        {/* Annotation Sidebar (if enabled) */}
        <AnimatePresence>
          {showAnnotations && document.fileType === 'pdf' && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Anteckningar</h3>
                <button
                  onClick={() => setShowAnnotations(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              <button className="w-full flex items-center gap-2 px-4 py-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors mb-4">
                <BookmarkPlus size={20} />
                Ny anteckning
              </button>

              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-600">Sida 1</span>
                    <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-900">Detta är viktigt att komma ihåg!</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-slate-500 text-center">
                  Anteckningsfunktionen är under utveckling
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default DocumentViewer;