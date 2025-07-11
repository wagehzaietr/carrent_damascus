import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const CustomerNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const navigationItems = [
    {
      path: '/customer-dashboard',
      icon: 'Home',
      label: language === 'ar' ? 'الرئيسية' : 'Dashboard',
      badge: null
    },
    {
      path: '/car-browse-and-search-screen',
      icon: 'Search',
      label: language === 'ar' ? 'تصفح السيارات' : 'Browse Cars',
      badge: null
    },
    {
      path: '/car-detail-and-booking-screen',
      icon: 'Car',
      label: language === 'ar' ? 'تفاصيل السيارة' : 'Car Details',
      badge: null
    },
    {
      path: '/booking-management-screen',
      icon: 'Calendar',
      label: language === 'ar' ? 'حجوزاتي' : 'My Bookings',
      badge: 2
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isRTL = language === 'ar';

  return (
    <>
      {/* Desktop Navigation - Header Integration */}
      <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`relative flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation - Bottom Tabs */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[900] bg-background border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`transition-all duration-200 ${
                    isActive(item.path) ? 'scale-110' : ''
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium truncate max-w-full transition-all duration-200 ${
                isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
              {isActive(item.path) && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Tablet Navigation - Horizontal Header */}
      <nav className="hidden md:flex lg:hidden items-center space-x-4 rtl:space-x-reverse bg-surface border-b border-border px-4 py-3">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`relative flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </>
  );
};

export default CustomerNavigation;