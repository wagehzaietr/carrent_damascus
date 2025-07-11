import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  const [language, setLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (language === 'ar') {
      if (hour < 12) return 'صباح الخير';
      if (hour < 17) return 'مساء الخير';
      return 'مساء الخير';
    } else {
      if (hour < 12) return 'Good Morning';
      if (hour < 17) return 'Good Afternoon';
      return 'Good Evening';
    }
  };

  const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentTime.toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US', options);
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 font-heading">
            {getGreeting()}, {language === 'ar' ? 'وجيه زعيتر' : 'wageh zaiter'}!
          </h1>
          <p className="text-primary-foreground/80 text-sm md:text-base mb-4">
            {language === 'ar' ?'مرحباً بك في كار رنت دمشق. كيف يمكننا مساعدتك اليوم؟' :'Welcome to CarRent Damascus. How can we help you today?'
            }
          </p>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-primary-foreground/70">
            <Icon name="Calendar" size={16} />
            <span className="text-sm">{formatDate()}</span>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Icon name="Car" size={40} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;