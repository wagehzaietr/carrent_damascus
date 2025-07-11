import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingFilters = ({ onFilterChange, onSearchChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [language] = useState(() => localStorage.getItem('language') || 'en');

  const filterOptions = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'All', count: 12 },
    { id: 'upcoming', label: language === 'ar' ? 'قادم' : 'Upcoming', count: 3 },
    { id: 'active', label: language === 'ar' ? 'نشط' : 'Active', count: 2 },
    { id: 'completed', label: language === 'ar' ? 'مكتمل' : 'Completed', count: 6 },
    { id: 'cancelled', label: language === 'ar' ? 'ملغي' : 'Cancelled', count: 1 }
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearchChange('');
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder={language === 'ar' ? 'البحث برقم الحجز أو نوع المركبة...' : 'Search by booking ID or vehicle model...'}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
          <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'}`}>
            {searchQuery ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="h-6 w-6"
              >
                <Icon name="X" size={14} />
              </Button>
            ) : (
              <Icon name="Search" size={16} className="text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <Button
            key={option.id}
            variant={activeFilter === option.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterClick(option.id)}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span>{option.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              activeFilter === option.id 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {option.count}
            </span>
          </Button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Calendar"
          iconPosition="left"
        >
          {language === 'ar' ? 'تصفية بالتاريخ' : 'Filter by Date'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Car"
          iconPosition="left"
        >
          {language === 'ar' ? 'نوع المركبة' : 'Vehicle Type'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MapPin"
          iconPosition="left"
        >
          {language === 'ar' ? 'الموقع' : 'Location'}
        </Button>
      </div>
    </div>
  );
};

export default BookingFilters;