import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PromotionalBanners = () => {
  const [language, setLanguage] = useState('en');
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const banners = [
    {
      id: 1,
      title: language === 'ar' ? 'عرض الشتاء الخاص' : 'Winter Special Offer',
      subtitle: language === 'ar' ? 'خصم 25% على جميع الحجوزات' : '25% Off All Bookings',
      description: language === 'ar' ? 'احجز الآن واستمتع بخصم 25% على جميع السيارات. العرض ساري حتى نهاية يناير.' : 'Book now and enjoy 25% discount on all vehicles. Offer valid until end of January.',
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
      bgGradient: 'from-blue-600 to-purple-600',
      ctaText: language === 'ar' ? 'احجز الآن' : 'Book Now',
      validUntil: '2025-01-31',
      discount: '25%'
    },
    {
      id: 2,
      title: language === 'ar' ? 'عضوية VIP' : 'VIP Membership',
      subtitle: language === 'ar' ? 'انضم إلى برنامج الولاء' : 'Join Our Loyalty Program',
      description: language === 'ar' ? 'احصل على نقاط مكافآت، ترقيات مجانية، وخصومات حصرية مع عضوية VIP.' : 'Earn reward points, free upgrades, and exclusive discounts with VIP membership.',
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
      bgGradient: 'from-amber-500 to-orange-600',
      ctaText: language === 'ar' ? 'انضم الآن' : 'Join Now',
      validUntil: null,
      discount: 'VIP'
    },
    {
      id: 3,
      title: language === 'ar' ? 'حجز طويل المدى' : 'Long-term Rental',
      subtitle: language === 'ar' ? 'وفر أكثر مع الحجوزات الشهرية' : 'Save More with Monthly Bookings',
      description: language === 'ar' ? 'احجز لمدة شهر أو أكثر واحصل على خصومات تصل إلى 40% مع خدمات إضافية مجانية.' : 'Book for a month or more and get up to 40% discount with free additional services.',
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800",
      bgGradient: 'from-green-500 to-teal-600',
      ctaText: language === 'ar' ? 'اعرف المزيد' : 'Learn More',
      validUntil: null,
      discount: '40%'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const isRTL = language === 'ar';
  const banner = banners[currentBanner];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 font-heading">
        {language === 'ar' ? 'العروض الخاصة' : 'Special Offers'}
      </h2>

      <div className="relative bg-card border border-border rounded-xl overflow-hidden">
        <div className={`bg-gradient-to-r ${banner.bgGradient} relative`}>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[300px]">
            {/* Content Section */}
            <div className="p-6 lg:p-8 flex flex-col justify-center text-white">
              <div className="mb-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                    {banner.discount}
                  </span>
                  {banner.validUntil && (
                    <span className="text-xs opacity-80">
                      {language === 'ar' ? 'صالح حتى' : 'Valid until'} {new Date(banner.validUntil).toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US')}
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 font-heading">
                  {banner.title}
                </h3>
                
                <p className="text-lg lg:text-xl font-medium mb-3 opacity-90">
                  {banner.subtitle}
                </p>
                
                <p className="text-sm lg:text-base opacity-80 line-clamp-3">
                  {banner.description}
                </p>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Button
                  variant="secondary"
                  iconName="ArrowRight"
                  iconPosition={isRTL ? "left" : "right"}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  {banner.ctaText}
                </Button>
                
                <button className="text-white/80 hover:text-white text-sm underline transition-colors duration-200">
                  {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative h-48 lg:h-auto">
              <Image
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/20"></div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={prevBanner}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
        </div>
        
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={nextBanner}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanners;