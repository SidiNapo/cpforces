import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TestimonialsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const testimonials = [
    {
      name: 'كريم العلوي',
      role: 'رجل أعمال',
      rating: 5,
      text: 'خدمة استثنائية ومستوى احترافي عالٍ جداً. فريق Close Protection Forces وفر لي الأمان التام خلال جميع رحلاتي وأعمالي. أنصح بشدة بخدماتهم.',
      image: null,
    },
    {
      name: 'سارة المنصوري',
      role: 'مديرة تنفيذية',
      rating: 5,
      text: 'الفريق محترف ومدرب على أعلى مستوى. الخدمة سريعة والاستجابة فورية. أشعر بالأمان التام مع Close Protection Forces.',
      image: null,
    },
    {
      name: 'أحمد بنعلي',
      role: 'سفير دولي',
      rating: 5,
      text: 'تعاملت مع العديد من شركات الحماية حول العالم، وClose Protection Forces من أفضل ما رأيت. احترافية عالية وسرية تامة.',
      image: null,
    },
    {
      name: 'ليلى الفاسي',
      role: 'فنانة مشهورة',
      rating: 5,
      text: 'أثق تماماً في فريق Close Protection Forces. يوفرون الحماية مع احترام الخصوصية والراحة النفسية. خدمة ممتازة.',
      image: null,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-secondary/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`}>
          <div className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-4`}>
            <Quote className="h-4 w-4 text-secondary" />
            <span className="text-secondary font-cairo text-sm">{t('testimonials.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-tajawal font-black text-foreground mb-4">
            {t('testimonials.title')} <span className="text-transparent bg-clip-text bg-gradient-gold">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-cairo max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full border border-border hover:border-secondary/50 hover:bg-card flex items-center justify-center transition-all duration-300 group"
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full border border-border hover:border-secondary/50 hover:bg-card flex items-center justify-center transition-all duration-300 group"
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
          </button>

          {/* Testimonial Cards */}
          <div className="relative h-[400px] md:h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0 scale-100'
                    : index === (currentIndex - 1 + testimonials.length) % testimonials.length
                    ? 'opacity-0 -translate-x-full scale-95'
                    : 'opacity-0 translate-x-full scale-95'
                }`}
              >
                <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-3xl p-8 md:p-12 border border-border shadow-2xl">
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <Quote className="h-8 w-8 text-secondary/50" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 space-x-reverse mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg md:text-xl text-foreground/90 font-cairo leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                      <span className="text-primary font-tajawal font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-lg font-tajawal font-bold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground font-cairo">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 space-x-reverse mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-secondary'
                    : 'bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: '500+', label: t('testimonials.stats.clients') },
            { value: '4.9/5', label: t('testimonials.stats.rating') },
            { value: '1000+', label: t('testimonials.stats.missions') },
            { value: '10+', label: t('testimonials.stats.experience') },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-tajawal font-black text-transparent bg-clip-text bg-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-cairo">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;