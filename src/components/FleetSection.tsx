import { Car, Shield, Gauge, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import fleet1 from '@/assets/fleet-1.jpg';
import fleet2 from '@/assets/fleet-2.jpg';
import fleet3 from '@/assets/fleet-3.jpg';

const FleetSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [currentVehicle, setCurrentVehicle] = useState(0);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const vehiclesData = t('fleet.vehicles', { returnObjects: true }) as any[];
  const vehicles = vehiclesData.map((vehicle, index) => ({
    ...vehicle,
    image: [fleet1, fleet2, fleet3][index] || fleet1
  }));

  const nextVehicle = () => {
    setCurrentVehicle((prev) => (prev + 1) % vehicles.length);
  };

  const prevVehicle = () => {
    setCurrentVehicle((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  return (
    <section ref={sectionRef} id="fleet" className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slideInUp' : 'opacity-0'}`}>
          <div className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-4`}>
            <Car className="h-4 w-4 text-secondary" />
            <span className="text-secondary font-cairo text-sm">{t('fleet.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-tajawal font-black text-foreground mb-4">
            {t('fleet.title')} <span className="text-transparent bg-clip-text bg-gradient-gold">{t('fleet.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-cairo max-w-2xl mx-auto">
            {t('fleet.subtitle')}
          </p>
        </div>

        {/* Vehicle Showcase */}
        <div className="max-w-6xl mx-auto">
          <div className={`bg-card rounded-3xl overflow-hidden border border-border shadow-2xl ${
            isVisible ? 'animate-scaleIn animation-delay-200' : 'opacity-0'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Vehicle Image */}
              <div className="h-96 lg:h-full relative bg-gradient-to-br from-primary to-primary-glow">
                {vehicles[currentVehicle].image ? (
                  <img
                    src={vehicles[currentVehicle].image}
                    alt={vehicles[currentVehicle].name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="h-32 w-32 text-secondary/20" />
                  </div>
                )}
                
                {/* Navigation Buttons */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                  <button
                    onClick={prevVehicle}
                    className="p-3 bg-background/20 backdrop-blur-sm rounded-full hover:bg-secondary/30 transition-all duration-300"
                  >
                    <ChevronLeft className="h-6 w-6 text-foreground" />
                  </button>
                  <button
                    onClick={nextVehicle}
                    className="p-3 bg-background/20 backdrop-blur-sm rounded-full hover:bg-secondary/30 transition-all duration-300"
                  >
                    <ChevronRight className="h-6 w-6 text-foreground" />
                  </button>
                </div>

                {/* Vehicle Type Badge */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-full">
                  <span className="text-primary font-cairo font-semibold">
                    {vehicles[currentVehicle].type}
                  </span>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-tajawal font-bold text-foreground mb-6">
                  {vehicles[currentVehicle].name}
                </h3>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-cairo font-semibold text-secondary mb-4">
                    {t('fleet.securityFeatures')}
                  </h4>
                  <div className="space-y-3">
                    {vehicles[currentVehicle].features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}
                      >
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <Shield className="h-4 w-4 text-secondary" />
                        </div>
                        <span className="text-foreground/80 font-cairo">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/50 rounded-xl border border-border">
                    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-2`}>
                      <Car className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-muted-foreground font-cairo">{t('fleet.specs.capacity')}</span>
                    </div>
                    <span className="text-lg font-tajawal font-semibold text-foreground">
                      {vehicles[currentVehicle].specs.seats}
                    </span>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-border">
                    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-2`}>
                      <Shield className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-muted-foreground font-cairo">{t('fleet.specs.armor')}</span>
                    </div>
                    <span className="text-lg font-tajawal font-semibold text-foreground">
                      {vehicles[currentVehicle].specs.armor}
                    </span>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-border">
                    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-2`}>
                      <Gauge className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-muted-foreground font-cairo">{t('fleet.specs.speed')}</span>
                    </div>
                    <span className="text-lg font-tajawal font-semibold text-foreground">
                      {vehicles[currentVehicle].specs.speed}
                    </span>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-border">
                    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-2`}>
                      <Lock className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-muted-foreground font-cairo">{t('fleet.specs.range')}</span>
                    </div>
                    <span className="text-lg font-tajawal font-semibold text-foreground">
                      {vehicles[currentVehicle].specs.range}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button 
                  onClick={() => {
                    // Create a WhatsApp message for vehicle booking
                    const whatsappNumber = '212638255620';
                    const message = t('fleet.bookingMessage', { vehicle: vehicles[currentVehicle].name });
                    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full mt-8 py-4 bg-gradient-gold text-primary font-cairo font-bold rounded-xl hover:shadow-gold transition-all duration-300 hover:scale-105"
                >
                  {t('fleet.bookVehicle')}
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Selector */}
          <div className={`flex flex-col items-center mt-8 space-y-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            {/* Vehicle Dots */}
            <div className={`flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
              {vehicles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVehicle(index)}
                  className={`h-2 transition-all duration-300 ${
                    index === currentVehicle
                      ? 'w-12 bg-secondary'
                      : 'w-2 bg-foreground/30 hover:bg-foreground/50'
                  } rounded-full`}
                ></button>
              ))}
            </div>
            
            {/* View All Vehicles Button */}
            <button
              onClick={() => {
                // Show all vehicles in a grid view
                const allVehiclesContainer = document.createElement('div');
                allVehiclesContainer.className = 'fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto';
                allVehiclesContainer.innerHTML = `
                  <div class="container mx-auto px-4 py-8">
                    <div class="flex justify-between items-center mb-8">
                      <h3 class="text-3xl font-tajawal font-bold text-foreground">${t('fleet.viewAllVehicles')}</h3>
                      <button onclick="this.closest('.fixed').remove()" class="p-2 hover:bg-secondary/10 rounded-full transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      ${vehicles.map((vehicle, index) => `
                        <div class="bg-card rounded-2xl p-6 border border-border hover:border-secondary/50 transition-all duration-300">
                          <div class="h-48 bg-gradient-to-br from-primary to-primary-glow rounded-xl mb-4 flex items-center justify-center">
                            <img src="${vehicle.image}" alt="${vehicle.name}" class="w-full h-full object-cover rounded-xl" />
                          </div>
                          <h4 class="text-xl font-tajawal font-bold text-foreground mb-2">${vehicle.name}</h4>
                          <p class="text-muted-foreground font-cairo text-sm mb-4">${vehicle.description}</p>
                          <div class="flex justify-between items-center">
                            <span class="px-3 py-1 bg-secondary/20 text-secondary text-xs font-cairo rounded-full">${vehicle.type}</span>
                            <button onclick="window.open('https://wa.me/212638255620?text=${encodeURIComponent(t('fleet.bookingMessage', { vehicle: vehicle.name }))}', '_blank')" class="px-4 py-2 bg-gradient-gold text-primary font-cairo font-semibold rounded-lg hover:shadow-gold transition-all duration-300">
                              ${t('fleet.bookVehicle')}
                            </button>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `;
                document.body.appendChild(allVehiclesContainer);
              }}
              className="px-6 py-3 bg-secondary/10 text-secondary font-cairo font-semibold rounded-xl hover:bg-secondary/20 transition-all duration-300 border border-secondary/30"
            >
              {t('fleet.viewAllVehicles')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;