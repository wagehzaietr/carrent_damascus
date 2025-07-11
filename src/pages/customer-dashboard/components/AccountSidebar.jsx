import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AccountSidebar = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const userProfile = {
    name: language === 'ar' ? 'وجيه زعيتر' : 'wageh zaiter',
    email: 'ahmed@example.com',
    phone: '+963 11 123 4567',
    memberSince: '2023-03-15',
    tier: language === 'ar' ? 'ذهبي' : 'Gold',
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150",
    completionPercentage: 85
  };

  const quickLinks = [
    {
      id: 1,
      title: language === 'ar' ? 'الملف الشخصي' : 'Profile Settings',
      icon: 'User',
      badge: null
    },
    {
      id: 2,
      title: language === 'ar' ? 'طرق الدفع' : 'Payment Methods',
      icon: 'CreditCard',
      badge: '2'
    },
    {
      id: 3,
      title: language === 'ar' ? 'الإشعارات' : 'Notifications',
      icon: 'Bell',
      badge: '3'
    },
    {
      id: 4,
      title: language === 'ar' ? 'المساعدة' : 'Help & Support',
      icon: 'HelpCircle',
      badge: null
    }
  ];

  const formatMemberSince = () => {
    const date = new Date(userProfile.memberSince);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
            <Icon name="Check" size={12} color="white" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-1 font-heading">
          {userProfile.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-2">
          {userProfile.email}
        </p>
        
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-medium rounded-full">
            {userProfile.tier}
          </span>
          <span className="text-xs text-muted-foreground">
            {language === 'ar' ? 'عضو منذ' : 'Member since'} {formatMemberSince()}
          </span>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="mb-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {language === 'ar' ? 'اكتمال الملف الشخصي' : 'Profile Completion'}
          </span>
          <span className="text-sm font-semibold text-primary">
            {userProfile.completionPercentage}%
          </span>
        </div>
        
        <div className="w-full bg-border rounded-full h-2 mb-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${userProfile.completionPercentage}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {language === 'ar' ?'أكمل ملفك الشخصي للحصول على خصومات إضافية' :'Complete your profile for additional discounts'
          }
        </p>
      </div>

      {/* Quick Links */}
      <div className="space-y-2 mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
        </h4>
        
        {quickLinks.map((link) => (
          <button
            key={link.id}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-left rtl:text-right"
          >
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Icon name={link.icon} size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium">{link.title}</span>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {link.badge && (
                <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {link.badge}
                </span>
              )}
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      {/* Contact Support */}
      <div className="border-t border-border pt-4">
        <Button
          variant="outline"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
          size="sm"
        >
          {language === 'ar' ? 'تواصل معنا' : 'Contact Support'}
        </Button>
      </div>

      {/* Loyalty Program Info */}
      <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
          <Icon name="Crown" size={16} className="text-amber-600" />
          <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
            {language === 'ar' ? 'برنامج الولاء' : 'Loyalty Program'}
          </span>
        </div>
        
        <p className="text-xs text-amber-700 dark:text-amber-300">
          {language === 'ar' ?'1,250 نقطة • 750 نقطة للمستوى التالي' :'1,250 points • 750 points to next level'
          }
        </p>
      </div>
    </div>
  );
};

export default AccountSidebar;