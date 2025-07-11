import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VehicleSpecifications = ({ specifications }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const specItems = [
    {
      icon: 'Car',
      label: language === 'ar' ? 'الماركة والموديل' : 'Make & Model',
      value: specifications.makeModel
    },
    {
      icon: 'Calendar',
      label: language === 'ar' ? 'سنة الصنع' : 'Year',
      value: specifications.year
    },
    {
      icon: 'Settings',
      label: language === 'ar' ? 'ناقل الحركة' : 'Transmission',
      value: specifications.transmission
    },
    {
      icon: 'Fuel',
      label: language === 'ar' ? 'نوع الوقود' : 'Fuel Type',
      value: specifications.fuelType
    },
    {
      icon: 'Users',
      label: language === 'ar' ? 'عدد المقاعد' : 'Seating',
      value: `${specifications.seating} ${language === 'ar' ? 'مقاعد' : 'seats'}`
    },
    {
      icon: 'Gauge',
      label: language === 'ar' ? 'استهلاك الوقود' : 'Fuel Economy',
      value: specifications.fuelEconomy
    }
  ];

  const features = [
    {
      icon: 'Snowflake',
      label: language === 'ar' ? 'تكييف الهواء' : 'Air Conditioning',
      available: specifications.features.airConditioning
    },
    {
      icon: 'Radio',
      label: language === 'ar' ? 'بلوتوث/راديو' : 'Bluetooth/Radio',
      available: specifications.features.bluetooth
    },
    {
      icon: 'Navigation',
      label: language === 'ar' ? 'نظام الملاحة' : 'GPS Navigation',
      available: specifications.features.gps
    },
    {
      icon: 'Shield',
      label: language === 'ar' ? 'وسائد هوائية' : 'Airbags',
      available: specifications.features.airbags
    },
    {
      icon: 'Lock',
      label: language === 'ar' ? 'قفل مركزي' : 'Central Locking',
      available: specifications.features.centralLocking
    },
    {
      icon: 'Camera',
      label: language === 'ar' ? 'كاميرا خلفية' : 'Backup Camera',
      available: specifications.features.backupCamera
    }
  ];

  return (
    <div className="space-y-6">
      {/* Vehicle Specifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">
          {language === 'ar' ? 'مواصفات المركبة' : 'Vehicle Specifications'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-surface rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium text-foreground truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features & Amenities */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">
          {language === 'ar' ? 'المميزات والتجهيزات' : 'Features & Amenities'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className={`flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg transition-all duration-200 ${
              feature.available 
                ? 'bg-success/10 border border-success/20' :'bg-muted/50 border border-border'
            }`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                feature.available 
                  ? 'bg-success/20 text-success' :'bg-muted text-muted-foreground'
              }`}>
                <Icon name={feature.available ? 'Check' : 'X'} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${
                  feature.available 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }`}>
                  {feature.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">
          {language === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
        </h3>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              {language === 'ar' ?'جميع المركبات تخضع لفحص دوري وصيانة منتظمة لضمان السلامة والأداء الأمثل' :'All vehicles undergo regular inspection and maintenance to ensure safety and optimal performance'
              }
            </p>
          </div>
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <Icon name="Shield" size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              {language === 'ar' ?'تأمين شامل متوفر لجميع المركبات مع تغطية الأضرار والحوادث' :'Comprehensive insurance available for all vehicles with damage and accident coverage'
              }
            </p>
          </div>
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <Icon name="Clock" size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              {language === 'ar' ?'خدمة الدعم الفني متاحة على مدار الساعة طوال أيام الأسبوع' :'24/7 technical support service available throughout the week'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecifications;