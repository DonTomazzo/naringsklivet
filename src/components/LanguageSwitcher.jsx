import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'Användare' })}</p>

      <button onClick={() => i18n.changeLanguage('sv')}>
        Svenska
      </button>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
      <button onClick={() => i18n.changeLanguage('da')}>
        Dansk
      </button>
      <button onClick={() => i18n.changeLanguage('no')}>
        Norsk
      </button>
    </div>
  );
};

export default LanguageSwitcher;