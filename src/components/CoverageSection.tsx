import { MapPin, Shield, Clock, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import moroccoMap from '@/assets/morocco-map.jpg';

const CoverageSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const cities = t('coverage.cities', { returnObjects: true }) as any[];

  return (
    <section ref={sectionRef} id="coverage" className="py-20 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-4">
            <Globe className="h-4 w-4 text-secondary" />
            <span className="text-secondary font-cairo text-sm">{t('coverage.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-tajawal font-black text-foreground mb-4">
            {t('coverage.title')} <span className="text-transparent bg-clip-text bg-gradient-gold">{t('coverage.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-cairo max-w-2xl mx-auto">
            {t('coverage.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Visualization */}
          <div className={`relative ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <div className="aspect-square rounded-3xl relative overflow-hidden shadow-2xl">
              <img 
                src={moroccoMap}
                alt="Morocco Coverage Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
              
              {/* Animated City Markers */}
              <div className="absolute inset-0">
                {/* Major Cities with Pulsing Dots */}
                <div className="absolute top-[25%] left-[45%] transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-secondary rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="absolute top-[35%] left-[42%] transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse animation-delay-200"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-secondary rounded-full animate-ping animation-delay-200"></div>
                  </div>
                </div>
                <div className="absolute bottom-[40%] left-[35%] transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse animation-delay-400"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-accent rounded-full animate-ping animation-delay-400"></div>
                  </div>
                </div>
                <div className="absolute top-[20%] right-[40%] transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse animation-delay-600"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-secondary rounded-full animate-ping animation-delay-600"></div>
                  </div>
                </div>
              </div>

              {/* Map Labels */}
              <div className="absolute top-8 left-8 px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-full">
                <span className="text-sm font-cairo font-semibold text-primary">{t('coverage.stats.coverage')}</span>
              </div>
              <div className="absolute bottom-8 right-8 flex items-center space-x-2 space-x-reverse px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full">
                <Shield className="h-4 w-4 text-secondary" />
                <span className="text-sm font-cairo font-semibold text-foreground">10+ {t('coverage.stats.cities')}</span>
              </div>
            </div>
          </div>

          {/* Cities List */}
          <div className={`${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
            <div className="space-y-4">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className={`group p-6 bg-card rounded-2xl border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg ${
                    isVisible ? 'animate-slideInUp' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors duration-300">
                        <MapPin className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-tajawal font-bold text-foreground mb-1">
                          {city.name}
                        </h3>
                        <p className="text-sm text-muted-foreground font-cairo">
                          {city.coverage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="h-4 w-4 text-accent" />
                        <span className="text-sm font-cairo text-accent font-semibold">
                          {city.response}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-cairo">
{city.responseLabel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={`mt-8 p-6 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20 ${
              isVisible ? 'animate-scaleIn animation-delay-600' : 'opacity-0'
            }`}>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-tajawal font-bold text-secondary mb-1">10+</div>
                  <div className="text-xs text-muted-foreground font-cairo">{t('coverage.stats.cities')}</div>
                </div>
                <div>
                  <div className="text-2xl font-tajawal font-bold text-secondary mb-1">24/7</div>
                  <div className="text-xs text-muted-foreground font-cairo">{t('coverage.stats.service')}</div>
                </div>
                <div>
                  <div className="text-2xl font-tajawal font-bold text-secondary mb-1">100%</div>
                  <div className="text-xs text-muted-foreground font-cairo">{t('coverage.stats.coverage')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;