import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ sortBy, onSortChange, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = language === 'ar';

  const sortOptions = [
    { value: 'popularity', label: language === 'ar' ? 'الأكثر شعبية' : 'Most Popular' },
    { value: 'price-low', label: language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High' },
    { value: 'price-high', label: language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low' },
    { value: 'rating', label: language === 'ar' ? 'أعلى تقييم' : 'Highest Rated' },
    { value: 'fuel-efficiency', label: language === 'ar' ? 'كفاءة الوقود' : 'Fuel Efficiency' },
    { value: 'newest', label: language === 'ar' ? 'الأحدث' : 'Newest First' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : sortOptions[0].label;
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse min-w-[160px] justify-between"
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Icon name="ArrowUpDown" size={16} />
          <span className="text-sm">{getCurrentSortLabel()}</span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Dropdown Menu */}
          <div className={`absolute top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-20 animate-slide-down ${isRTL ? 'left-0' : 'right-0'}`}>
            <div className="p-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                    sortBy === option.value
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse flex-1">
                    {option.value === 'popularity' && <Icon name="TrendingUp" size={16} />}
                    {option.value === 'price-low' && <Icon name="ArrowUp" size={16} />}
                    {option.value === 'price-high' && <Icon name="ArrowDown" size={16} />}
                    {option.value === 'rating' && <Icon name="Star" size={16} />}
                    {option.value === 'fuel-efficiency' && <Icon name="Fuel" size={16} />}
                    {option.value === 'newest' && <Icon name="Clock" size={16} />}
                    <span>{option.label}</span>
                  </div>
                  {sortBy === option.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;