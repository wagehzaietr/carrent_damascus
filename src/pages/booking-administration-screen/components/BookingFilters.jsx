import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingFilters = ({ onFilterChange, language }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    vehicleType: 'all',
    customStartDate: '',
    customEndDate: ''
  });

  const [savedFilters, setSavedFilters] = useState([
    { id: 1, name: language === 'ar' ? 'الحجوزات المؤكدة اليوم' : 'Today Confirmed', filters: { status: 'confirmed', dateRange: 'today' } },
    { id: 2, name: language === 'ar' ? 'الحجوزات المعلقة' : 'Pending Bookings', filters: { status: 'pending' } },
    { id: 3, name: language === 'ar' ? 'حجوزات هذا الأسبوع' : 'This Week Bookings', filters: { dateRange: 'week' } }
  ]);

  const statusOptions = [
    { value: 'all', label: language === 'ar' ? 'جميع الحالات' : 'All Status' },
    { value: 'pending', label: language === 'ar' ? 'في الانتظار' : 'Pending' },
    { value: 'confirmed', label: language === 'ar' ? 'مؤكد' : 'Confirmed' },
    { value: 'active', label: language === 'ar' ? 'نشط' : 'Active' },
    { value: 'completed', label: language === 'ar' ? 'مكتمل' : 'Completed' },
    { value: 'cancelled', label: language === 'ar' ? 'ملغي' : 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: language === 'ar' ? 'جميع التواريخ' : 'All Dates' },
    { value: 'today', label: language === 'ar' ? 'اليوم' : 'Today' },
    { value: 'week', label: language === 'ar' ? 'هذا الأسبوع' : 'This Week' },
    { value: 'month', label: language === 'ar' ? 'هذا الشهر' : 'This Month' },
    { value: 'custom', label: language === 'ar' ? 'نطاق مخصص' : 'Custom Range' }
  ];

  const vehicleTypeOptions = [
    { value: 'all', label: language === 'ar' ? 'جميع المركبات' : 'All Vehicles' },
    { value: 'sedan', label: language === 'ar' ? 'سيدان' : 'Sedan' },
    { value: 'suv', label: language === 'ar' ? 'دفع رباعي' : 'SUV' },
    { value: 'hatchback', label: language === 'ar' ? 'هاتشباك' : 'Hatchback' },
    { value: 'luxury', label: language === 'ar' ? 'فاخرة' : 'Luxury' }
  ];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      dateRange: 'all',
      vehicleType: 'all',
      customStartDate: '',
      customEndDate: ''
    });
  };

  const handleSaveFilter = () => {
    const filterName = prompt(language === 'ar' ? 'اسم الفلتر:' : 'Filter name:');
    if (filterName) {
      const newFilter = {
        id: Date.now(),
        name: filterName,
        filters: { ...filters }
      };
      setSavedFilters(prev => [...prev, newFilter]);
    }
  };

  const handleLoadFilter = (savedFilter) => {
    setFilters(savedFilter.filters);
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'ar' ? 'فلاتر البحث' : 'Search Filters'}
        </h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            iconName="Save"
            onClick={handleSaveFilter}
          >
            {language === 'ar' ? 'حفظ الفلتر' : 'Save Filter'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={handleClearFilters}
          >
            {language === 'ar' ? 'مسح الكل' : 'Clear All'}
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder={language === 'ar' ? 'البحث في الحجوزات...' : 'Search bookings...'}
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full"
        />

        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder={language === 'ar' ? 'اختر الحالة' : 'Select Status'}
        />

        <Select
          options={dateRangeOptions}
          value={filters.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder={language === 'ar' ? 'اختر النطاق الزمني' : 'Select Date Range'}
        />

        <Select
          options={vehicleTypeOptions}
          value={filters.vehicleType}
          onChange={(value) => handleFilterChange('vehicleType', value)}
          placeholder={language === 'ar' ? 'اختر نوع المركبة' : 'Select Vehicle Type'}
        />
      </div>

      {/* Custom Date Range */}
      {filters.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            type="date"
            label={language === 'ar' ? 'تاريخ البداية' : 'Start Date'}
            value={filters.customStartDate}
            onChange={(e) => handleFilterChange('customStartDate', e.target.value)}
          />
          <Input
            type="date"
            label={language === 'ar' ? 'تاريخ النهاية' : 'End Date'}
            value={filters.customEndDate}
            onChange={(e) => handleFilterChange('customEndDate', e.target.value)}
          />
        </div>
      )}

      {/* Saved Filters */}
      {savedFilters.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">
            {language === 'ar' ? 'الفلاتر المحفوظة' : 'Saved Filters'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {savedFilters.map((savedFilter) => (
              <Button
                key={savedFilter.id}
                variant="outline"
                size="sm"
                onClick={() => handleLoadFilter(savedFilter)}
                className="text-xs"
              >
                <Icon name="Filter" size={14} className={`${isRTL ? 'ml-1' : 'mr-1'}`} />
                {savedFilter.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                {language === 'ar' ? 'البحث:' : 'Search:'} {filters.search}
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className={`${isRTL ? 'mr-1' : 'ml-1'} hover:bg-primary-foreground/20 rounded-full p-0.5`}
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent text-accent-foreground">
                {language === 'ar' ? 'الحالة:' : 'Status:'} {statusOptions.find(opt => opt.value === filters.status)?.label}
                <button
                  onClick={() => handleFilterChange('status', 'all')}
                  className={`${isRTL ? 'mr-1' : 'ml-1'} hover:bg-accent-foreground/20 rounded-full p-0.5`}
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success text-success-foreground">
                {language === 'ar' ? 'التاريخ:' : 'Date:'} {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
                <button
                  onClick={() => handleFilterChange('dateRange', 'all')}
                  className={`${isRTL ? 'mr-1' : 'ml-1'} hover:bg-success-foreground/20 rounded-full p-0.5`}
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.vehicleType !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-warning text-warning-foreground">
                {language === 'ar' ? 'المركبة:' : 'Vehicle:'} {vehicleTypeOptions.find(opt => opt.value === filters.vehicleType)?.label}
                <button
                  onClick={() => handleFilterChange('vehicleType', 'all')}
                  className={`${isRTL ? 'mr-1' : 'ml-1'} hover:bg-warning-foreground/20 rounded-full p-0.5`}
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {language === 'ar' ? 'الفلاتر النشطة' : 'Active Filters'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;