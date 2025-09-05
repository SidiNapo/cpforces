import { X, Shield, Check, Star, Clock, Award, Users, Lock } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceDetail {
  icon: any;
  title: string;
  description: string;
  image: string;
  features: string[];
  detailedInfo: {
    overview: string;
    benefits: string[];
    process: string[];
    packages: {
      name: string;
      features: string[];
      highlighted?: boolean;
    }[];
    additionalImages: string[];
    testimonial?: {
      text: string;
      author: string;
      role: string;
    };
  };
}

interface ServiceDetailsDrawerProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailsDrawer = ({ service, isOpen, onClose }: ServiceDetailsDrawerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  if (!service) return null;

  const allImages = [service.image, ...(service.detailedInfo?.additionalImages || [])];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-hidden">
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader className="relative pb-0">
            <button
              onClick={onClose}
              className="absolute left-4 top-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-accent transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>
          </DrawerHeader>

          <div className="overflow-y-auto max-h-[80vh] px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Images Section */}
              <div className="space-y-4">
                <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  {/* Image Navigation */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'w-8 bg-secondary' 
                              : 'bg-secondary/30 hover:bg-secondary/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'border-secondary shadow-gold' 
                            : 'border-border hover:border-secondary/50'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${service.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                {/* Title and Icon */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-xl">
                    <service.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-tajawal font-bold text-foreground mb-2">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground font-cairo">
                      {service.detailedInfo?.overview || service.description}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h3 className="text-xl font-tajawal font-bold text-foreground flex items-center gap-2">
                    <Award className="h-5 w-5 text-secondary" />
                    {t('services.detailsModal.benefits')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.detailedInfo?.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                        <Check className="h-4 w-4 text-secondary shrink-0" />
                        <span className="text-sm font-cairo text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div className="space-y-3">
                  <h3 className="text-xl font-tajawal font-bold text-foreground flex items-center gap-2">
                    <Clock className="h-5 w-5 text-secondary" />
                    {t('services.detailsModal.process')}
                  </h3>
                  <div className="space-y-2">
                    {service.detailedInfo?.process.map((step, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-secondary font-bold shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm font-cairo text-muted-foreground pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packages */}
                <div className="space-y-3">
                  <h3 className="text-xl font-tajawal font-bold text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-secondary" />
                    {t('services.detailsModal.packages')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {service.detailedInfo?.packages.map((pkg, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          pkg.highlighted 
                            ? 'border-secondary bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-gold' 
                            : 'border-border hover:border-secondary/50 bg-card'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-tajawal font-bold text-foreground">{pkg.name}</h4>
                          {pkg.highlighted && (
                            <Badge className="bg-secondary text-primary">
                              {t('services.detailsModal.mostPopular')}
                            </Badge>
                          )}
                        </div>
                        <ul className="space-y-1">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="text-xs font-cairo text-muted-foreground flex items-start gap-1">
                              <Check className="h-3 w-3 text-secondary shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {service.detailedInfo?.testimonial && (
                  <div className="p-4 bg-card rounded-xl border border-border">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <p className="text-sm font-cairo text-muted-foreground italic mb-2">
                      "{service.detailedInfo.testimonial.text}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Users className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs font-tajawal font-bold text-foreground">
                          {service.detailedInfo.testimonial.author}
                        </p>
                        <p className="text-xs font-cairo text-muted-foreground">
                          {service.detailedInfo.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => {
                      const whatsappNumber = '212619784088';
                      const message = t('services.detailsModal.bookingMessage', { service: service?.title || '' });
                      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="flex-1 bg-gradient-to-r from-primary to-primary-glow text-secondary hover:shadow-gold"
                  >
                    <Lock className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('services.detailsModal.bookNow')}
                  </Button>
                  <Button 
                    onClick={() => {
                      const whatsappNumber = '212619784088';
                      const message = t('services.detailsModal.consultationMessage', { service: service?.title || '' });
                      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    variant="outline" 
                    className="flex-1 border-secondary/30 hover:border-secondary hover:bg-secondary/10"
                  >
                    <Shield className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('services.detailsModal.freeConsultation')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ServiceDetailsDrawer;