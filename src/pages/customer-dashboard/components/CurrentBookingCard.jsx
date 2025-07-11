import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CurrentBookingCard = () => {
  const [language, setLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const currentBooking = {
    id: "BK-2025-001",
    vehicleName: language === 'ar' ? 'تويوتا كامري 2024' : 'Toyota Camry 2024',
    vehicleImage: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
    pickupDate: "2025-01-15",
    returnDate: "2025-01-18",
    pickupTime: "10:00 AM",
    returnTime: "10:00 AM",
    pickupLocation: language === 'ar' ? 'مطار دمشق الدولي' : 'Damascus International Airport',
    returnLocation: language === 'ar' ? 'مطار دمشق الدولي' : 'Damascus International Airport',
    status: "active",
    totalAmount: "450,000",
    currency: "SYP",
    daysRemaining: 3,
    coordinates: { lat: 33.4114, lng: 36.5156 }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status) => {
    if (language === 'ar') {
      switch (status) {
        case 'active': return 'نشط';
        case 'pending': return 'في الانتظار';
        case 'completed': return 'مكتمل';
        default: return 'غير معروف';
      }
    } else {
      switch (status) {
        case 'active': return 'Active';
        case 'pending': return 'Pending';
        case 'completed': return 'Completed';
        default: return 'Unknown';
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground font-heading">
          {language === 'ar' ? 'الحجز الحالي' : 'Current Booking'}
        </h2>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentBooking.status)}`}>
          {getStatusText(currentBooking.status)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
            <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src={currentBooking.vehicleImage}
                alt={currentBooking.vehicleName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {currentBooking.vehicleName}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {language === 'ar' ? 'رقم الحجز:' : 'Booking ID:'} {currentBooking.id}
              </p>
              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-muted-foreground">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Icon name="Clock" size={14} />
                  <span>{currentBooking.daysRemaining} {language === 'ar' ? 'أيام متبقية' : 'days remaining'}</span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Icon name="DollarSign" size={14} />
                  <span>{currentBooking.totalAmount} {currentBooking.currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="MapPin" size={16} className="text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {language === 'ar' ? 'الاستلام' : 'Pickup'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {formatDate(currentBooking.pickupDate)} • {currentBooking.pickupTime}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentBooking.pickupLocation}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center">
                  <Icon name="MapPin" size={16} className="text-error" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {language === 'ar' ? 'الإرجاع' : 'Return'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {formatDate(currentBooking.returnDate)} • {currentBooking.returnTime}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentBooking.returnLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-lg overflow-hidden h-48">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={currentBooking.pickupLocation}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${currentBooking.coordinates.lat},${currentBooking.coordinates.lng}&z=14&output=embed`}
              className="border-0"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          iconName="Phone" 
          iconPosition="left"
          className="flex-1"
        >
          {language === 'ar' ? 'اتصل بالدعم' : 'Contact Support'}
        </Button>
        <Button 
          variant="outline" 
          iconName="Navigation" 
          iconPosition="left"
          className="flex-1"
        >
          {language === 'ar' ? 'الاتجاهات' : 'Get Directions'}
        </Button>
        <Button 
          variant="default" 
          iconName="Eye" 
          iconPosition="left"
          className="flex-1"
        >
          {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
        </Button>
      </div>
    </div>
  );
};

export default CurrentBookingCard;