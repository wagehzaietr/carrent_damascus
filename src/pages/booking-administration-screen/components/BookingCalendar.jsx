import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingCalendar = ({ bookings, onDateSelect, language }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month');

  const monthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June',
         'July', 'August', 'September', 'October', 'November', 'December'],
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
         'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  };

  const dayNames = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ar: ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت']
  };

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

  const getBookingsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => 
      booking.startDate === dateStr || booking.endDate === dateStr
    );
  };

  const getDateBookingCount = (date) => {
    return getBookingsForDate(date).length;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date, getBookingsForDate(date));
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const getDayClassName = (date) => {
    if (!date) return 'invisible';
    
    let className = 'w-10 h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors relative ';
    
    if (isToday(date)) {
      className += 'bg-primary text-primary-foreground font-semibold ';
    } else if (isSelected(date)) {
      className += 'bg-accent text-accent-foreground ';
    } else {
      className += 'text-foreground hover:bg-accent hover:text-accent-foreground ';
    }
    
    return className;
  };

  const isRTL = language === 'ar';
  const currentMonth = monthNames[language][currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'ar' ? 'تقويم الحجوزات' : 'Booking Calendar'}
        </h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={navigateToToday}
          >
            {language === 'ar' ? 'اليوم' : 'Today'}
          </Button>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth(-1)}
              className="h-8 w-8"
            >
              <Icon name={isRTL ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth(1)}
              className="h-8 w-8"
            >
              <Icon name={isRTL ? 'ChevronLeft' : 'ChevronRight'} size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Month/Year Header */}
      <div className="text-center mb-4">
        <h4 className="text-xl font-semibold text-foreground">
          {currentMonth} {currentYear}
        </h4>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Day Headers */}
        {dayNames[language].map((day, index) => (
          <div key={index} className="h-10 flex items-center justify-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {days.map((date, index) => (
          <div key={index} className="relative">
            <div
              className={getDayClassName(date)}
              onClick={() => date && handleDateClick(date)}
            >
              {date && date.getDate()}
              {date && getDateBookingCount(date) > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {getDateBookingCount(date)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse text-sm">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">
            {language === 'ar' ? 'اليوم' : 'Today'}
          </span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-error rounded-full"></div>
          <span className="text-muted-foreground">
            {language === 'ar' ? 'يوجد حجوزات' : 'Has Bookings'}
          </span>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <span className="text-muted-foreground">
            {language === 'ar' ? 'محدد' : 'Selected'}
          </span>
        </div>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
          <h4 className="font-semibold text-foreground mb-2">
            {selectedDate.toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h4>
          <div className="text-sm text-muted-foreground">
            {getBookingsForDate(selectedDate).length > 0 ? (
              <>
                {getBookingsForDate(selectedDate).length} {language === 'ar' ? 'حجز' : 'booking(s)'} {language === 'ar' ? 'في هذا اليوم' : 'on this date'}
              </>
            ) : (
              language === 'ar' ? 'لا توجد حجوزات في هذا اليوم' : 'No bookings on this date'
            )}
          </div>
          
          {getBookingsForDate(selectedDate).length > 0 && (
            <div className="mt-3 space-y-2">
              {getBookingsForDate(selectedDate).slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">{booking.customerName}</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="text-muted-foreground">{booking.vehicleName}</span>
                </div>
              ))}
              {getBookingsForDate(selectedDate).length > 3 && (
                <div className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'و' : 'and'} {getBookingsForDate(selectedDate).length - 3} {language === 'ar' ? 'أخرى' : 'more...'}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;