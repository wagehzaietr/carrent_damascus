import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const VehicleFilters = ({ onFiltersChange, onAddVehicle }) => {
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState({
    search: '',
    vehicleType: '',
    status: '',
    location: '',
    maintenanceStatus: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const vehicleTypeOptions = [
    { value: '', label: language === 'ar' ? 'جميع الأنواع' : 'All Types' },
    { value: 'sedan', label: language === 'ar' ? 'سيدان' : 'Sedan' },
    { value: 'suv', label: language === 'ar' ? 'دفع رباعي' : 'SUV' },
    { value: 'hatchback', label: language === 'ar' ? 'هاتشباك' : 'Hatchback' },
    { value: 'coupe', label: language === 'ar' ? 'كوبيه' : 'Coupe' },
    { value: 'convertible', label: language === 'ar' ? 'قابل للتحويل' : 'Convertible' }
  ];

  const statusOptions = [
    { value: '', label: language === 'ar' ? 'جميع الحالات' : 'All Status' },
    { value: 'available', label: language === 'ar' ? 'متاح' : 'Available' },
    { value: 'rented', label: language === 'ar' ? 'مؤجر' : 'Rented' },
    { value: 'maintenance', label: language === 'ar' ? 'في الصيانة' : 'Maintenance' },
    { value: 'out-of-service', label: language === 'ar' ? 'خارج الخدمة' : 'Out of Service' }
  ];

  const locationOptions = [
    { value: '', label: language === 'ar' ? 'جميع المواقع' : 'All Locations' },
    { value: 'damascus-center', label: language === 'ar' ? 'وسط دمشق' : 'Damascus Center' },
    { value: 'mazzeh', label: language === 'ar' ? 'المزة' : 'Mazzeh' },
    { value: 'abu-rummaneh', label: language === 'ar' ? 'أبو رمانة' : 'Abu Rummaneh' },
    { value: 'malki', label: language === 'ar' ? 'المالكي' : 'Malki' },
    { value: 'qassaa', label: language === 'ar' ? 'القصاع' : 'Qassaa' }
  ];

  const maintenanceOptions = [
    { value: '', label: language === 'ar' ? 'جميع حالات الصيانة' : 'All Maintenance' },
    { value: 'up-to-date', label: language === 'ar' ? 'محدثة' : 'Up to Date' },
    { value: 'due-soon', label: language === 'ar' ? 'مستحقة قريباً' : 'Due Soon' },
    { value: 'overdue', label: language === 'ar' ? 'متأخرة' : 'Overdue' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      vehicleType: '',
      status: '',
      location: '',
      maintenanceStatus: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <h2 className="text-xl font-semibold text-foreground">
            {language === 'ar' ? 'إدارة الأسطول' : 'Fleet Management'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {language === 'ar' ? 'فلاتر' : 'Filters'}
          </Button>
        </div>
        
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
            >
              {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
            </Button>
          )}
          <Button
            variant="default"
            onClick={onAddVehicle}
            iconName="Plus"
            iconPosition="left"
          >
            {language === 'ar' ? 'إضافة مركبة' : 'Add Vehicle'}
          </Button>
        </div>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${language === 'ar' ? 'right-3' : 'left-3'}`}
          />
          <Input
            type="search"
            placeholder={language === 'ar' ? 'البحث عن المركبات...' : 'Search vehicles...'}
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className={`${language === 'ar' ? 'pr-10' : 'pl-10'}`}
          />
        </div>
      </div>

      {/* Advanced Filters - Collapsible */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-down">
          <Select
            label={language === 'ar' ? 'نوع المركبة' : 'Vehicle Type'}
            options={vehicleTypeOptions}
            value={filters.vehicleType}
            onChange={(value) => handleFilterChange('vehicleType', value)}
          />

          <Select
            label={language === 'ar' ? 'الحالة' : 'Status'}
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <Select
            label={language === 'ar' ? 'الموقع' : 'Location'}
            options={locationOptions}
            value={filters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />

          <Select
            label={language === 'ar' ? 'حالة الصيانة' : 'Maintenance Status'}
            options={maintenanceOptions}
            value={filters.maintenanceStatus}
            onChange={(value) => handleFilterChange('maintenanceStatus', value)}
          />
        </div>
      )}
    </div>
  );
};

export default VehicleFilters;