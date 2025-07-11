import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ cars, isVisible, onClose, language }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const isRTL = language === 'ar';

  // Mock coordinates for Damascus locations
  const locationCoordinates = {
    'damascus-center': { lat: 33.5138, lng: 36.2765 },
    'damascus-airport': { lat: 33.4114, lng: 36.5156 },
    'old-damascus': { lat: 33.5102, lng: 36.3067 },
    'mezzeh': { lat: 33.5024, lng: 36.2356 },
    'jaramana': { lat: 33.4846, lng: 36.3456 }
  };

  const getCarLocation = (car) => {
    // Assign random locations to cars for demo
    const locations = Object.keys(locationCoordinates);
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    return locationCoordinates[randomLocation];
  };

  const handleMarkerClick = (car) => {
    setSelectedCar(car);
  };

  const handleCloseInfoWindow = () => {
    setSelectedCar(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="text-lg font-semibold text-foreground">
            {language === 'ar' ? 'عرض الخريطة' : 'Map View'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm text-muted-foreground">
            {language === 'ar' ? `${cars.length} سيارة` : `${cars.length} cars`}
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 h-[calc(100vh-80px)]">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Damascus Car Locations"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=33.5138,36.2765&z=12&output=embed"
          className="w-full h-full"
        />

        {/* Map Overlay with Car Markers (Simulated) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* This would normally contain interactive markers */}
          {/* For demo purposes, we'll show a legend instead */}
        </div>

        {/* Legend */}
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-card border border-border rounded-lg shadow-lg p-4 max-w-xs`}>
          <h3 className="font-semibold text-foreground mb-3">
            {language === 'ar' ? 'مواقع السيارات' : 'Car Locations'}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-foreground">
                {language === 'ar' ? 'متاح' : 'Available'}
              </span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm text-foreground">
                {language === 'ar' ? 'غير متاح' : 'Unavailable'}
              </span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-sm text-foreground">
                {language === 'ar' ? 'محجوز' : 'Reserved'}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ?'انقر على العلامات لعرض تفاصيل السيارة' :'Click on markers to view car details'
              }
            </p>
          </div>
        </div>

        {/* Car Info Window (Simulated) */}
        {selectedCar && (
          <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{selectedCar.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedCar.category}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseInfoWindow}
                className="h-6 w-6"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'السعر اليومي:' : 'Daily Rate:'}
                </span>
                <span className="font-semibold text-primary">
                  {selectedCar.dailyRate.toLocaleString()} {language === 'ar' ? 'ل.س' : 'SYP'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'الحالة:' : 'Status:'}
                </span>
                <span className={`text-sm font-medium ${selectedCar.isAvailable ? 'text-success' : 'text-error'}`}>
                  {selectedCar.isAvailable 
                    ? (language === 'ar' ? 'متاح' : 'Available')
                    : (language === 'ar' ? 'غير متاح' : 'Unavailable')
                  }
                </span>
              </div>
            </div>

            <Button
              size="sm"
              fullWidth
              disabled={!selectedCar.isAvailable}
            >
              {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
            </Button>
          </div>
        )}

        {/* Map Controls */}
        <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} flex flex-col space-y-2`}>
          <Button
            variant="outline"
            size="icon"
            className="bg-background shadow-md"
            title={language === 'ar' ? 'تكبير' : 'Zoom In'}
          >
            <Icon name="Plus" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-background shadow-md"
            title={language === 'ar' ? 'تصغير' : 'Zoom Out'}
          >
            <Icon name="Minus" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-background shadow-md"
            title={language === 'ar' ? 'موقعي' : 'My Location'}
          >
            <Icon name="MapPin" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapView;