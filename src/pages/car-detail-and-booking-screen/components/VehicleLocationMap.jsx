import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VehicleLocationMap = ({ pickupLocations, selectedLocation }) => {
  const [language, setLanguage] = useState('en');
  const [activeLocation, setActiveLocation] = useState(selectedLocation || pickupLocations[0]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleLocationSelect = (location) => {
    setActiveLocation(location);
  };

  const handleGetDirections = () => {
    const { lat, lng } = activeLocation;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">
        {language === 'ar' ? 'مواقع الاستلام' : 'Pickup Locations'}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location List */}
        <div className="space-y-3">
          {pickupLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                activeLocation.id === location.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 bg-surface'
              }`}
            >
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeLocation.id === location.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name="MapPin" size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">{location.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{location.address}</p>
                  
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="Clock" size={12} />
                      <span>{location.hours}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="Phone" size={12} />
                      <span>{location.phone}</span>
                    </div>
                  </div>

                  {location.features && location.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {location.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map and Location Details */}
        <div className="space-y-4">
          {/* Google Maps Embed */}
          <div className="relative h-64 bg-surface rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={activeLocation.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${activeLocation.lat},${activeLocation.lng}&z=15&output=embed`}
              className="border-0"
            />
          </div>

          {/* Active Location Details */}
          <div className="bg-surface p-4 rounded-lg border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{activeLocation.name}</h4>
                <p className="text-sm text-muted-foreground">{activeLocation.address}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGetDirections}
                iconName="Navigation"
                iconPosition="left"
              >
                {language === 'ar' ? 'الاتجاهات' : 'Directions'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">
                    {language === 'ar' ? 'ساعات العمل' : 'Operating Hours'}
                  </p>
                  <p className="text-muted-foreground">{activeLocation.hours}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">
                    {language === 'ar' ? 'الهاتف' : 'Phone'}
                  </p>
                  <p className="text-muted-foreground">{activeLocation.phone}</p>
                </div>
              </div>

              {activeLocation.email && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="Mail" size={16} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </p>
                    <p className="text-muted-foreground">{activeLocation.email}</p>
                  </div>
                </div>
              )}

              {activeLocation.parking && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="Car" size={16} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      {language === 'ar' ? 'مواقف السيارات' : 'Parking'}
                    </p>
                    <p className="text-muted-foreground">{activeLocation.parking}</p>
                  </div>
                </div>
              )}
            </div>

            {activeLocation.description && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeLocation.description}
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${activeLocation.phone}`, '_self')}
              iconName="Phone"
              iconPosition="left"
              className="flex-1"
            >
              {language === 'ar' ? 'اتصل' : 'Call'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`mailto:${activeLocation.email}`, '_self')}
              iconName="Mail"
              iconPosition="left"
              className="flex-1"
            >
              {language === 'ar' ? 'راسل' : 'Email'}
            </Button>
          </div>
        </div>
      </div>

      {/* Location Features Legend */}
      {activeLocation.features && activeLocation.features.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="font-medium text-foreground mb-3">
            {language === 'ar' ? 'مميزات الموقع' : 'Location Features'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {activeLocation.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-surface rounded-lg">
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-success" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleLocationMap;