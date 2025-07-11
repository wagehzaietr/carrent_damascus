import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CarCard = ({ car, language }) => {
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const handleQuickView = (e) => {
    e.stopPropagation();
    // Quick view modal functionality would be implemented here
    console.log('Quick view for car:', car.id);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate('/car-detail-and-booking-screen', { state: { carId: car.id } });
  };

  const handleCardClick = () => {
    navigate('/car-detail-and-booking-screen', { state: { carId: car.id } });
  };

  const getTransmissionLabel = (transmission) => {
    const labels = {
      'automatic': language === 'ar' ? 'أوتوماتيك' : 'Automatic',
      'manual': language === 'ar' ? 'يدوي' : 'Manual'
    };
    return labels[transmission] || transmission;
  };

  const getFuelTypeLabel = (fuelType) => {
    const labels = {
      'petrol': language === 'ar' ? 'بنزين' : 'Petrol',
      'diesel': language === 'ar' ? 'ديزل' : 'Diesel',
      'hybrid': language === 'ar' ? 'هجين' : 'Hybrid'
    };
    return labels[fuelType] || fuelType;
  };

  const getAvailabilityStatus = () => {
    if (car.isAvailable) {
      return {
        text: language === 'ar' ? 'متاح' : 'Available',
        className: 'bg-success text-success-foreground'
      };
    } else {
      return {
        text: language === 'ar' ? 'غير متاح' : 'Unavailable',
        className: 'bg-error text-error-foreground'
      };
    }
  };

  const status = getAvailabilityStatus();

  return (
    <div 
      onClick={handleCardClick}
      className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Availability Badge */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
          {status.text}
        </div>

        {/* Quick View Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleQuickView}
          className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-background/80 hover:bg-background backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        >
          <Icon name="Eye" size={16} />
        </Button>

        {/* Rating */}
        {car.rating && (
          <div className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'} flex items-center space-x-1 rtl:space-x-reverse bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full`}>
            <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-foreground">{car.rating}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Car Name and Category */}
        <div className="mb-3">
          <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
            {car.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {car.category}
          </p>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {car.seats} {language === 'ar' ? 'مقاعد' : 'seats'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="Settings" size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {getTransmissionLabel(car.transmission)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="Fuel" size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {getFuelTypeLabel(car.fuelType)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="Gauge" size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {car.mileage} {language === 'ar' ? 'كم/ل' : 'km/l'}
            </span>
          </div>
        </div>

        {/* Features */}
        {car.features && car.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {car.features.slice(0, 3).map((feature, index) => {
                const featureLabels = {
                  'ac': language === 'ar' ? 'تكييف' : 'A/C',
                  'gps': language === 'ar' ? 'ملاحة' : 'GPS',
                  'bluetooth': language === 'ar' ? 'بلوتوث' : 'Bluetooth',
                  'childSeat': language === 'ar' ? 'مقعد أطفال' : 'Child Seat',
                  'insurance': language === 'ar' ? 'تأمين' : 'Insurance',
                  'wifi': language === 'ar' ? 'واي فاي' : 'WiFi'
                };
                
                return (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full"
                  >
                    {featureLabels[feature] || feature}
                  </span>
                );
              })}
              {car.features.length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  +{car.features.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1 rtl:space-x-reverse">
              <span className="text-2xl font-bold text-primary">
                {car.dailyRate.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                {language === 'ar' ? 'ل.س/يوم' : 'SYP/day'}
              </span>
            </div>
            {car.originalPrice && car.originalPrice > car.dailyRate && (
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="text-sm text-muted-foreground line-through">
                  {car.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs bg-error text-error-foreground px-1 py-0.5 rounded">
                  -{Math.round(((car.originalPrice - car.dailyRate) / car.originalPrice) * 100)}%
                </span>
              </div>
            )}
          </div>
          
          <Button
            onClick={handleBookNow}
            disabled={!car.isAvailable}
            size="sm"
            className="min-w-[80px]"
          >
            {language === 'ar' ? 'احجز الآن' : 'Book Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;