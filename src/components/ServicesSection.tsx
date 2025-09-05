import { Shield, Star, Building, Plane, Calendar, Lock } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import serviceVip from '@/assets/service-vip.jpg';
import serviceEvent from '@/assets/service-event.jpg';
import serviceTourist from '@/assets/service-tourist.jpg';
import serviceWedding from '@/assets/service-wedding.jpg';
import serviceAdvanced from '@/assets/service-advanced.jpg';
import serviceResidential from '@/assets/service-residential.jpg';
import ServiceDetailsDrawer from './ServiceDetailsDrawer';

const ServicesSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const services = [
    {
      icon: Star,
      title: t('services.celebrity.title'),
      description: t('services.celebrity.description'),
      image: serviceVip,
      features: t('services.celebrity.features', { returnObjects: true }) as string[],
      detailedInfo: {
        overview: t('services.celebrity.overview'),
        benefits: t('services.celebrity.benefits', { returnObjects: true }) as string[],
        process: t('services.celebrity.process', { returnObjects: true }) as string[],
        packages: t('services.celebrity.packages', { returnObjects: true }) as any[],
        additionalImages: [serviceVip, serviceEvent],
        testimonial: {
          text: 'خدمة احترافية بكل المقاييس، الفريق محترف ومدرب على أعلى مستوى',
          author: 'أحمد محمد',
          role: 'فنان مشهور'
        }
      }
    },
    {
      icon: Building,
      title: t('services.business.title'),
      description: t('services.business.description'),
      image: serviceEvent,
      features: t('services.business.features', { returnObjects: true }) as string[],
      detailedInfo: {
        overview: t('services.business.overview'),
        benefits: t('services.business.benefits', { returnObjects: true }) as string[],
        process: t('services.business.process', { returnObjects: true }) as string[],
        packages: t('services.business.packages', { returnObjects: true }) as any[],
        additionalImages: [serviceAdvanced, serviceVip],
        testimonial: {
          text: 'أشعر بالأمان التام مع فريق Close Protection Forces، احترافية عالية',
          author: 'سعيد الحسني',
          role: 'رئيس تنفيذي'
        }
      }
    },
    {
      icon: Plane,
      title: t('services.tourist.title'),
      description: t('services.tourist.description'),
      image: serviceTourist,
      features: t('services.tourist.features', { returnObjects: true }) as string[],
      detailedInfo: {
        overview: t('services.tourist.overview'),
        benefits: t('services.tourist.benefits', { returnObjects: true }) as string[],
        process: t('services.tourist.process', { returnObjects: true }) as string[],
        packages: t('services.tourist.packages', { returnObjects: true }) as any[],
        additionalImages: [serviceTourist, serviceWedding],
        testimonial: {
          text: 'تجربة رائعة، شعرت بالأمان طوال رحلتي في المغرب',
          author: 'جون سميث',
          role: 'سائح من الولايات المتحدة'
        }
      }
    },
    {
      icon: Calendar,
      title: t('services.events.title'),
      description: t('services.events.description'),
      image: serviceWedding,
      features: t('services.events.features', { returnObjects: true }) as string[],
      detailedInfo: {
        overview: t('services.events.overview'),
        benefits: t('services.events.benefits', { returnObjects: true }) as string[],
        process: t('services.events.process', { returnObjects: true }) as string[],
        packages: t('services.events.packages', { returnObjects: true }) as any[],
        additionalImages: [serviceWedding, serviceEvent],
        testimonial: {
          text: 'نظموا أمن حفل زفافي بشكل رائع، كل شيء كان مثالياً',
          author: 'فاطمة الزهراء',
          role: 'عروس سعيدة'
        }
      }
    },
    {
      icon: Lock,
      title: t('services.advanced.title'),
      description: t('services.advanced.description'),
      image: serviceAdvanced,
      features: t('services.advanced.features', { returnObjects: true }) as string[],
      detailedInfo: {
        overview: t('services.advanced.overview'),
        benefits: t('services.advanced.benefits', { returnObjects: true }) as string[],
        process: t('services.advanced.process', { returnObjects: true }) as string[],
        packages: t('services.advanced.packages', { returnObjects: true }) as any[],
        additionalImages: [serviceAdvanced, serviceResidential],
        testimonial: {
          text: 'برنامج تدريبي ممتاز، تعلمت الكثير عن الأمن الشخصي',
          author: 'خالد العمري',
          role: 'مدير أمني'
        }
      }
    },
    {
      icon: Shield,
      title: t('services.residential.title'),
      description: t('services.residential.description'),
      image: serviceResidential,
      features: t('services.residential.features', { returnObjects: true }) as string[],
      detailedInfo: {
        overview: t('services.residential.overview'),
        benefits: t('services.residential.benefits', { returnObjects: true }) as string[],
        process: t('services.residential.process', { returnObjects: true }) as string[],
        packages: t('services.residential.packages', { returnObjects: true }) as any[],
        additionalImages: [serviceResidential, serviceAdvanced],
        testimonial: {
          text: 'أشعر بالأمان التام في منزلي بفضل خدماتهم المتميزة',
          author: 'ليلى الحمداني',
          role: 'صاحبة فيلا'
        }
      }
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`}>
          <div className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-4`}>
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-secondary font-cairo text-sm">{t('services.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-tajawal font-black text-foreground mb-4">
            {t('services.title')} <span className="text-transparent bg-clip-text bg-gradient-gold">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-cairo max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-secondary/50 transition-all duration-500 hover:shadow-gold hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'animate-scaleIn' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                setSelectedService(service);
                setIsDrawerOpen(true);
              }}
            >
              {/* Image or Icon Background */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary to-primary-glow">
                {service.image ? (
                  <>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <service.icon className="h-20 w-20 text-secondary/30 group-hover:text-secondary/50 transition-colors duration-500" />
                  </div>
                )}
                
                {/* Floating Icon */}
                <div className="absolute top-4 right-4 p-3 bg-background/20 backdrop-blur-sm rounded-xl border border-secondary/20 group-hover:bg-secondary/20 transition-all duration-300">
                  <service.icon className="h-6 w-6 text-secondary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-tajawal font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-cairo text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-cairo rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="w-full py-3 bg-gradient-gold text-primary font-cairo font-semibold rounded-xl hover:shadow-gold transition-all duration-300 hover:scale-105"
                  >
                    {t('services.learnMore')}
                  </button>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Service Details Drawer */}
      <ServiceDetailsDrawer 
        service={selectedService}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedService(null);
        }}
      />
    </section>
  );
};

export default ServicesSection;