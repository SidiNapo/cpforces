import { Shield, Award, Clock, Users, CheckCircle, Star, TrendingUp, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const WhyChooseUs = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const features = [
    {
      icon: Award,
      title: t('whyChooseUs.features.international.title'),
      description: t('whyChooseUs.features.international.description'),
      stats: '50+',
      label: t('whyChooseUs.features.international.label'),
    },
    {
      icon: Clock,
      title: t('whyChooseUs.features.available.title'),
      description: t('whyChooseUs.features.available.description'),
      stats: '24/7',
      label: t('whyChooseUs.features.available.label'),
    },
    {
      icon: Users,
      title: t('whyChooseUs.features.professional.title'),
      description: t('whyChooseUs.features.professional.description'),
      stats: '100+',
      label: t('whyChooseUs.features.professional.label'),
    },
    {
      icon: TrendingUp,
      title: t('whyChooseUs.features.success.title'),
      description: t('whyChooseUs.features.success.description'),
      stats: '99.9%',
      label: t('whyChooseUs.features.success.label'),
    },
  ];

  const certifications = t('whyChooseUs.certifications.list', { returnObjects: true }) as Array<{name: string, desc: string}>;

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-card to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-mesh opacity-10"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`}>
          <div className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-4`}>
            <Star className="h-4 w-4 text-secondary animate-spin-slow" />
            <span className="text-secondary font-cairo text-sm">{t('whyChooseUs.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-tajawal font-black text-foreground mb-4">
            {t('whyChooseUs.title')} <span className="text-transparent bg-clip-text bg-gradient-gold">{t('whyChooseUs.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-cairo max-w-2xl mx-auto">
            {t('whyChooseUs.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-secondary" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-tajawal font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground font-cairo mb-4">
                  {feature.description}
                </p>
                
                {/* Stats */}
                <div className="pt-4 border-t border-border">
                  <div className="text-3xl font-tajawal font-black text-transparent bg-clip-text bg-gradient-gold">
                    {feature.stats}
                  </div>
                  <div className="text-xs text-muted-foreground font-cairo">
                    {feature.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-primary via-primary-glow to-primary rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-tajawal font-bold text-secondary mb-2">
              {t('whyChooseUs.certifications.title')}
            </h3>
            <p className="text-foreground/80 font-cairo">
              {t('whyChooseUs.certifications.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 border border-secondary/20 group-hover:border-secondary/50 group-hover:bg-background/20 transition-all duration-300">
                  <Globe className="h-8 w-8 text-secondary mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="text-lg font-tajawal font-bold text-secondary mb-1">
                    {cert.name}
                  </div>
                  <div className="text-xs text-foreground/70 font-cairo">
                    {cert.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-8 text-center">
            <div className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-6 py-3 bg-secondary/20 backdrop-blur-sm rounded-full`}>
              <CheckCircle className="h-5 w-5 text-secondary" />
              <span className="text-secondary font-cairo font-semibold">
                {t('whyChooseUs.trustBadge')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;