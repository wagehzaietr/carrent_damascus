import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BookingStats = ({ bookings }) => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');

  const stats = [
    {
      id: 'total',
      label: language === 'ar' ? 'إجمالي الحجوزات' : 'Total Bookings',
      value: bookings.length,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'active',
      label: language === 'ar' ? 'الحجوزات النشطة' : 'Active Bookings',
      value: bookings.filter(b => b.status === 'active').length,
      icon: 'Car',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'upcoming',
      label: language === 'ar' ? 'الحجوزات القادمة' : 'Upcoming Bookings',
      value: bookings.filter(b => b.status === 'upcoming').length,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'completed',
      label: language === 'ar' ? 'الحجوزات المكتملة' : 'Completed Bookings',
      value: bookings.filter(b => b.status === 'completed').length,
      icon: 'CheckCircle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10'
    }
  ];

  const totalSpent = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, booking) => sum + booking.totalCost, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className="text-right rtl:text-left">
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
      
      {/* Total Spent Card */}
      <div className="bg-card border border-border rounded-lg p-4 col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                {language === 'ar' ? 'إجمالي المبلغ المنفق' : 'Total Amount Spent'}
              </div>
              <div className="text-xl font-bold text-foreground">
                {totalSpent.toLocaleString()} {language === 'ar' ? 'ل.س' : 'SYP'}
              </div>
            </div>
          </div>
          <div className="text-right rtl:text-left">
            <div className="text-sm text-muted-foreground">
              {language === 'ar' ? 'متوسط الحجز' : 'Average per Booking'}
            </div>
            <div className="text-lg font-semibold text-foreground">
              {bookings.filter(b => b.status === 'completed').length > 0 
                ? Math.round(totalSpent / bookings.filter(b => b.status === 'completed').length).toLocaleString()
                : 0} {language === 'ar' ? 'ل.س' : 'SYP'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStats;