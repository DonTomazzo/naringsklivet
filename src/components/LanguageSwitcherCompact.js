import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcherCompact = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const languages = [
    { code: 'sv', flag: '🇸🇪', label: 'SV' },
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'da', flag: '🇩🇰', label: 'DA' },
    { code: 'no', flag: '🇳🇴', label: 'NO' },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className={`px-2 py-1 rounded text-sm ${
            currentLang === code ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcherCompact;