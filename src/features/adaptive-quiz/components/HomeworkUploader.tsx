import React, { useState, useRef } from 'react';
import { useHomeworkAnalysis } from '../hooks/useHomeworkAnalysis';
import { useQuiz } from '../context/QuizContext';

export const HomeworkUploader: React.FC = () => {
  const { analyzeImage, analyzeText, uploadProgress } = useHomeworkAnalysis();
  const { isAnalyzing, error, setError } = useQuiz();

  const [inputMode, setInputMode] = useState<'image' | 'text'>('image');
  const [textInput, setTextInput] = useState('');
  const [numQuestions, setNumQuestions] = useState(8);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Skapa preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Analysera
    try {
      await analyzeImage(file, numQuestions);
    } catch (err) {
      console.error('Fel vid analys:', err);
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      setError('Vänligen skriv in lite text först');
      return;
    }

    try {
      await analyzeText(textInput, numQuestions);
    } catch (err) {
      console.error('Fel vid analys:', err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      // Simulera file input change
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        handleFileChange({ target: fileInputRef.current } as any);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">Adaptiv Läxhjälp</h1>
        <p className="text-lg text-slate-600">
          Ladda upp din läxa så skapar AI ett personligt quiz för dig! 🎓
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setInputMode('image')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            inputMode === 'image'
              ? 'bg-[#FF5421] text-white shadow-lg hover:bg-[#E04A1D]'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📸 Ladda upp bild
        </button>
        <button
          onClick={() => setInputMode('text')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            inputMode === 'text'
              ? 'bg-[#FF5421] text-white shadow-lg hover:bg-[#E04A1D]'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ✍️ Skriv text
        </button>
      </div>

      {/* Number of Questions Selector */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Antal frågor i quizet
        </label>
        <select
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent"
          disabled={isAnalyzing}
        >
          <option value={5}>5 frågor</option>
          <option value={8}>8 frågor (rekommenderat)</option>
          <option value={10}>10 frågor</option>
          <option value={12}>12 frågor</option>
          <option value={15}>15 frågor</option>
        </select>
      </div>

      {/* Image Upload Mode */}
      {inputMode === 'image' && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-white rounded-xl p-8 shadow-sm border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            disabled={isAnalyzing}
          />

          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-96 mx-auto rounded-lg shadow-md"
              />
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isAnalyzing}
              >
                Välj en annan bild
              </button>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="text-6xl mb-4">📤</div>
              <p className="text-xl font-medium text-gray-700 mb-2">
                Klicka för att ladda upp eller dra och släpp
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF upp till 5MB
              </p>
            </label>
          )}
        </div>
      )}

      {/* Text Input Mode */}
      {inputMode === 'text' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Beskriv din läxa eller klistra in text
          </label>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="T.ex. 'Lös ekvationen 2x + 5 = 15' eller klistra in text från din lärobok..."
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent resize-none"
            disabled={isAnalyzing}
          />
          <button
            onClick={handleTextSubmit}
            disabled={isAnalyzing || !textInput.trim()}
            className="w-full px-6 py-3 bg-[#FF5421] text-white rounded-lg font-medium hover:bg-[#E04A1D] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? 'Analyserar...' : 'Skapa Quiz'}
          </button>
        </div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <div className="bg-orange-50 rounded-xl p-6 space-y-4 border border-orange-200">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF5421]"></div>
            <p className="text-slate-900 font-medium">
              Claude AI analyserar din läxa...
            </p>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div
                className="bg-[#FF5421] h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <p className="text-center text-sm text-slate-700">
            Detta kan ta 10-30 sekunder beroende på komplexitet...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-medium text-red-900">Ett fel uppstod</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-orange-50 to-slate-50 rounded-xl p-6 border border-orange-200">
        <h3 className="font-semibold text-slate-900 mb-2">Så här fungerar det:</h3>
        <ol className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start">
            <span className="font-bold mr-2">1.</span>
            <span>Ladda upp en bild av din läxa eller skriv in text</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">2.</span>
            <span>AI skapar ett personligt quiz baserat på innehållet</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">3.</span>
            <span>Granska och redigera frågorna om du vill</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-2">4.</span>
            <span>
              Träna i 3 omgångar där AI anpassar svårigheten efter dina svar
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};
