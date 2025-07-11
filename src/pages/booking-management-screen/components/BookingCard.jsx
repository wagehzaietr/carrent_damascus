import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onExtend, onModify, onCancel, onContactSupport, onViewDirections }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [language] = useState(() => localStorage.getItem('language') || 'en');

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-warning text-warning-foreground';
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      case 'cancelled': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    if (language === 'ar') {
      switch (status) {
        case 'upcoming': return 'قادم';
        case 'active': return 'نشط';
        case 'completed': return 'مكتمل';
        case 'cancelled': return 'ملغي';
        default: return 'غير معروف';
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === 'ar' ? date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      {/* Card Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse flex-1">
            <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
              <Image
                src={booking.vehicle.image}
                alt={booking.vehicle.model}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {booking.vehicle.model}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'رقم الحجز:' : 'Booking ID:'} {booking.id}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {language === 'ar' ? 'من:' : 'From:'}
              </span>
              <span className="text-foreground font-medium">
                {formatDate(booking.startDate)}
              </span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {language === 'ar' ? 'إلى:' : 'To:'}
              </span>
              <span className="text-foreground font-medium">
                {formatDate(booking.endDate)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {language === 'ar' ? 'الاستلام:' : 'Pickup:'}
              </span>
              <span className="text-foreground font-medium truncate">
                {booking.pickupLocation}
              </span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
              <Icon name="DollarSign" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {language === 'ar' ? 'المجموع:' : 'Total:'}
              </span>
              <span className="text-foreground font-semibold">
                {booking.totalCost} {language === 'ar' ? 'ل.س' : 'SYP'}
              </span>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-border pt-4 mt-4 space-y-4 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {language === 'ar' ? 'تفاصيل المركبة' : 'Vehicle Details'}
                </h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">{language === 'ar' ? 'النوع:' : 'Type:'}</span> {booking.vehicle.type}</p>
                  <p><span className="text-muted-foreground">{language === 'ar' ? 'الوقود:' : 'Fuel:'}</span> {booking.vehicle.fuel}</p>
                  <p><span className="text-muted-foreground">{language === 'ar' ? 'المقاعد:' : 'Seats:'}</span> {booking.vehicle.seats}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {language === 'ar' ? 'الخدمات المضافة' : 'Additional Services'}
                </h4>
                <div className="space-y-1 text-sm">
                  {booking.services.map((service, index) => (
                    <p key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{service}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">
                {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><span className="text-muted-foreground">{language === 'ar' ? 'الهاتف:' : 'Phone:'}</span> {booking.contactPhone}</p>
                <p><span className="text-muted-foreground">{language === 'ar' ? 'البريد:' : 'Email:'}</span> {booking.contactEmail}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {booking.status === 'active' && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={() => onExtend(booking.id)}
                iconName="Clock"
                iconPosition="left"
              >
                {language === 'ar' ? 'تمديد الإيجار' : 'Extend Rental'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onContactSupport(booking.id)}
                iconName="MessageCircle"
                iconPosition="left"
              >
                {language === 'ar' ? 'اتصل بالدعم' : 'Contact Support'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDirections(booking.id)}
                iconName="Navigation"
                iconPosition="left"
              >
                {language === 'ar' ? 'عرض الاتجاهات' : 'View Directions'}
              </Button>
            </>
          )}
          
          {booking.status === 'upcoming' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onModify(booking.id)}
                iconName="Edit"
                iconPosition="left"
              >
                {language === 'ar' ? 'تعديل الحجز' : 'Modify Booking'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(booking.id)}
                iconName="X"
                iconPosition="left"
              >
                {language === 'ar' ? 'إلغاء الحجز' : 'Cancel Booking'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;