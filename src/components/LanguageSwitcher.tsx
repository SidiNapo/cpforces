import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';

const LanguageSwitcher = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇲🇦', fullName: 'Arabic - Morocco' },
    { code: 'en', name: 'English', flag: '🇺🇸', fullName: 'English - USA' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-3 px-4 py-2.5 bg-background/80 backdrop-blur-sm border border-secondary/30 rounded-xl hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300 shadow-sm hover:shadow-md ${isRTL ? 'space-x-reverse' : ''} ${isOpen ? 'bg-secondary/10 border-secondary/50' : ''}`}
      >
        {/* Flag Icon */}
        <div className="relative">
          <span className="text-lg group-hover:scale-110 transition-transform duration-300">
            {currentLanguage?.flag}
          </span>
          <div className="absolute -inset-1 bg-secondary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Language Text */}
        <div className="flex flex-col items-start">
          <span className="text-xs text-muted-foreground font-cairo leading-none">
            {language === 'ar' ? 'اللغة' : 'Language'}
          </span>
          <span className="text-sm font-cairo font-semibold text-foreground leading-none mt-0.5">
            {currentLanguage?.name}
          </span>
        </div>

        {/* Arrow Indicator */}
        <div className="ml-auto">
          <svg 
            className={`w-3 h-3 text-secondary/60 group-hover:text-secondary transition-all duration-300 ${isRTL ? 'rotate-180' : ''} ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute top-full mt-2 w-full min-w-[200px] bg-background/95 backdrop-blur-sm border border-secondary/30 rounded-xl shadow-xl overflow-hidden z-50 ${isRTL ? 'right-0' : 'left-0'}`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 transition-colors duration-200 ${
                language === lang.code ? 'bg-secondary/5 border-r-2 border-secondary' : ''
              } ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {/* Flag */}
              <span className="text-lg">{lang.flag}</span>
              
              {/* Language Info */}
              <div className="flex flex-col items-start flex-1">
                <span className="text-sm font-cairo font-semibold text-foreground">
                  {lang.name}
                </span>
                <span className="text-xs text-muted-foreground font-cairo">
                  {lang.fullName}
                </span>
              </div>

              {/* Selected Indicator */}
              {language === lang.code && (
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
