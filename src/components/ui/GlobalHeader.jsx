import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.setAttribute('dir', newLanguage === 'ar' ? 'rtl' : 'ltr');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality implementation
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // Logout functionality implementation
    setIsUserMenuOpen(false);
  };

  const isRTL = language === 'ar';

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Car" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground font-heading">
                {language === 'ar' ? 'كار رنت دمشق' : 'CarRent Damascus'}
              </span>
            </div>
          </div>
        </div>

        {/* Search Section - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <div className={`relative transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-primary' : ''} rounded-lg`}>
              <Icon 
                name="Search" 
                size={18} 
                className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`}
              />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث عن السيارات...' : 'Search cars...'}
                className={`w-full h-10 bg-surface border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {}}
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="hidden sm:flex items-center space-x-1 rtl:space-x-reverse"
          >
            <Icon name="Globe" size={16} />
            <span className="text-sm font-medium">
              {language === 'ar' ? 'EN' : 'عر'}
            </span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-foreground">
                {language === 'ar' ?'وجيه زعيتر' : 'wageh zaiter'}
              </span>
              <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </Button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className={`absolute top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 animate-slide-down ${isRTL ? 'left-0' : 'right-0'}`}>
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">
                      {language === 'ar' ? 'وجيه زعيتر' : 'wageh zaiter'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      wageh@example.com
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <button className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200">
                      <Icon name="User" size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                    </button>
                    
                    <button className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200">
                      <Icon name="Settings" size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {language === 'ar' ? 'الإعدادات' : 'Settings'}
                    </button>
                    
                    <button className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200">
                      <Icon name="HelpCircle" size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {language === 'ar' ? 'المساعدة' : 'Help'}
                    </button>
                  </div>
                  
                  <div className="border-t border-border pt-1">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-error hover:bg-error hover:text-error-foreground rounded-md transition-colors duration-200"
                    >
                      <Icon name="LogOut" size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Language Toggle */}
      <div className="sm:hidden px-4 pb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="flex items-center space-x-1 rtl:space-x-reverse"
        >
          <Icon name="Globe" size={16} />
          <span className="text-sm font-medium">
            {language === 'ar' ? 'English' : 'العربية'}
          </span>
        </Button>
      </div>
    </header>
  );
};

export default GlobalHeader;