import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCards = () => {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const quickActions = [
    {
      id: 1,
      title: language === 'ar' ? 'تصفح السيارات' : 'Browse Cars',
      description: language === 'ar' ? 'اكتشف مجموعة واسعة من السيارات المتاحة' : 'Discover our wide range of available vehicles',
      icon: 'Search',
      color: 'bg-blue-500',
      route: '/car-browse-and-search-screen',
      badge: language === 'ar' ? '50+ سيارة' : '50+ Cars'
    },
    {
      id: 2,
      title: language === 'ar' ? 'عرض الإيجار الحالي' : 'View Current Rental',
      description: language === 'ar' ? 'تحقق من تفاصيل الإيجار النشط' : 'Check your active rental details',
      icon: 'Car',
      color: 'bg-green-500',
      route: '/car-detail-and-booking-screen',
      badge: language === 'ar' ? 'نشط' : 'Active'
    },
    {
      id: 3,
      title: language === 'ar' ? 'تاريخ الحجوزات' : 'Booking History',
      description: language === 'ar' ? 'راجع جميع حجوزاتك السابقة' : 'Review all your past bookings',
      icon: 'History',
      color: 'bg-purple-500',
      route: '/booking-management-screen',
      badge: language === 'ar' ? '12 حجز' : '12 Bookings'
    }
  ];

  const handleActionClick = (route) => {
    navigate(route);
  };

  const isRTL = language === 'ar';

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 font-heading">
        {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <div
            key={action.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => handleActionClick(action.route)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={24} color="white" />
              </div>
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                {action.badge}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
              {action.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {action.description}
            </p>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowRight"
                iconPosition={isRTL ? "left" : "right"}
                className="text-primary hover:text-primary-foreground hover:bg-primary p-0 h-auto"
              >
                {language === 'ar' ? 'انتقل' : 'Go'}
              </Button>
              
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span className="text-xs">
                  {language === 'ar' ? 'متاح الآن' : 'Available now'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionCards;