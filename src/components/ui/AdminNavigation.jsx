import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const navigationItems = [
    {
      path: '/fleet-management-screen',
      icon: 'Truck',
      label: language === 'ar' ? 'إدارة الأسطول' : 'Fleet Management',
      badge: null,
      description: language === 'ar' ? 'إدارة المركبات والصيانة' : 'Manage vehicles and maintenance'
    },
    {
      path: '/booking-administration-screen',
      icon: 'ClipboardList',
      label: language === 'ar' ? 'إدارة الحجوزات' : 'Booking Administration',
      badge: 5,
      description: language === 'ar' ? 'معالجة الحجوزات وخدمة العملاء' : 'Process bookings and customer service'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isRTL = language === 'ar';

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block fixed top-16 ${isRTL ? 'right-0' : 'left-0'} bottom-0 z-[800] bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-foreground font-heading">
                {language === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`relative w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <div className="relative flex-shrink-0">
                  <Icon name={item.icon} size={20} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.label}</div>
                    <div className={`text-xs truncate mt-0.5 ${
                      isActive(item.path) 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground group-hover:text-accent-foreground/80'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className={`absolute ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} top-1/2 transform -translate-y-1/2 bg-popover text-popover-foreground px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-md`}>
                    {item.label}
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed && (
              <div className="text-xs text-muted-foreground">
                {language === 'ar' ? 'كار رنت دمشق - لوحة الإدارة' : 'CarRent Damascus - Admin'}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="fixed top-20 left-4 z-[950] bg-background border border-border shadow-md"
        >
          <Icon name="Menu" size={20} />
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[950] lg:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
            
            <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} bottom-0 w-80 max-w-[85vw] bg-card border-r border-border shadow-xl animate-slide-${isRTL ? 'right' : 'left'}`}>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground font-heading">
                    {language === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMobileMenu}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                {/* Mobile Navigation Items */}
                <nav className="flex-1 p-4 space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`relative w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <Icon name={item.icon} size={20} />
                        {item.badge && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 text-left rtl:text-right">
                        <div className="font-medium truncate">{item.label}</div>
                        <div className={`text-xs truncate mt-0.5 ${
                          isActive(item.path) 
                            ? 'text-primary-foreground/80' 
                            : 'text-muted-foreground'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'كار رنت دمشق - لوحة الإدارة' : 'CarRent Damascus - Admin'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminNavigation;