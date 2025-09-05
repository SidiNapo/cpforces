import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Shield } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - Replace with your actual credentials
      const serviceId = 'service_z6pxd1v'; // Replace with your EmailJS service ID
      const templateId = 'template_utf0fbs'; // Replace with your EmailJS template ID
      const publicKey = 'FcQkl3NJTCRDKye2R'; // Replace with your EmailJS public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        service: formData.service,
        message: formData.message,
        to_name: 'Close Protection Forces',
        reply_to: formData.email,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.call'),
      value: '+212 619-784088',
      action: 'tel:+212619784088',
    },
    {
      icon: MessageCircle,
      title: t('contact.info.whatsapp'),
      value: '+212 619-784088',
      action: 'https://wa.me/212619784088',
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      value: 'info@cpforces.ma',
      action: 'mailto:info@cpforces.ma',
    },
    {
      icon: MapPin,
      title: t('contact.info.headquarters'),
      value: t('contact.info.location'),
      action: '#',
    },
  ];

  const services = t('footer.servicesList', { returnObjects: true }) as string[];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gradient-to-b from-background to-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`}>
          <div className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-4`}>
            <Shield className="h-4 w-4 text-secondary" />
            <span className="text-secondary font-cairo text-sm">{t('contact.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-tajawal font-black text-foreground mb-4">
            {t('contact.title')} <span className="text-transparent bg-clip-text bg-gradient-gold">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-cairo max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 border border-border">
            <h3 className="text-2xl font-tajawal font-bold text-foreground mb-6">
              {t('contact.form.title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-cairo text-muted-foreground mb-2">
                    {t('contact.form.fullName')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-secondary focus:outline-none transition-colors font-cairo"
                    placeholder={t('contact.form.fullNamePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-cairo text-muted-foreground mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-secondary focus:outline-none transition-colors font-cairo"
                    placeholder={t('contact.form.phonePlaceholder')}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-cairo text-muted-foreground mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-secondary focus:outline-none transition-colors font-cairo"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-cairo text-muted-foreground mb-2">
                  {t('contact.form.serviceType')}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-secondary focus:outline-none transition-colors font-cairo"
                  required
                >
                  <option value="">{t('contact.form.selectService')}</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-cairo text-muted-foreground mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-secondary focus:outline-none transition-colors font-cairo resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={4}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-gradient-gold text-primary font-cairo font-bold rounded-xl hover:shadow-gold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    <span>{t('contact.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{t('contact.form.submit')}</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-cairo font-semibold">{t('contact.form.successMessage')}</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center space-x-2 text-red-600">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-cairo font-semibold">{t('contact.form.errorMessage')}</span>
                  </div>
                </div>
              )}
            </form>

            {/* Response Time */}
            <div className={`mt-6 p-4 bg-secondary/10 rounded-xl flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Clock className="h-5 w-5 text-secondary flex-shrink-0" />
              <p className="text-sm font-cairo text-foreground/80">
                {t('contact.form.responseTime')}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.action}
                  className="group p-6 bg-card rounded-2xl border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors duration-300">
                      <info.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-cairo font-semibold text-foreground mb-1">
                        {info.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-cairo" dir="ltr">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability Banner */}
            <div className="bg-gradient-to-r from-accent to-accent-glow rounded-2xl p-8 text-center">
              <Shield className="h-12 w-12 text-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-tajawal font-bold text-foreground mb-2">
                {t('contact.availability.title')}
              </h3>
              <p className="text-foreground/80 font-cairo mb-6">
                {t('contact.availability.subtitle')}
              </p>
              <a
                href="tel:+212619784088"
                className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-6 py-3 bg-foreground/10 backdrop-blur-sm rounded-xl hover:bg-foreground/20 transition-all duration-300`}
              >
                <Phone className="h-5 w-5 text-foreground" />
                <span className="font-cairo font-semibold text-foreground">
                  {t('contact.availability.emergencyCall')}
                </span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="text-2xl font-tajawal font-bold text-secondary mb-1">100%</div>
                <div className="text-xs text-muted-foreground font-cairo">{t('contact.trustBadges.confidentiality')}</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="text-2xl font-tajawal font-bold text-secondary mb-1">24/7</div>
                <div className="text-xs text-muted-foreground font-cairo">{t('contact.trustBadges.support')}</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl border border-border">
                <div className="text-2xl font-tajawal font-bold text-secondary mb-1">15+</div>
                <div className="text-xs text-muted-foreground font-cairo">{t('contact.trustBadges.experience')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;