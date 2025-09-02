import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const whatsappNumber = '212619784088'; // Remove + and dashes for WhatsApp link
  const message = 'مرحباً، أريد الاستفسار عن خدماتكم';
  
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="تواصل معنا عبر واتساب"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
        
        {/* Main button */}
        <div className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center">
          <MessageCircle className="h-6 w-6 fill-white" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-card text-card-foreground text-xs font-cairo px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-border">
            تواصل معنا عبر واتساب
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-card"></div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;