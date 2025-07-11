import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingTimeline = ({ booking, onClose }) => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');

  const timelineEvents = [
    {
      id: 1,
      type: 'confirmation',
      title: language === 'ar' ? 'تأكيد الحجز' : 'Booking Confirmed',
      description: language === 'ar' ? 'تم تأكيد حجزك بنجاح' : 'Your booking has been confirmed successfully',
      timestamp: '2025-01-08T10:30:00Z',
      status: 'completed',
      icon: 'CheckCircle'
    },
    {
      id: 2,
      type: 'payment',
      title: language === 'ar' ? 'الدفع المكتمل' : 'Payment Completed',
      description: language === 'ar' ? 'تم استلام الدفعة بنجاح' : 'Payment received successfully',
      timestamp: '2025-01-08T10:35:00Z',
      status: 'completed',
      icon: 'CreditCard'
    },
    {
      id: 3,
      type: 'preparation',
      title: language === 'ar' ? 'تحضير المركبة' : 'Vehicle Preparation',
      description: language === 'ar' ? 'جاري تحضير المركبة للاستلام' : 'Vehicle is being prepared for pickup',
      timestamp: '2025-01-10T08:00:00Z',
      status: 'in-progress',
      icon: 'Settings'
    },
    {
      id: 4,
      type: 'pickup',
      title: language === 'ar' ? 'جاهز للاستلام' : 'Ready for Pickup',
      description: language === 'ar' ? 'المركبة جاهزة للاستلام من الموقع' : 'Vehicle is ready for pickup at location',
      timestamp: '2025-01-11T09:00:00Z',
      status: 'upcoming',
      icon: 'Car'
    },
    {
      id: 5,
      type: 'return',
      title: language === 'ar' ? 'إرجاع المركبة' : 'Vehicle Return',
      description: language === 'ar' ? 'موعد إرجاع المركبة' : 'Scheduled vehicle return',
      timestamp: '2025-01-15T18:00:00Z',
      status: 'upcoming',
      icon: 'RotateCcw'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'upcoming': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-warning';
      case 'upcoming': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return language === 'ar' ? date.toLocaleString('ar-EG', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : date.toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
  };

  const isRTL = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {language === 'ar' ? 'تتبع الحجز' : 'Booking Timeline'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'ar' ? 'رقم الحجز:' : 'Booking ID:'} {booking.id}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Timeline Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute top-0 bottom-0 w-0.5 bg-border ${isRTL ? 'right-6' : 'left-6'}`}></div>

            {/* Timeline Events */}
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className={`relative flex items-start space-x-4 rtl:space-x-reverse ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-background ${getStatusBgColor(event.status)}`}>
                    <Icon 
                      name={event.icon} 
                      size={20} 
                      className="text-white"
                    />
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 min-w-0 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-medium ${getStatusColor(event.status)}`}>
                        {event.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(event.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    
                    {/* Status Badge */}
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'completed' 
                          ? 'bg-success/10 text-success'
                          : event.status === 'in-progress' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
                      }`}>
                        {event.status === 'completed' && language === 'ar' ? 'مكتمل' : 
                         event.status === 'completed' ? 'Completed' :
                         event.status === 'in-progress' && language === 'ar' ? 'قيد التنفيذ' :
                         event.status === 'in-progress' ? 'In Progress' :
                         language === 'ar' ? 'قادم' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface">
          <div className="text-sm text-muted-foreground">
            {language === 'ar' ? 'آخر تحديث: منذ 5 دقائق' : 'Last updated: 5 minutes ago'}
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              iconName="Bell"
              iconPosition="left"
            >
              {language === 'ar' ? 'إعدادات التنبيهات' : 'Notification Settings'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
            >
              {language === 'ar' ? 'إضافة للتقويم' : 'Add to Calendar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTimeline;