import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMapView = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState('en');
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const vehicleLocations = [
    {
      id: 1,
      name: language === 'ar' ? 'وسط دمشق' : 'Damascus Center',
      lat: 33.5138,
      lng: 36.2765,
      vehicles: [
        { id: 1, make: 'Toyota', model: 'Camry', status: 'available' },
        { id: 4, make: 'Mercedes', model: 'C-Class', status: 'available' }
      ]
    },
    {
      id: 2,
      name: language === 'ar' ? 'المزة' : 'Mazzeh',
      lat: 33.5020,
      lng: 36.2441,
      vehicles: [
        { id: 2, make: 'Honda', model: 'Civic', status: 'rented' }
      ]
    },
    {
      id: 3,
      name: language === 'ar' ? 'أبو رمانة' : 'Abu Rummaneh',
      lat: 33.5047,
      lng: 36.2845,
      vehicles: [
        { id: 3, make: 'BMW', model: 'X5', status: 'maintenance' }
      ]
    },
    {
      id: 4,
      name: language === 'ar' ? 'المالكي' : 'Malki',
      lat: 33.5089,
      lng: 36.2654,
      vehicles: []
    },
    {
      id: 5,
      name: language === 'ar' ? 'القصاع' : 'Qassaa',
      lat: 33.5234,
      lng: 36.2987,
      vehicles: [
        { id: 5, make: 'Hyundai', model: 'Elantra', status: 'out-of-service' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-green-600';
      case 'rented':
        return 'text-blue-600';
      case 'maintenance':
        return 'text-yellow-600';
      case 'out-of-service':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return language === 'ar' ? 'متاح' : 'Available';
      case 'rented':
        return language === 'ar' ? 'مؤجر' : 'Rented';
      case 'maintenance':
        return language === 'ar' ? 'في الصيانة' : 'Maintenance';
      case 'out-of-service':
        return language === 'ar' ? 'خارج الخدمة' : 'Out of Service';
      default:
        return status;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-card border border-border rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {language === 'ar' ? 'خريطة توزيع المركبات' : 'Vehicle Distribution Map'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Map Container */}
          <div className="flex-1 relative">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Damascus Vehicle Locations"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=33.5138,36.2765&z=12&output=embed"
              className="border-0"
            />
            
            {/* Map Overlay with Location Markers */}
            <div className="absolute inset-0 pointer-events-none">
              {vehicleLocations.map((location) => (
                <div
                  key={location.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${20 + (location.id * 15)}%`,
                    top: `${30 + (location.id * 10)}%`
                  }}
                >
                  <button
                    onClick={() => setSelectedLocation(location)}
                    className="relative bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    <Icon name="MapPin" size={16} />
                    {location.vehicles.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {location.vehicles.length}
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-border bg-surface overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-medium text-foreground mb-4">
                {language === 'ar' ? 'المواقع والمركبات' : 'Locations & Vehicles'}
              </h3>
              
              <div className="space-y-4">
                {vehicleLocations.map((location) => (
                  <div
                    key={location.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedLocation?.id === location.id
                        ? 'border-primary bg-primary/10' :'border-border bg-card hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{location.name}</h4>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Icon name="Car" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {location.vehicles.length}
                        </span>
                      </div>
                    </div>
                    
                    {location.vehicles.length > 0 ? (
                      <div className="space-y-2">
                        {location.vehicles.map((vehicle) => (
                          <div key={vehicle.id} className="flex items-center justify-between text-sm">
                            <span className="text-foreground">
                              {vehicle.make} {vehicle.model}
                            </span>
                            <span className={`font-medium ${getStatusColor(vehicle.status)}`}>
                              {getStatusText(vehicle.status)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'لا توجد مركبات في هذا الموقع' : 'No vehicles at this location'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">{selectedLocation.name}</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedLocation(null)}
                className="h-6 w-6"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'إجمالي المركبات:' : 'Total Vehicles:'}
                </span>
                <span className="ml-2 rtl:mr-2 font-medium text-foreground">
                  {selectedLocation.vehicles.length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'المتاحة:' : 'Available:'}
                </span>
                <span className="ml-2 rtl:mr-2 font-medium text-green-600">
                  {selectedLocation.vehicles.filter(v => v.status === 'available').length}
                </span>
              </div>
            </div>
            
            {selectedLocation.vehicles.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.vehicles.map((vehicle) => (
                    <span
                      key={vehicle.id}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        vehicle.status === 'available' ?'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : vehicle.status === 'rented' ?'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : vehicle.status === 'maintenance' ?'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                    >
                      {vehicle.make} {vehicle.model}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMapView;