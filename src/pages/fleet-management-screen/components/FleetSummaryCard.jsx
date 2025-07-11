import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FleetSummaryCard = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const summaryData = [
    {
      id: 1,
      title: language === 'ar' ? 'إجمالي المركبات' : 'Total Vehicles',
      value: 45,
      icon: 'Car',
      color: 'bg-blue-500',
      change: '+3',
      changeType: 'positive'
    },
    {
      id: 2,
      title: language === 'ar' ? 'متاحة للإيجار' : 'Available',
      value: 28,
      icon: 'CheckCircle',
      color: 'bg-green-500',
      change: '+5',
      changeType: 'positive'
    },
    {
      id: 3,
      title: language === 'ar' ? 'مؤجرة حالياً' : 'Currently Rented',
      value: 12,
      icon: 'Clock',
      color: 'bg-amber-500',
      change: '-2',
      changeType: 'negative'
    },
    {
      id: 4,
      title: language === 'ar' ? 'في الصيانة' : 'In Maintenance',
      value: 5,
      icon: 'Wrench',
      color: 'bg-red-500',
      change: '+1',
      changeType: 'neutral'
    }
  ];

  const utilizationRate = Math.round((12 / 45) * 100);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {item.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${
                    item.changeType === 'positive' ? 'text-green-600' :
                    item.changeType === 'negative'? 'text-red-600' : 'text-muted-foreground'
                  }`}>
                    {item.change} {language === 'ar' ? 'هذا الشهر' : 'this month'}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                <Icon name={item.icon} size={24} color="white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Utilization Rate */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {language === 'ar' ? 'معدل الاستخدام' : 'Fleet Utilization'}
          </h3>
          <span className="text-2xl font-bold text-primary">{utilizationRate}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${utilizationRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {language === 'ar' ? 
            `${12} مركبة من أصل ${45} مؤجرة حالياً` :
            `${12} out of ${45} vehicles currently rented`
          }
        </p>
      </div>

      {/* Maintenance Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {language === 'ar' ? 'تنبيهات الصيانة' : 'Maintenance Alerts'}
          </h3>
          <Icon name="AlertTriangle" size={20} className="text-warning" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm font-medium text-foreground">
                {language === 'ar' ? 'صيانة مستحقة' : 'Overdue Maintenance'}
              </span>
            </div>
            <span className="text-sm font-bold text-warning">3</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-foreground">
                {language === 'ar' ? 'صيانة مجدولة' : 'Scheduled This Week'}
              </span>
            </div>
            <span className="text-sm font-bold text-amber-600">7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetSummaryCard;