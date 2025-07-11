import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import AdminNavigation from '../../components/ui/AdminNavigation';
import BookingTable from './components/BookingTable';
import BookingFilters from './components/BookingFilters';
import BookingStatistics from './components/BookingStatistics';
import BookingDetails from './components/BookingDetails';
import BookingCalendar from './components/BookingCalendar';
import MobileBookingCard from './components/MobileBookingCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BookingAdministrationScreen = () => {
  const [language, setLanguage] = useState('en');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [filters, setFilters] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const mockBookings = [
    {
      id: 'BK001',
      customerName: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+963 11 123 4567',
      vehicleName: language === 'ar' ? 'تويوتا كامري' : 'Toyota Camry',
      vehicleModel: '2023',
      licensePlate: 'ABC-123',
      vehicleColor: language === 'ar' ? 'أبيض' : 'White',
      startDate: '2025-01-12',
      startTime: '09:00',
      endDate: '2025-01-15',
      endTime: '18:00',
      status: 'confirmed',
      totalAmount: '4,500',
      currency: 'SYP',
      duration: language === 'ar' ? '3 أيام' : '3 days'
    },
    {
      id: 'BK002',
      customerName: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      customerEmail: 'fatima@example.com',
      customerPhone: '+963 11 234 5678',
      vehicleName: language === 'ar' ? 'هيونداي إلنترا' : 'Hyundai Elantra',
      vehicleModel: '2022',
      licensePlate: 'DEF-456',
      vehicleColor: language === 'ar' ? 'أسود' : 'Black',
      startDate: '2025-01-13',
      startTime: '10:00',
      endDate: '2025-01-16',
      endTime: '17:00',
      status: 'pending',
      totalAmount: '3,200',
      currency: 'SYP',
      duration: language === 'ar' ? '3 أيام' : '3 days'
    },
    {
      id: 'BK003',
      customerName: language === 'ar' ? 'محمد حسن' : 'Mohammed Hassan',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+963 11 345 6789',
      vehicleName: language === 'ar' ? 'نيسان التيما' : 'Nissan Altima',
      vehicleModel: '2023',
      licensePlate: 'GHI-789',
      vehicleColor: language === 'ar' ? 'فضي' : 'Silver',
      startDate: '2025-01-14',
      startTime: '08:00',
      endDate: '2025-01-18',
      endTime: '20:00',
      status: 'active',
      totalAmount: '6,000',
      currency: 'SYP',
      duration: language === 'ar' ? '4 أيام' : '4 days'
    },
    {
      id: 'BK004',
      customerName: language === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
      customerEmail: 'sara@example.com',
      customerPhone: '+963 11 456 7890',
      vehicleName: language === 'ar' ? 'كيا سيراتو' : 'Kia Cerato',
      vehicleModel: '2022',
      licensePlate: 'JKL-012',
      vehicleColor: language === 'ar' ? 'أحمر' : 'Red',
      startDate: '2025-01-10',
      startTime: '11:00',
      endDate: '2025-01-12',
      endTime: '16:00',
      status: 'completed',
      totalAmount: '2,800',
      currency: 'SYP',
      duration: language === 'ar' ? '2 أيام' : '2 days'
    },
    {
      id: 'BK005',
      customerName: language === 'ar' ? 'عمر خالد' : 'Omar Khalid',
      customerEmail: 'omar@example.com',
      customerPhone: '+963 11 567 8901',
      vehicleName: language === 'ar' ? 'شيفروليه كروز' : 'Chevrolet Cruze',
      vehicleModel: '2021',
      licensePlate: 'MNO-345',
      vehicleColor: language === 'ar' ? 'أزرق' : 'Blue',
      startDate: '2025-01-11',
      startTime: '12:00',
      endDate: '2025-01-13',
      endTime: '15:00',
      status: 'cancelled',
      totalAmount: '2,400',
      currency: 'SYP',
      duration: language === 'ar' ? '2 أيام' : '2 days'
    }
  ];

  const handleBookingAction = (action, bookingId) => {
    console.log(`Action: ${action}, Booking ID: ${bookingId}`);
    // Handle booking actions like edit, message, confirm, cancel, etc.
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedBooking(null);
  };

  const handleUpdateBooking = (updatedBooking) => {
    console.log('Updated booking:', updatedBooking);
    // Handle booking update
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handleDateSelect = (date, bookings) => {
    setSelectedDate(date);
    console.log('Selected date:', date, 'Bookings:', bookings);
  };

  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <AdminNavigation />
      
      <main className={`pt-16 ${isRTL ? 'lg:pr-64' : 'lg:pl-64'} transition-all duration-300`}>
        <div className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {language === 'ar' ? 'إدارة الحجوزات' : 'Booking Administration'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === 'ar' ?'إدارة شاملة للحجوزات وخدمة العملاء' :'Comprehensive booking management and customer service'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {/* View Mode Toggle */}
              <div className="flex bg-surface rounded-lg p-1 border border-border">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'table' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Table" size={16} />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'جدول' : 'Table'}
                  </span>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'calendar' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Calendar" size={16} />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'تقويم' : 'Calendar'}
                  </span>
                </button>
              </div>

              <Button
                variant="default"
                iconName="Plus"
                className="hidden sm:flex"
              >
                {language === 'ar' ? 'حجز جديد' : 'New Booking'}
              </Button>
            </div>
          </div>

          {/* Filters */}
          <BookingFilters 
            onFilterChange={handleFilterChange}
            language={language}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Bookings Section */}
            <div className="xl:col-span-3">
              {viewMode === 'table' ? (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden lg:block">
                    <BookingTable
                      bookings={mockBookings}
                      onBookingAction={handleBookingAction}
                      onViewDetails={handleViewDetails}
                      language={language}
                    />
                  </div>
                  
                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        {language === 'ar' ? 'الحجوزات' : 'Bookings'}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {mockBookings.length} {language === 'ar' ? 'حجز' : 'bookings'}
                      </span>
                    </div>
                    {mockBookings.map((booking) => (
                      <MobileBookingCard
                        key={booking.id}
                        booking={booking}
                        onAction={handleBookingAction}
                        onViewDetails={handleViewDetails}
                        language={language}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <BookingCalendar
                  bookings={mockBookings}
                  onDateSelect={handleDateSelect}
                  language={language}
                />
              )}
            </div>

            {/* Statistics Sidebar */}
            <div className="xl:col-span-1">
              <BookingStatistics language={language} />
            </div>
          </div>
        </div>
      </main>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={handleCloseDetails}
          onUpdate={handleUpdateBooking}
          language={language}
        />
      )}

      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default BookingAdministrationScreen;