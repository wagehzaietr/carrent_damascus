import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilityCalendar = ({ availability, onDateSelect, selectedDates }) => {
  const [language, setLanguage] = useState('en');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(selectedDates?.start || null);
  const [endDate, setEndDate] = useState(selectedDates?.end || null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const monthNames = language === 'ar' 
    ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = language === 'ar'
    ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return availability.availableDates.includes(dateStr);
  };

  const isDateSelected = (date) => {
    if (!date || (!startDate && !endDate)) return false;
    
    const dateTime = date.getTime();
    const startTime = startDate?.getTime();
    const endTime = endDate?.getTime();
    
    if (startTime && endTime) {
      return dateTime >= startTime && dateTime <= endTime;
    }
    
    return dateTime === startTime;
  };

  const isDateInRange = (date) => {
    if (!date || !startDate || !endDate) return false;
    const dateTime = date.getTime();
    return dateTime > startDate.getTime() && dateTime < endDate.getTime();
  };

  const handleDateClick = (date) => {
    if (!isDateAvailable(date)) return;
    
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
    } else if (date.getTime() === startDate.getTime()) {
      // Clicked same date, clear selection
      setStartDate(null);
      setEndDate(null);
    } else if (date.getTime() < startDate.getTime()) {
      // Clicked earlier date, make it start date
      setStartDate(date);
      setEndDate(null);
    } else {
      // Set end date
      setEndDate(date);
      onDateSelect({ start: startDate, end: date });
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatDateRange = () => {
    if (!startDate) return language === 'ar' ? 'اختر التواريخ' : 'Select dates';
    
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    const locale = language === 'ar' ? 'ar-SY' : 'en-US';
    
    if (endDate) {
      return `${startDate.toLocaleDateString(locale, options)} - ${endDate.toLocaleDateString(locale, options)}`;
    }
    
    return startDate.toLocaleDateString(locale, options);
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const days = getDaysInMonth(currentMonth);
  const isRTL = language === 'ar';

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">
        {language === 'ar' ? 'التوفر والتواريخ' : 'Availability & Dates'}
      </h3>

      {/* Selected Date Range Display */}
      <div className="mb-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {language === 'ar' ? 'الفترة المحددة' : 'Selected Period'}
            </p>
            <p className="font-semibold text-foreground">{formatDateRange()}</p>
          </div>
          {startDate && endDate && (
            <div className="text-right rtl:text-left">
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'ar' ? 'المدة' : 'Duration'}
              </p>
              <p className="font-semibold text-primary">
                {calculateDays()} {language === 'ar' ? 'يوم' : 'days'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
        >
          <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={20} />
        </Button>
        
        <h4 className="text-lg font-semibold text-foreground">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h4>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
        >
          <Icon name={isRTL ? "ChevronLeft" : "ChevronRight"} size={20} />
        </Button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div key={index} className="text-center text-sm font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => date && handleDateClick(date)}
            disabled={!date || !isDateAvailable(date)}
            className={`
              aspect-square p-2 text-sm rounded-lg transition-all duration-200 relative
              ${!date ? 'invisible' : ''}
              ${!isDateAvailable(date) && date ? 'text-muted-foreground bg-muted/30 cursor-not-allowed' : ''}
              ${isDateAvailable(date) && date ? 'hover:bg-primary/10 cursor-pointer' : ''}
              ${isDateSelected(date) ? 'bg-primary text-primary-foreground font-semibold' : ''}
              ${isDateInRange(date) ? 'bg-primary/20 text-primary' : ''}
              ${date && date.toDateString() === new Date().toDateString() ? 'ring-2 ring-accent' : ''}
            `}
          >
            {date?.getDate()}
            
            {/* Availability indicator */}
            {date && isDateAvailable(date) && !isDateSelected(date) && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-success rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-muted-foreground">
            {language === 'ar' ? 'متاح' : 'Available'}
          </span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">
            {language === 'ar' ? 'محدد' : 'Selected'}
          </span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-muted rounded-full"></div>
          <span className="text-muted-foreground">
            {language === 'ar' ? 'غير متاح' : 'Unavailable'}
          </span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <span className="text-muted-foreground">
            {language === 'ar' ? 'اليوم' : 'Today'}
          </span>
        </div>
      </div>

      {/* Quick Date Selection */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">
          {language === 'ar' ? 'اختيار سريع' : 'Quick Selection'}
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { days: 1, label: language === 'ar' ? 'يوم واحد' : '1 Day' },
            { days: 3, label: language === 'ar' ? '3 أيام' : '3 Days' },
            { days: 7, label: language === 'ar' ? 'أسبوع' : '1 Week' },
            { days: 14, label: language === 'ar' ? 'أسبوعين' : '2 Weeks' }
          ].map((option) => (
            <Button
              key={option.days}
              variant="outline"
              size="sm"
              onClick={() => {
                const start = new Date();
                const end = new Date();
                end.setDate(start.getDate() + option.days);
                setStartDate(start);
                setEndDate(end);
                onDateSelect({ start, end });
              }}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;