import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, Award, Users, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [hero1, hero2, hero3];
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const stats = [
    { icon: Shield, label: t('hero.stats.experience'), value: '15+' },
    { icon: Users, label: t('hero.stats.clients'), value: '500+' },
    { icon: Award, label: t('hero.stats.certifications'), value: '25+' },
    { icon: Clock, label: t('hero.stats.protection'), value: '24/7' },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20 md:pt-0 flex flex-col">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-overlay"></div>
          </div>
        ))}
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-4 md:mb-6 animate-fade-in`}>
              <Shield className="h-4 w-4 text-secondary" />
              <span className="text-secondary font-cairo text-sm">{t('hero.badge')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-tajawal font-black text-foreground mb-4 md:mb-6 animate-fade-up">
              {t('hero.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-gold">
                {t('hero.titleHighlight')}
              </span>
              <br />
              {t('hero.titleSecondLine')}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl md:text-2xl text-foreground/80 font-cairo mb-6 md:mb-8 animate-fade-up animation-delay-200">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 animate-fade-up animation-delay-400">
              <a
                href="#contact"
                className="inline-block px-6 sm:px-8 py-3 md:py-4 bg-gradient-gold text-primary font-cairo font-bold text-base md:text-lg rounded-xl hover:shadow-gold transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center"
              >
                {t('hero.bookFreeConsultation')}
              </a>
              <a
                href="#services"
                className="inline-block px-6 sm:px-8 py-3 md:py-4 border-2 border-secondary/30 text-foreground font-cairo font-bold text-base md:text-lg rounded-xl hover:bg-secondary/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center"
              >
                {t('hero.exploreServices')}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 animate-fade-up animation-delay-600 relative mb-16 md:mb-20">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden flex flex-col items-center p-3 sm:p-4 md:p-6 bg-background/60 backdrop-blur-lg rounded-xl border border-secondary/40 hover:bg-secondary/20 transition-all duration-300 group"
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <stat.icon className="h-12 sm:h-16 md:h-20 w-12 sm:w-16 md:w-20 text-secondary" />
                  </div>
                  <div className="relative flex flex-col items-center">
                    <span className="text-lg sm:text-2xl md:text-3xl font-tajawal font-bold text-foreground mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-cairo text-foreground/90 text-center leading-tight">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center animate-bounce">
              <div className="w-8 h-12 border-2 border-secondary/60 rounded-full flex justify-center bg-background/10 backdrop-blur-sm">
                <div className="w-1 h-4 bg-secondary rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} z-20`}>
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="p-2 bg-background/20 backdrop-blur-sm rounded-full hover:bg-secondary/30 transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </button>
        <div className={`flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-secondary'
                  : 'w-2 bg-foreground/30 hover:bg-foreground/50'
              } rounded-full`}
            ></button>
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="p-2 bg-background/20 backdrop-blur-sm rounded-full hover:bg-secondary/30 transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;