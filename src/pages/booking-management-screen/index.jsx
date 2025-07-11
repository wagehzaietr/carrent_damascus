import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import BookingCard from './components/BookingCard';
import BookingFilters from './components/BookingFilters';
import BookingTimeline from './components/BookingTimeline';
import BookingStats from './components/BookingStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BookingManagementScreen = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  // Mock bookings data
  const mockBookings = [
    {
      id: 'BK001',
      vehicle: {
        model: 'Toyota Camry 2023',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'active',
      startDate: '2025-01-10',
      endDate: '2025-01-15',
      pickupLocation: 'Damascus International Airport',
      totalCost: 750000,
      services: ['GPS Navigation', 'Child Seat', 'Full Insurance'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK002',
      vehicle: {
        model: 'Hyundai Elantra 2022',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'upcoming',
      startDate: '2025-01-20',
      endDate: '2025-01-25',
      pickupLocation: 'Downtown Damascus Office',
      totalCost: 600000,
      services: ['GPS Navigation', 'Full Insurance'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK003',
      vehicle: {
        model: 'Nissan Altima 2023',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'upcoming',
      startDate: '2025-02-01',
      endDate: '2025-02-05',
      pickupLocation: 'Mezzeh District Office',
      totalCost: 500000,
      services: ['GPS Navigation'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK004',
      vehicle: {
        model: 'Honda Civic 2022',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'completed',
      startDate: '2024-12-15',
      endDate: '2024-12-20',
      pickupLocation: 'Damascus International Airport',
      totalCost: 650000,
      services: ['GPS Navigation', 'Full Insurance'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK005',
      vehicle: {
        model: 'Kia Optima 2023',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'completed',
      startDate: '2024-11-10',
      endDate: '2024-11-15',
      pickupLocation: 'Downtown Damascus Office',
      totalCost: 550000,
      services: ['GPS Navigation', 'Child Seat'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK006',
      vehicle: {
        model: 'Chevrolet Malibu 2022',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'completed',
      startDate: '2024-10-05',
      endDate: '2024-10-10',
      pickupLocation: 'Mezzeh District Office',
      totalCost: 700000,
      services: ['GPS Navigation', 'Full Insurance', 'Additional Driver'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK007',
      vehicle: {
        model: 'Ford Focus 2023',
        type: 'Hatchback',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'completed',
      startDate: '2024-09-20',
      endDate: '2024-09-25',
      pickupLocation: 'Damascus International Airport',
      totalCost: 480000,
      services: ['GPS Navigation'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK008',
      vehicle: {
        model: 'Volkswagen Jetta 2022',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'completed',
      startDate: '2024-08-15',
      endDate: '2024-08-20',
      pickupLocation: 'Downtown Damascus Office',
      totalCost: 620000,
      services: ['GPS Navigation', 'Full Insurance'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK009',
      vehicle: {
        model: 'Mazda 6 2023',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'completed',
      startDate: '2024-07-10',
      endDate: '2024-07-15',
      pickupLocation: 'Mezzeh District Office',
      totalCost: 580000,
      services: ['GPS Navigation', 'Child Seat'],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    },
    {
      id: 'BK010',
      vehicle: {
        model: 'Subaru Legacy 2022',
        type: 'Sedan',
        fuel: 'Gasoline',
        seats: 5,
        image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      status: 'cancelled',
      startDate: '2024-06-20',
      endDate: '2024-06-25',
      pickupLocation: 'Damascus International Airport',
      totalCost: 0,
      services: [],
      contactPhone: '+963-11-123-4567',
      contactEmail: 'support@carrentdamascus.com'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    setFilteredBookings(mockBookings);
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    filterBookings(filter, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterBookings(activeFilter, query);
  };

  const filterBookings = (filter, query) => {
    let filtered = mockBookings;

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(booking => booking.status === filter);
    }

    // Apply search filter
    if (query) {
      filtered = filtered.filter(booking => 
        booking.id.toLowerCase().includes(query.toLowerCase()) ||
        booking.vehicle.model.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  };

  const handleExtendRental = (bookingId) => {
    console.log('Extending rental for booking:', bookingId);
    // Implementation for extending rental
  };

  const handleModifyBooking = (bookingId) => {
    console.log('Modifying booking:', bookingId);
    // Implementation for modifying booking
  };

  const handleCancelBooking = (bookingId) => {
    console.log('Cancelling booking:', bookingId);
    // Implementation for cancelling booking
  };

  const handleContactSupport = (bookingId) => {
    console.log('Contacting support for booking:', bookingId);
    // Implementation for contacting support
  };

  const handleViewDirections = (bookingId) => {
    console.log('Viewing directions for booking:', bookingId);
    // Implementation for viewing directions
  };

  const handleViewTimeline = (booking) => {
    setSelectedBooking(booking);
    setShowTimeline(true);
  };

  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <CustomerNavigation />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-heading">
                  {language === 'ar' ? 'إدارة الحجوزات' : 'Booking Management'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {language === 'ar' ?'عرض وإدارة جميع حجوزات تأجير السيارات الخاصة بك' :'View and manage all your car rental bookings'
                  }
                </p>
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button
                  variant="outline"
                  onClick={() => navigate('/car-browse-and-search-screen')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  {language === 'ar' ? 'حجز جديد' : 'New Booking'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleViewTimeline(filteredBookings[0])}
                  iconName="Clock"
                  iconPosition="left"
                >
                  {language === 'ar' ? 'عرض التتبع' : 'View Timeline'}
                </Button>
              </div>
            </div>
          </div>

          {/* Booking Statistics */}
          <BookingStats bookings={mockBookings} />

          {/* Filters */}
          <BookingFilters 
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
          />

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onExtend={handleExtendRental}
                  onModify={handleModifyBooking}
                  onCancel={handleCancelBooking}
                  onContactSupport={handleContactSupport}
                  onViewDirections={handleViewDirections}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {language === 'ar' ? 'لا توجد حجوزات' : 'No Bookings Found'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'ar' ?'لم يتم العثور على حجوزات تطابق معايير البحث الخاصة بك' :'No bookings found matching your search criteria'
                  }
                </p>
                <Button
                  variant="default"
                  onClick={() => navigate('/car-browse-and-search-screen')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  {language === 'ar' ? 'إنشاء حجز جديد' : 'Create New Booking'}
                </Button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="justify-start h-auto p-4"
                onClick={() => navigate('/car-browse-and-search-screen')}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Search" size={20} className="text-primary" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <div className="font-medium">
                      {language === 'ar' ? 'تصفح السيارات' : 'Browse Cars'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'ابحث عن سيارة جديدة' : 'Find a new car to rent'}
                    </div>
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="justify-start h-auto p-4"
                onClick={() => navigate('/customer-dashboard')}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} className="text-success" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <div className="font-medium">
                      {language === 'ar' ? 'الملف الشخصي' : 'My Profile'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'إدارة معلومات الحساب' : 'Manage account information'}
                    </div>
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="justify-start h-auto p-4"
                onClick={() => {}}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="HelpCircle" size={20} className="text-warning" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <div className="font-medium">
                      {language === 'ar' ? 'المساعدة والدعم' : 'Help & Support'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'احصل على المساعدة' : 'Get assistance'}
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Timeline Modal */}
      {showTimeline && selectedBooking && (
        <BookingTimeline
          booking={selectedBooking}
          onClose={() => setShowTimeline(false)}
        />
      )}
    </div>
  );
};

export default BookingManagementScreen;