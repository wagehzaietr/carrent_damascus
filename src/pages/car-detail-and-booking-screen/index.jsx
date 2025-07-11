import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import CustomerNavigation from '../../components/ui/CustomerNavigation';

// Import all components
import ImageCarousel from './components/ImageCarousel';
import VehicleSpecifications from './components/VehicleSpecifications';
import PricingInformation from './components/PricingInformation';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import CustomerReviews from './components/CustomerReviews';
import BookingForm from './components/BookingForm';
import VehicleLocationMap from './components/VehicleLocationMap';

const CarDetailAndBookingScreen = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const [language, setLanguage] = useState('en');
  const [selectedDuration, setSelectedDuration] = useState('daily');
  const [selectedDates, setSelectedDates] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Mock car data
  const carData = {
    id: 'car-001',
    name: language === 'ar' ? 'تويوتا كامري 2023' : 'Toyota Camry 2023',
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      makeModel: language === 'ar' ? 'تويوتا كامري' : 'Toyota Camry',
      year: '2023',
      transmission: language === 'ar' ? 'أوتوماتيك' : 'Automatic',
      fuelType: language === 'ar' ? 'بنزين' : 'Gasoline',
      seating: 5,
      fuelEconomy: language === 'ar' ? '7.5 لتر/100كم' : '7.5L/100km',
      features: {
        airConditioning: true,
        bluetooth: true,
        gps: true,
        airbags: true,
        centralLocking: true,
        backupCamera: true
      }
    },
    pricing: {
      daily: 85000,
      weekly: 510000,
      monthly: 1870000,
      fees: {
        delivery: 15000,
        insurance: 25000,
        taxes: 12750
      }
    },
    availability: {
      availableDates: [
        '2025-01-12', '2025-01-13', '2025-01-14', '2025-01-15', '2025-01-16',
        '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20', '2025-01-21',
        '2025-01-22', '2025-01-23', '2025-01-24', '2025-01-25', '2025-01-26',
        '2025-01-27', '2025-01-28', '2025-01-29', '2025-01-30', '2025-01-31'
      ]
    },
    reviews: [
      {
        id: 1,
        customerName: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        comment: language === 'ar' ?'سيارة ممتازة وخدمة رائعة. السيارة نظيفة ومريحة جداً، والموظفون متعاونون ومحترفون. أنصح بشدة بهذه الشركة.' :'Excellent car and amazing service. The car was clean and very comfortable, and the staff were cooperative and professional. I highly recommend this company.',
        date: '2025-01-05',
        verified: true,
        helpful: 12,
        rentalPeriod: language === 'ar' ? '5 أيام' : '5 days',
        carType: language === 'ar' ? 'تويوتا كامري' : 'Toyota Camry',
        images: [
          'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=200'
        ]
      },
      {
        id: 2,
        customerName: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4,
        comment: language === 'ar' ?'تجربة جيدة بشكل عام. السيارة في حالة ممتازة والسعر معقول. الوحيد الملاحظة هي أن التسليم تأخر قليلاً عن الموعد المحدد.' :'Good experience overall. The car was in excellent condition and the price was reasonable. The only note is that delivery was slightly delayed from the scheduled time.',
        date: '2025-01-03',
        verified: true,
        helpful: 8,
        rentalPeriod: language === 'ar' ? '3 أيام' : '3 days',
        carType: language === 'ar' ? 'تويوتا كامري' : 'Toyota Camry'
      },
      {
        id: 3,
        customerName: language === 'ar' ? 'محمد حسن' : 'Mohammed Hassan',
        avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
        rating: 5,
        comment: language === 'ar' ?'خدمة استثنائية! السيارة حديثة ومجهزة بكل ما تحتاجه. فريق خدمة العملاء متاح على مدار الساعة ويساعد في أي استفسار.' :'Exceptional service! The car is modern and equipped with everything you need. Customer service team is available 24/7 and helps with any inquiry.',
        date: '2024-12-28',
        verified: true,
        helpful: 15,
        rentalPeriod: language === 'ar' ? 'أسبوع' : '1 week',
        carType: language === 'ar' ? 'تويوتا كامري' : 'Toyota Camry'
      }
    ],
    averageRating: 4.7,
    totalReviews: 60
  };

  // Mock pickup locations
  const pickupLocations = [
    {
      id: 'damascus-airport',
      name: language === 'ar' ? 'مطار دمشق الدولي' : 'Damascus International Airport',
      address: language === 'ar' ? 'مطار دمشق الدولي، دمشق، سوريا' : 'Damascus International Airport, Damascus, Syria',
      lat: 33.4114,
      lng: 36.5156,
      hours: language === 'ar' ? '24/7' : '24/7',
      phone: '+963 11 543 2100',
      email: 'airport@carrentdamascus.com',
      parking: language === 'ar' ? 'مجاني' : 'Free',
      features: [
        language === 'ar' ? 'خدمة 24 ساعة' : '24/7 Service',
        language === 'ar' ? 'مواقف مجانية' : 'Free Parking',
        language === 'ar' ? 'استقبال المطار' : 'Airport Pickup'
      ],
      description: language === 'ar' ?'موقع مريح في مطار دمشق الدولي مع خدمة استقبال مباشرة عند الوصول' :'Convenient location at Damascus International Airport with direct pickup service upon arrival'
    },
    {
      id: 'old-city',
      name: language === 'ar' ? 'البلدة القديمة' : 'Old City Damascus',
      address: language === 'ar' ? 'شارع مدحت باشا، البلدة القديمة، دمشق' : 'Midhat Pasha Street, Old City, Damascus',
      lat: 33.5138,
      lng: 36.3061,
      hours: language === 'ar' ? '8:00 - 20:00' : '8:00 AM - 8:00 PM',
      phone: '+963 11 221 4567',
      email: 'oldcity@carrentdamascus.com',
      parking: language === 'ar' ? 'محدود' : 'Limited',
      features: [
        language === 'ar' ? 'موقع تاريخي' : 'Historic Location',
        language === 'ar' ? 'قريب من المعالم' : 'Near Landmarks',
        language === 'ar' ? 'مواصلات عامة' : 'Public Transport'
      ],
      description: language === 'ar' ?'في قلب دمشق التاريخية، قريب من الجامع الأموي والأسواق التراثية' :'In the heart of historic Damascus, close to Umayyad Mosque and traditional markets'
    },
    {
      id: 'mazzeh',
      name: language === 'ar' ? 'المزة' : 'Mazzeh District',
      address: language === 'ar' ? 'شارع المزة، حي المزة، دمشق' : 'Mazzeh Street, Mazzeh District, Damascus',
      lat: 33.5007,
      lng: 36.2784,
      hours: language === 'ar' ? '7:00 - 22:00' : '7:00 AM - 10:00 PM',
      phone: '+963 11 665 8901',
      email: 'mazzeh@carrentdamascus.com',
      parking: language === 'ar' ? 'واسع' : 'Ample',
      features: [
        language === 'ar' ? 'مواقف واسعة' : 'Ample Parking',
        language === 'ar' ? 'منطقة حديثة' : 'Modern Area',
        language === 'ar' ? 'سهولة الوصول' : 'Easy Access'
      ],
      description: language === 'ar' ?'منطقة حديثة ومتطورة مع مواقف سيارات واسعة وسهولة في الوصول' :'Modern and developed area with ample parking spaces and easy accessibility'
    }
  ];

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const handleBookingSubmit = async (bookingData) => {
    console.log('Booking submitted:', bookingData);
    // Here you would typically send the booking data to your backend
    // For now, we'll just show a success message and redirect
    alert(language === 'ar' ? 'تم إرسال طلب الحجز بنجاح!' : 'Booking request submitted successfully!');
    navigate('/booking-management-screen');
  };

  const calculateTotalCost = () => {
    const selectedOption = carData.pricing[selectedDuration];
    const totalFees = Object.values(carData.pricing.fees).reduce((sum, fee) => sum + fee, 0);
    return selectedOption + totalFees;
  };

  const handleBackToSearch = () => {
    navigate('/car-browse-and-search-screen');
  };

  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <CustomerNavigation />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-20 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button and Breadcrumb */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToSearch}
              iconName={isRTL ? "ChevronRight" : "ChevronLeft"}
              iconPosition="left"
              className="mb-4"
            >
              {language === 'ar' ? 'العودة للبحث' : 'Back to Search'}
            </Button>
            
            <nav className="text-sm text-muted-foreground">
              <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
              <Icon name="ChevronRight" size={14} className="inline mx-2" />
              <span>{language === 'ar' ? 'تصفح السيارات' : 'Browse Cars'}</span>
              <Icon name="ChevronRight" size={14} className="inline mx-2" />
              <span className="text-foreground">{carData.name}</span>
            </nav>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Car Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Car Title and Quick Info */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2 font-heading">
                      {carData.name}
                    </h1>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Icon name="Star" size={16} className="text-accent fill-current" />
                        <span>{carData.averageRating}</span>
                        <span>({carData.totalReviews} {language === 'ar' ? 'تقييم' : 'reviews'})</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Icon name="MapPin" size={16} />
                        <span>{language === 'ar' ? 'دمشق، سوريا' : 'Damascus, Syria'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right rtl:text-left">
                    <div className="text-2xl font-bold text-primary">
                      {language === 'ar' 
                        ? `${carData.pricing.daily.toLocaleString('ar-SY')} ل.س`
                        : `${carData.pricing.daily.toLocaleString('en-US')} SYP`
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'في اليوم' : 'per day'}
                    </div>
                  </div>
                </div>
              </div>

              <ImageCarousel images={carData.images} carName={carData.name} />
              <VehicleSpecifications specifications={carData.specifications} />
              <PricingInformation 
                pricing={carData.pricing}
                selectedDuration={selectedDuration}
                onDurationChange={setSelectedDuration}
              />
              <AvailabilityCalendar 
                availability={carData.availability}
                onDateSelect={handleDateSelect}
                selectedDates={selectedDates}
              />
              <CustomerReviews 
                reviews={carData.reviews}
                averageRating={carData.averageRating}
                totalReviews={carData.totalReviews}
              />
              <VehicleLocationMap 
                pickupLocations={pickupLocations}
                selectedLocation={pickupLocations[0]}
              />
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <BookingForm 
                onBookingSubmit={handleBookingSubmit}
                selectedDates={selectedDates}
                totalCost={calculateTotalCost()}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Car Title and Quick Info */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h1 className="text-xl font-bold text-foreground mb-2 font-heading">
                {carData.name}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <span>{carData.averageRating}</span>
                  <span>({carData.totalReviews})</span>
                </div>
                <div className="text-right rtl:text-left">
                  <div className="text-lg font-bold text-primary">
                    {language === 'ar' 
                      ? `${carData.pricing.daily.toLocaleString('ar-SY')} ل.س`
                      : `${carData.pricing.daily.toLocaleString('en-US')} SYP`
                    }
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'في اليوم' : 'per day'}
                  </div>
                </div>
              </div>
            </div>

            <ImageCarousel images={carData.images} carName={carData.name} />
            <VehicleSpecifications specifications={carData.specifications} />
            <PricingInformation 
              pricing={carData.pricing}
              selectedDuration={selectedDuration}
              onDurationChange={setSelectedDuration}
            />
            <AvailabilityCalendar 
              availability={carData.availability}
              onDateSelect={handleDateSelect}
              selectedDates={selectedDates}
            />
            <CustomerReviews 
              reviews={carData.reviews}
              averageRating={carData.averageRating}
              totalReviews={carData.totalReviews}
            />
            <VehicleLocationMap 
              pickupLocations={pickupLocations}
              selectedLocation={pickupLocations[0]}
            />

            {/* Mobile Booking Button */}
            <div className="fixed bottom-20 left-4 right-4 z-50">
              <Button
                variant="default"
                size="lg"
                fullWidth
                onClick={() => setShowBookingForm(true)}
                iconName="Calendar"
                iconPosition="left"
              >
                {language === 'ar' ? 'احجز الآن' : 'Book Now'}
              </Button>
            </div>

            {/* Mobile Booking Form Modal */}
            {showBookingForm && (
              <div className="fixed inset-0 z-[1000] bg-background/80 backdrop-blur-sm">
                <div className="fixed inset-x-0 bottom-0 top-16 bg-background rounded-t-lg overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-foreground font-heading">
                        {language === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowBookingForm(false)}
                      >
                        <Icon name="X" size={20} />
                      </Button>
                    </div>
                    <BookingForm 
                      onBookingSubmit={handleBookingSubmit}
                      selectedDates={selectedDates}
                      totalCost={calculateTotalCost()}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetailAndBookingScreen;