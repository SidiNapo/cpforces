import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(i18n.language);
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    setIsRTL(lang === 'ar');
    
    // Save to localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', lang);
    }
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    // Initialize from localStorage or set default
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('i18nextLng');
      if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
        i18n.changeLanguage(savedLanguage);
        setLanguageState(savedLanguage);
        setIsRTL(savedLanguage === 'ar');
      }
    }

    // Set initial HTML attributes based on current language
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // Listen for i18n language changes
    const handleLanguageChange = (lng: string) => {
      setLanguageState(lng);
      setIsRTL(lng === 'ar');
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
