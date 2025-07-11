import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, language }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    dates: true,
    vehicleType: false,
    priceRange: false,
    features: false,
    transmission: false,
    fuelType: false
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const isRTL = language === 'ar';

  const locationOptions = [
    { value: 'damascus-center', label: language === 'ar' ? 'وسط دمشق' : 'Damascus Center' },
    { value: 'damascus-airport', label: language === 'ar' ? 'مطار دمشق' : 'Damascus Airport' },
    { value: 'old-damascus', label: language === 'ar' ? 'دمشق القديمة' : 'Old Damascus' },
    { value: 'mezzeh', label: language === 'ar' ? 'المزة' : 'Mezzeh' },
    { value: 'jaramana', label: language === 'ar' ? 'جرمانا' : 'Jaramana' }
  ];

  const vehicleTypeOptions = [
    { value: 'economy', label: language === 'ar' ? 'اقتصادية' : 'Economy' },
    { value: 'compact', label: language === 'ar' ? 'مدمجة' : 'Compact' },
    { value: 'midsize', label: language === 'ar' ? 'متوسطة' : 'Midsize' },
    { value: 'fullsize', label: language === 'ar' ? 'كبيرة' : 'Full Size' },
    { value: 'luxury', label: language === 'ar' ? 'فاخرة' : 'Luxury' },
    { value: 'suv', label: language === 'ar' ? 'دفع رباعي' : 'SUV' }
  ];

  const transmissionOptions = [
    { value: 'automatic', label: language === 'ar' ? 'أوتوماتيك' : 'Automatic' },
    { value: 'manual', label: language === 'ar' ? 'يدوي' : 'Manual' }
  ];

  const fuelTypeOptions = [
    { value: 'petrol', label: language === 'ar' ? 'بنزين' : 'Petrol' },
    { value: 'diesel', label: language === 'ar' ? 'ديزل' : 'Diesel' },
    { value: 'hybrid', label: language === 'ar' ? 'هجين' : 'Hybrid' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = localFilters[key] || [];
    let updatedArray;
    
    if (checked) {
      updatedArray = [...currentArray, value];
    } else {
      updatedArray = currentArray.filter(item => item !== value);
    }
    
    handleFilterChange(key, updatedArray);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const resetFilters = () => {
    const resetFilters = {
      location: '',
      pickupDate: '',
      returnDate: '',
      vehicleTypes: [],
      minPrice: '',
      maxPrice: '',
      features: [],
      transmission: [],
      fuelType: []
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.location) count++;
    if (localFilters.pickupDate) count++;
    if (localFilters.returnDate) count++;
    if (localFilters.vehicleTypes?.length) count += localFilters.vehicleTypes.length;
    if (localFilters.minPrice || localFilters.maxPrice) count++;
    if (localFilters.features?.length) count += localFilters.features.length;
    if (localFilters.transmission?.length) count += localFilters.transmission.length;
    if (localFilters.fuelType?.length) count += localFilters.fuelType.length;
    return count;
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left rtl:text-right hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
      >
        <span className="font-medium text-foreground">{title}</span>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`transition-transform duration-200 ${expandedSections[sectionKey] ? 'rotate-180' : ''}`}
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
          
          <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} bottom-0 w-80 max-w-[85vw] bg-card border-r border-border shadow-xl animate-slide-${isRTL ? 'right' : 'left'}`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground font-heading">
                  {language === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
                </h2>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {getActiveFiltersCount() > 0 && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto">
                <FilterSection 
                  title={language === 'ar' ? 'الموقع' : 'Location'} 
                  sectionKey="location"
                >
                  <Select
                    placeholder={language === 'ar' ? 'اختر الموقع' : 'Select location'}
                    options={locationOptions}
                    value={localFilters.location}
                    onChange={(value) => handleFilterChange('location', value)}
                  />
                </FilterSection>

                <FilterSection 
                  title={language === 'ar' ? 'التواريخ' : 'Dates'} 
                  sectionKey="dates"
                >
                  <Input
                    type="date"
                    label={language === 'ar' ? 'تاريخ الاستلام' : 'Pickup Date'}
                    value={localFilters.pickupDate}
                    onChange={(e) => handleFilterChange('pickupDate', e.target.value)}
                  />
                  <Input
                    type="date"
                    label={language === 'ar' ? 'تاريخ الإرجاع' : 'Return Date'}
                    value={localFilters.returnDate}
                    onChange={(e) => handleFilterChange('returnDate', e.target.value)}
                  />
                </FilterSection>

                <FilterSection 
                  title={language === 'ar' ? 'نوع المركبة' : 'Vehicle Type'} 
                  sectionKey="vehicleType"
                >
                  {vehicleTypeOptions.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={localFilters.vehicleTypes?.includes(option.value) || false}
                      onChange={(e) => handleArrayFilterChange('vehicleTypes', option.value, e.target.checked)}
                    />
                  ))}
                </FilterSection>

                <FilterSection 
                  title={language === 'ar' ? 'نطاق السعر' : 'Price Range'} 
                  sectionKey="priceRange"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      label={language === 'ar' ? 'الحد الأدنى' : 'Min Price'}
                      placeholder="0"
                      value={localFilters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                    <Input
                      type="number"
                      label={language === 'ar' ? 'الحد الأقصى' : 'Max Price'}
                      placeholder="1000"
                      value={localFilters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                </FilterSection>

                <FilterSection 
                  title={language === 'ar' ? 'ناقل الحركة' : 'Transmission'} 
                  sectionKey="transmission"
                >
                  {transmissionOptions.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={localFilters.transmission?.includes(option.value) || false}
                      onChange={(e) => handleArrayFilterChange('transmission', option.value, e.target.checked)}
                    />
                  ))}
                </FilterSection>

                <FilterSection 
                  title={language === 'ar' ? 'نوع الوقود' : 'Fuel Type'} 
                  sectionKey="fuelType"
                >
                  {fuelTypeOptions.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={localFilters.fuelType?.includes(option.value) || false}
                      onChange={(e) => handleArrayFilterChange('fuelType', option.value, e.target.checked)}
                    />
                  ))}
                </FilterSection>

                <FilterSection 
                  title={language === 'ar' ? 'المميزات' : 'Features'} 
                  sectionKey="features"
                >
                  {[
                    { value: 'ac', label: language === 'ar' ? 'تكييف هواء' : 'Air Conditioning' },
                    { value: 'gps', label: language === 'ar' ? 'نظام ملاحة' : 'GPS Navigation' },
                    { value: 'bluetooth', label: language === 'ar' ? 'بلوتوث' : 'Bluetooth' },
                    { value: 'childSeat', label: language === 'ar' ? 'مقعد أطفال' : 'Child Seat' },
                    { value: 'insurance', label: language === 'ar' ? 'تأمين شامل' : 'Full Insurance' },
                    { value: 'wifi', label: language === 'ar' ? 'واي فاي' : 'WiFi Hotspot' }
                  ].map((feature) => (
                    <Checkbox
                      key={feature.value}
                      label={feature.label}
                      checked={localFilters.features?.includes(feature.value) || false}
                      onChange={(e) => handleArrayFilterChange('features', feature.value, e.target.checked)}
                    />
                  ))}
                </FilterSection>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="flex-1"
                  >
                    {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                  </Button>
                  <Button
                    onClick={applyFilters}
                    className="flex-1"
                  >
                    {language === 'ar' ? 'تطبيق' : 'Apply'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-card border-r border-border">
        <div className="sticky top-20 h-[calc(100vh-5rem)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground font-heading">
              {language === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
            </h2>
            {getActiveFiltersCount() > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto">
            <FilterSection 
              title={language === 'ar' ? 'الموقع' : 'Location'} 
              sectionKey="location"
            >
              <Select
                placeholder={language === 'ar' ? 'اختر الموقع' : 'Select location'}
                options={locationOptions}
                value={localFilters.location}
                onChange={(value) => handleFilterChange('location', value)}
              />
            </FilterSection>

            <FilterSection 
              title={language === 'ar' ? 'التواريخ' : 'Dates'} 
              sectionKey="dates"
            >
              <Input
                type="date"
                label={language === 'ar' ? 'تاريخ الاستلام' : 'Pickup Date'}
                value={localFilters.pickupDate}
                onChange={(e) => handleFilterChange('pickupDate', e.target.value)}
              />
              <Input
                type="date"
                label={language === 'ar' ? 'تاريخ الإرجاع' : 'Return Date'}
                value={localFilters.returnDate}
                onChange={(e) => handleFilterChange('returnDate', e.target.value)}
              />
            </FilterSection>

            <FilterSection 
              title={language === 'ar' ? 'نوع المركبة' : 'Vehicle Type'} 
              sectionKey="vehicleType"
            >
              {vehicleTypeOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={localFilters.vehicleTypes?.includes(option.value) || false}
                  onChange={(e) => handleArrayFilterChange('vehicleTypes', option.value, e.target.checked)}
                />
              ))}
            </FilterSection>

            <FilterSection 
              title={language === 'ar' ? 'نطاق السعر' : 'Price Range'} 
              sectionKey="priceRange"
            >
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  label={language === 'ar' ? 'الحد الأدنى' : 'Min Price'}
                  placeholder="0"
                  value={localFilters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <Input
                  type="number"
                  label={language === 'ar' ? 'الحد الأقصى' : 'Max Price'}
                  placeholder="1000"
                  value={localFilters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </FilterSection>

            <FilterSection 
              title={language === 'ar' ? 'ناقل الحركة' : 'Transmission'} 
              sectionKey="transmission"
            >
              {transmissionOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={localFilters.transmission?.includes(option.value) || false}
                  onChange={(e) => handleArrayFilterChange('transmission', option.value, e.target.checked)}
                />
              ))}
            </FilterSection>

            <FilterSection 
              title={language === 'ar' ? 'نوع الوقود' : 'Fuel Type'} 
              sectionKey="fuelType"
            >
              {fuelTypeOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={localFilters.fuelType?.includes(option.value) || false}
                  onChange={(e) => handleArrayFilterChange('fuelType', option.value, e.target.checked)}
                />
              ))}
            </FilterSection>

            <FilterSection 
              title={language === 'ar' ? 'المميزات' : 'Features'} 
              sectionKey="features"
            >
              {[
                { value: 'ac', label: language === 'ar' ? 'تكييف هواء' : 'Air Conditioning' },
                { value: 'gps', label: language === 'ar' ? 'نظام ملاحة' : 'GPS Navigation' },
                { value: 'bluetooth', label: language === 'ar' ? 'بلوتوث' : 'Bluetooth' },
                { value: 'childSeat', label: language === 'ar' ? 'مقعد أطفال' : 'Child Seat' },
                { value: 'insurance', label: language === 'ar' ? 'تأمين شامل' : 'Full Insurance' },
                { value: 'wifi', label: language === 'ar' ? 'واي فاي' : 'WiFi Hotspot' }
              ].map((feature) => (
                <Checkbox
                  key={feature.value}
                  label={feature.label}
                  checked={localFilters.features?.includes(feature.value) || false}
                  onChange={(e) => handleArrayFilterChange('features', feature.value, e.target.checked)}
                />
              ))}
            </FilterSection>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              onClick={resetFilters}
              fullWidth
            >
              {language === 'ar' ? 'إعادة تعيين جميع المرشحات' : 'Reset All Filters'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;