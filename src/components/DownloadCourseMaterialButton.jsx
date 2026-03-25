import React from 'react';
import { Download } from 'lucide-react';

const DownloadCourseMaterialButton = ({ pdfUrl }) => {
  if (!pdfUrl) {
    return null; // Visa inget om det inte finns någon PDF-länk
  }

  return (
    <a 
      href={pdfUrl} 
      download
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-2 md:col-span-1 flex flex-col justify-center items-center bg-white border-2 border-[#FF5421] rounded-xl p-4 text-center cursor-pointer transition-colors hover:bg-slate-50"
    >
      <Download size={32} className="text-[#FF5421] mb-2" />
      <div className="text-sm font-bold text-slate-900">Ladda ner</div>
      <div className="text-xs text-slate-600">Kursmaterial (PDF)</div>
    </a>
  );
};

export default DownloadCourseMaterialButton;