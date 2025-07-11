import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ filters, onRemoveFilter, language }) => {
  const isRTL = language === 'ar';

  const getFilterChips = () => {
    const chips = [];

    // Location chip
    if (filters.location) {
      const locationLabels = {
        'damascus-center': language === 'ar' ? 'وسط دمشق' : 'Damascus Center',
        'damascus-airport': language === 'ar' ? 'مطار دمشق' : 'Damascus Airport',
        'old-damascus': language === 'ar' ? 'دمشق القديمة' : 'Old Damascus',
        'mezzeh': language === 'ar' ? 'المزة' : 'Mezzeh',
        'jaramana': language === 'ar' ? 'جرمانا' : 'Jaramana'
      };
      chips.push({
        key: 'location',
        label: locationLabels[filters.location] || filters.location,
        value: filters.location
      });
    }

    // Date range chip
    if (filters.pickupDate && filters.returnDate) {
      const pickupDate = new Date(filters.pickupDate).toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US');
      const returnDate = new Date(filters.returnDate).toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US');
      chips.push({
        key: 'dateRange',
        label: `${pickupDate} - ${returnDate}`,
        value: 'dateRange'
      });
    } else if (filters.pickupDate) {
      const pickupDate = new Date(filters.pickupDate).toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US');
      chips.push({
        key: 'pickupDate',
        label: `${language === 'ar' ? 'من' : 'From'} ${pickupDate}`,
        value: 'pickupDate'
      });
    } else if (filters.returnDate) {
      const returnDate = new Date(filters.returnDate).toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US');
      chips.push({
        key: 'returnDate',
        label: `${language === 'ar' ? 'حتى' : 'Until'} ${returnDate}`,
        value: 'returnDate'
      });
    }

    // Vehicle types chips
    if (filters.vehicleTypes?.length > 0) {
      const vehicleLabels = {
        'economy': language === 'ar' ? 'اقتصادية' : 'Economy',
        'compact': language === 'ar' ? 'مدمجة' : 'Compact',
        'midsize': language === 'ar' ? 'متوسطة' : 'Midsize',
        'fullsize': language === 'ar' ? 'كبيرة' : 'Full Size',
        'luxury': language === 'ar' ? 'فاخرة' : 'Luxury',
        'suv': language === 'ar' ? 'دفع رباعي' : 'SUV'
      };
      
      if (filters.vehicleTypes.length === 1) {
        chips.push({
          key: 'vehicleTypes',
          label: vehicleLabels[filters.vehicleTypes[0]],
          value: filters.vehicleTypes[0],
          arrayKey: 'vehicleTypes'
        });
      } else {
        chips.push({
          key: 'vehicleTypes',
          label: `${language === 'ar' ? 'أنواع المركبات' : 'Vehicle Types'} (${filters.vehicleTypes.length})`,
          value: 'vehicleTypes',
          count: filters.vehicleTypes.length
        });
      }
    }

    // Price range chip
    if (filters.minPrice || filters.maxPrice) {
      let priceLabel = '';
      if (filters.minPrice && filters.maxPrice) {
        priceLabel = `${filters.minPrice} - ${filters.maxPrice} ${language === 'ar' ? 'ل.س' : 'SYP'}`;
      } else if (filters.minPrice) {
        priceLabel = `${language === 'ar' ? 'من' : 'From'} ${filters.minPrice} ${language === 'ar' ? 'ل.س' : 'SYP'}`;
      } else {
        priceLabel = `${language === 'ar' ? 'حتى' : 'Up to'} ${filters.maxPrice} ${language === 'ar' ? 'ل.س' : 'SYP'}`;
      }
      chips.push({
        key: 'priceRange',
        label: priceLabel,
        value: 'priceRange'
      });
    }

    // Transmission chips
    if (filters.transmission?.length > 0) {
      const transmissionLabels = {
        'automatic': language === 'ar' ? 'أوتوماتيك' : 'Automatic',
        'manual': language === 'ar' ? 'يدوي' : 'Manual'
      };
      
      if (filters.transmission.length === 1) {
        chips.push({
          key: 'transmission',
          label: transmissionLabels[filters.transmission[0]],
          value: filters.transmission[0],
          arrayKey: 'transmission'
        });
      } else {
        chips.push({
          key: 'transmission',
          label: `${language === 'ar' ? 'ناقل الحركة' : 'Transmission'} (${filters.transmission.length})`,
          value: 'transmission',
          count: filters.transmission.length
        });
      }
    }

    // Fuel type chips
    if (filters.fuelType?.length > 0) {
      const fuelLabels = {
        'petrol': language === 'ar' ? 'بنزين' : 'Petrol',
        'diesel': language === 'ar' ? 'ديزل' : 'Diesel',
        'hybrid': language === 'ar' ? 'هجين' : 'Hybrid'
      };
      
      if (filters.fuelType.length === 1) {
        chips.push({
          key: 'fuelType',
          label: fuelLabels[filters.fuelType[0]],
          value: filters.fuelType[0],
          arrayKey: 'fuelType'
        });
      } else {
        chips.push({
          key: 'fuelType',
          label: `${language === 'ar' ? 'نوع الوقود' : 'Fuel Type'} (${filters.fuelType.length})`,
          value: 'fuelType',
          count: filters.fuelType.length
        });
      }
    }

    // Features chips
    if (filters.features?.length > 0) {
      const featureLabels = {
        'ac': language === 'ar' ? 'تكييف' : 'A/C',
        'gps': language === 'ar' ? 'ملاحة' : 'GPS',
        'bluetooth': language === 'ar' ? 'بلوتوث' : 'Bluetooth',
        'childSeat': language === 'ar' ? 'مقعد أطفال' : 'Child Seat',
        'insurance': language === 'ar' ? 'تأمين' : 'Insurance',
        'wifi': language === 'ar' ? 'واي فاي' : 'WiFi'
      };
      
      if (filters.features.length <= 2) {
        filters.features.forEach(feature => {
          chips.push({
            key: `feature-${feature}`,
            label: featureLabels[feature],
            value: feature,
            arrayKey: 'features'
          });
        });
      } else {
        chips.push({
          key: 'features',
          label: `${language === 'ar' ? 'المميزات' : 'Features'} (${filters.features.length})`,
          value: 'features',
          count: filters.features.length
        });
      }
    }

    return chips;
  };

  const handleRemoveChip = (chip) => {
    if (chip.arrayKey && chip.value !== chip.key) {
      // Remove single item from array
      onRemoveFilter(chip.arrayKey, chip.value);
    } else {
      // Remove entire filter
      onRemoveFilter(chip.key);
    }
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-surface border-b border-border">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className="text-sm font-medium text-muted-foreground">
          {language === 'ar' ? 'المرشحات النشطة:' : 'Active Filters:'}
        </span>
        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
          {chips.length}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <div
            key={chip.key}
            className="flex items-center space-x-1 rtl:space-x-reverse bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm"
          >
            <span className="truncate max-w-32">{chip.label}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveChip(chip)}
              className="h-4 w-4 hover:bg-accent-foreground/20 rounded-full"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemoveFilter('all')}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          {language === 'ar' ? 'مسح الكل' : 'Clear All'}
        </Button>
      </div>
    </div>
  );
};

export default FilterChips;