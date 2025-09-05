import { useState } from 'react';
import { Award, Shield, Star, CheckCircle, X, Medal, Target, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const teamMembers = t('team.members', { returnObjects: true }) as any[];

  const achievements = [
    { icon: Shield, label: t('team.achievements.operations'), value: '1000+' },
    { icon: Award, label: t('team.achievements.certifications'), value: '50+' },
    { icon: Star, label: t('team.achievements.rating'), value: '4.9/5' },
  ];

  return (
    <section id="team" className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212, 175, 55, 0.1) 35px, rgba(212, 175, 55, 0.1) 70px)`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full mb-4`}>
            <Award className="h-4 w-4 text-secondary" />
            <span className="text-secondary font-cairo text-sm">{t('team.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-tajawal font-black text-foreground mb-4">
            {t('team.title')} <span className="text-transparent bg-clip-text bg-gradient-gold">{t('team.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground font-cairo max-w-2xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl cursor-pointer transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedMember(member)}
            >
              {/* Image */}
              <div className="h-80 relative overflow-hidden bg-gradient-to-br from-primary to-primary-glow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Click Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                     <div className="bg-secondary/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2">
                     <span className="text-primary font-cairo font-semibold">{t('team.viewDetails')}</span>
                     <Shield className="h-5 w-5 text-primary" />
                   </div>
                </div>
                
                {/* Experience Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full">
                  <span className="text-primary font-cairo font-semibold text-sm">
                    {member.experience}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-tajawal font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-secondary font-cairo text-sm mb-4">
                  {member.role}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-cairo rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Certifications */}
                <div className="space-y-2 pt-4 border-t border-border">
                  {member.certifications.slice(0, 2).map((cert, idx) => (
                    <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircle className="h-3 w-3 text-accent flex-shrink-0" />
                      <span className="text-xs text-muted-foreground font-cairo">
                        {cert}
                      </span>
                    </div>
                  ))}
                                     {member.certifications.length > 2 && (
                     <span className="text-xs text-secondary font-cairo">
                       +{member.certifications.length - 2} {isRTL ? 'شهادات أخرى' : 'more certifications'}
                     </span>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Member Modal */}
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5 border-secondary/20">
                         <DialogTitle className="sr-only">{t('team.modalTitle')}</DialogTitle>
            {selectedMember && (
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute -top-2 -right-2 z-50 w-10 h-10 bg-secondary/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
                
                {/* Header with Image */}
                <div className="relative h-72 rounded-2xl overflow-hidden mb-8">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                  <div className="absolute bottom-6 right-6">
                    <h2 className="text-4xl font-tajawal font-bold text-foreground mb-2">{selectedMember.name}</h2>
                    <p className="text-xl text-secondary font-cairo">{selectedMember.role}</p>
                  </div>
                                     <div className="absolute top-6 left-6 px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-full">
                     <span className="text-primary font-cairo font-bold">{t('team.experience')} {selectedMember.experience}</span>
                   </div>
                </div>
                
                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                  {/* About Section */}
                  <div className="space-y-6">
                    <div>
                                             <h3 className="text-xl font-tajawal font-bold text-secondary mb-4 flex items-center gap-2">
                         <Users className="h-5 w-5" />
                         {t('team.personalProfile')}
                       </h3>
                      <p className="text-muted-foreground font-cairo leading-relaxed whitespace-pre-line">
                        {selectedMember.fullDescription}
                      </p>
                    </div>
                    
                    {/* Vision */}
                    <div className="p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                                             <h4 className="text-lg font-tajawal font-bold text-secondary mb-3 flex items-center gap-2">
                         <Target className="h-5 w-5" />
                         {t('team.vision')}
                       </h4>
                      <p className="text-muted-foreground font-cairo">{selectedMember.vision}</p>
                    </div>
                  </div>
                  
                  {/* Qualifications & Services */}
                  <div className="space-y-6">
                    {/* Qualifications */}
                    <div>
                                             <h3 className="text-xl font-tajawal font-bold text-secondary mb-4 flex items-center gap-2">
                         <Medal className="h-5 w-5" />
                         {t('team.qualifications')}
                       </h3>
                      <div className="space-y-3">
                        {selectedMember.qualifications.map((qual: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground font-cairo text-sm">{qual}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Services */}
                    <div>
                                             <h3 className="text-xl font-tajawal font-bold text-secondary mb-4 flex items-center gap-2">
                         <Shield className="h-5 w-5" />
                         {t('team.services')}
                       </h3>
                      <div className="space-y-3">
                        {selectedMember.services.map((service: string, idx: number) => (
                          <div key={idx} className="p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors">
                            <span className="text-muted-foreground font-cairo text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <button 
                    onClick={() => {
                      const whatsappNumber = '212619784088';
                      const message = t('team.consultationMessage', { member: selectedMember.name });
                      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="px-8 py-3 bg-gradient-gold text-primary font-cairo font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {t('team.bookConsultation')}
                  </button>
                  <button 
                    onClick={() => {
                      const whatsappNumber = '212619784088';
                      const message = t('team.contactMessage', { member: selectedMember.name });
                      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="px-8 py-3 bg-primary/10 text-foreground font-cairo font-semibold rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                  >
                    {t('team.contactUs')}
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-primary via-primary-glow to-primary rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-4 group-hover:bg-secondary/30 transition-colors duration-300">
                  <achievement.icon className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-4xl font-tajawal font-bold text-secondary mb-2">
                  {achievement.value}
                </div>
                <div className="text-foreground/80 font-cairo">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;