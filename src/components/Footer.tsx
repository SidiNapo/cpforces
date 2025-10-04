import { Shield, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
const logo = '/lovable-uploads/299a0b3d-16b0-498a-b224-fd3d88d44733.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const quickLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.team'), href: '#team' },
    { name: t('nav.fleet'), href: '#fleet' },
    { name: t('nav.coverage'), href: '#coverage' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const services = t('footer.servicesList', { returnObjects: true }) as string[];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-b from-card to-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} mb-4`}>
              <img src={logo} alt={t('footer.companyName')} className="h-12 w-12 object-contain" />
              <div>
                <h3 className="text-lg font-tajawal font-bold text-foreground">
                  {t('footer.companyName')}
                </h3>
                <p className="text-xs text-muted-foreground font-cairo">
                  {t('footer.companyNameEn')}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-cairo mb-4">
              {t('footer.description')}
            </p>
            <div className={`flex space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors duration-300"
                >
                  <social.icon className="h-5 w-5 text-secondary" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-tajawal font-semibold text-foreground mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground font-cairo hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-tajawal font-semibold text-foreground mb-4">
              {t('footer.services')}
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm text-muted-foreground font-cairo">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-tajawal font-semibold text-foreground mb-4">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-3">
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                <a
                  href="tel:+212638255620"
                  className="text-sm text-muted-foreground font-cairo hover:text-secondary transition-colors"
                  dir="ltr"
                >
                  +212 619-784088
                </a>
              </div>
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <a
                  href="mailto:anassg4s5@gmail.com"
                  className="text-sm text-muted-foreground font-cairo hover:text-secondary transition-colors"
                  dir="ltr"
                >
                 anassg4s5@gmail.com
                </a>
              </div>
              <div className={`flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-1" />
                <span className="text-sm text-muted-foreground font-cairo">
                  {t('footer.location')}
                </span>
              </div>
            </div>

            {/* Emergency Button */}
            <a
              href="tel:+212638255620"
              className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mt-4 px-4 py-2 bg-destructive text-foreground font-cairo font-semibold text-sm rounded-lg hover:bg-destructive/90 transition-all duration-300 group`}
            >
              <Phone className="h-4 w-4 group-hover:animate-pulse" />
              <span>{t('footer.emergencyLine')}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className={`text-sm text-muted-foreground font-cairo text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              © {currentYear} {t('footer.companyName')}. {t('footer.allRightsReserved')}.
            </div>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''} text-sm text-muted-foreground font-cairo`}>
              <a href="#" className="hover:text-secondary transition-colors">
                {t('footer.privacyPolicy')}
              </a>
              <span>|</span>
              <a href="#" className="hover:text-secondary transition-colors">
                {t('footer.termsConditions')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;