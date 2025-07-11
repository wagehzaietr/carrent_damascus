import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SummaryStatistics = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const statistics = [
    {
      id: 1,
      title: language === 'ar' ? 'إجمالي الإيجارات' : 'Total Rentals',
      value: '24',
      change: '+3',
      changeType: 'increase',
      icon: 'Car',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      description: language === 'ar' ? 'هذا العام' : 'This year'
    },
    {
      id: 2,
      title: language === 'ar' ? 'السيارات المفضلة' : 'Favorite Vehicles',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: 'Heart',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      description: language === 'ar' ? 'في قائمة الرغبات' : 'In wishlist'
    },
    {
      id: 3,
      title: language === 'ar' ? 'نقاط الولاء' : 'Loyalty Points',
      value: '1,250',
      change: '+150',
      changeType: 'increase',
      icon: 'Star',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      description: language === 'ar' ? 'نقطة متاحة' : 'Points available'
    },
    {
      id: 4,
      title: language === 'ar' ? 'المبلغ المدخر' : 'Money Saved',
      value: '125,000',
      change: '+25,000',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      description: language === 'ar' ? 'ل.س من الخصومات' : 'SYP from discounts'
    }
  ];

  const formatNumber = (num) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SY' : 'en-US').format(num);
  };

  const isRTL = language === 'ar';

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 font-heading">
        {language === 'ar' ? 'إحصائيات الحساب' : 'Account Statistics'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat) => (
          <div
            key={stat.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={stat.color} />
              </div>
              
              <div className={`flex items-center space-x-1 rtl:space-x-reverse text-xs font-medium ${
                stat.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                />
                <span>{stat.change}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-foreground font-heading">
                {formatNumber(stat.value)}
              </h3>
              
              <p className="text-sm font-medium text-foreground">
                {stat.title}
              </p>
              
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>

            {/* Progress indicator for some stats */}
            {stat.id === 3 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{language === 'ar' ? 'حتى المستوى التالي' : 'To next level'}</span>
                  <span>750 {language === 'ar' ? 'نقطة' : 'pts'}</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional insights */}
      <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Icon name="Info" size={16} className="text-accent" />
          <p className="text-sm text-accent font-medium">
            {language === 'ar' ?'أنت في المرتبة الذهبية! احجز 6 إيجارات أخرى للوصول إلى مرتبة البلاتين.' : "You're in Gold tier! Book 6 more rentals to reach Platinum status."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatistics;