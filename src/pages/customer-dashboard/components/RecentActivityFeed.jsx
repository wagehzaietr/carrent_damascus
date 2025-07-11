import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const activities = [
    {
      id: 1,
      type: 'booking_confirmed',
      title: language === 'ar' ? 'تم تأكيد الحجز' : 'Booking Confirmed',
      description: language === 'ar' ? 'تم تأكيد حجز تويوتا كامري 2024 بنجاح' : 'Toyota Camry 2024 booking confirmed successfully',
      timestamp: '2025-01-11T10:30:00Z',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 2,
      type: 'payment_received',
      title: language === 'ar' ? 'تم استلام الدفع' : 'Payment Received',
      description: language === 'ar' ? 'تم استلام دفعة بقيمة 450,000 ل.س بنجاح' : 'Payment of 450,000 SYP received successfully',
      timestamp: '2025-01-11T09:15:00Z',
      icon: 'CreditCard',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 3,
      type: 'reminder',
      title: language === 'ar' ? 'تذكير الاستلام' : 'Pickup Reminder',
      description: language === 'ar' ? 'تذكير: موعد استلام السيارة غداً في الساعة 10:00 ص' : 'Reminder: Vehicle pickup tomorrow at 10:00 AM',
      timestamp: '2025-01-10T18:00:00Z',
      icon: 'Bell',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 4,
      type: 'profile_updated',
      title: language === 'ar' ? 'تم تحديث الملف الشخصي' : 'Profile Updated',
      description: language === 'ar' ? 'تم تحديث معلومات الملف الشخصي بنجاح' : 'Profile information updated successfully',
      timestamp: '2025-01-09T14:20:00Z',
      icon: 'User',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 5,
      type: 'special_offer',
      title: language === 'ar' ? 'عرض خاص' : 'Special Offer',
      description: language === 'ar' ? 'خصم 15% على الحجز التالي - صالح حتى نهاية الشهر' : '15% discount on next booking - Valid until end of month',
      timestamp: '2025-01-08T12:00:00Z',
      icon: 'Gift',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return language === 'ar' ? 'منذ قليل' : 'Just now';
    } else if (diffInHours < 24) {
      return language === 'ar' ? `منذ ${diffInHours} ساعة` : `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return language === 'ar' ? `منذ ${diffInDays} يوم` : `${diffInDays}d ago`;
    }
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground font-heading">
          {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          {language === 'ar' ? 'عرض الكل' : 'View All'}
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity.icon} size={18} className={activity.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </h3>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2 rtl:ml-0 rtl:mr-2">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          {language === 'ar' ? 'تحميل المزيد من الأنشطة' : 'Load More Activities'}
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;