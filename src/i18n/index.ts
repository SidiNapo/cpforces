import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';

const resources = {
  ar: {
    translation: arTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

// Initialize language from localStorage before i18n setup
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      return savedLang;
    }
  }
  // Default to Arabic if no saved preference or if running on server
  return 'ar';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    lng: getInitialLanguage(), // Use detected initial language
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
