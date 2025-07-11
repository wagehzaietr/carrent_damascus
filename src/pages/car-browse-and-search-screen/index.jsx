import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import GlobalHeader from '../../components/ui/GlobalHeader';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import FilterPanel from './components/FilterPanel';
import FilterChips from './components/FilterChips';
import CarGrid from './components/CarGrid';
import SortDropdown from './components/SortDropdown';
import ViewModeToggle from './components/ViewModeToggle';
import MapView from './components/MapView';

const CarBrowseAndSearchScreen = () => {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isMapViewOpen, setIsMapViewOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
    vehicleTypes: [],
    minPrice: '',
    maxPrice: '',
    features: [],
    transmission: [],
    fuelType: []
  });

  // Mock car data
  const mockCars = [
    {
      id: 1,
      name: "Toyota Corolla 2023",
      category: "Economy",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      dailyRate: 15000,
      originalPrice: 18000,
      seats: 5,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: 15,
      isAvailable: true,
      rating: 4.5,
      features: ["ac", "bluetooth", "gps"],
      location: "damascus-center"
    },
    {
      id: 2,
      name: "Hyundai Elantra 2023",
      category: "Compact",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      dailyRate: 18000,
      seats: 5,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: 14,
      isAvailable: true,
      rating: 4.3,
      features: ["ac", "bluetooth", "childSeat"],
      location: "damascus-airport"
    },
    {
      id: 3,
      name: "Nissan Sunny 2022",
      category: "Economy",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      dailyRate: 12000,
      seats: 5,
      transmission: "manual",
      fuelType: "petrol",
      mileage: 16,
      isAvailable: false,
      rating: 4.1,
      features: ["ac", "bluetooth"],
      location: "old-damascus"
    },
    {
      id: 4,
      name: "Kia Cerato 2023",
      category: "Midsize",
      image: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg",
      dailyRate: 22000,
      seats: 5,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: 13,
      isAvailable: true,
      rating: 4.6,
      features: ["ac", "bluetooth", "gps", "wifi"],
      location: "mezzeh"
    },
    {
      id: 5,
      name: "Honda Civic 2023",
      category: "Compact",
      image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg",
      dailyRate: 25000,
      originalPrice: 28000,
      seats: 5,
      transmission: "automatic",
      fuelType: "hybrid",
      mileage: 20,
      isAvailable: true,
      rating: 4.8,
      features: ["ac", "bluetooth", "gps", "insurance"],
      location: "jaramana"
    },
    {
      id: 6,
      name: "Chevrolet Cruze 2022",
      category: "Compact",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
      dailyRate: 20000,
      seats: 5,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: 14,
      isAvailable: true,
      rating: 4.2,
      features: ["ac", "bluetooth"],
      location: "damascus-center"
    },
    {
      id: 7,
      name: "Mazda 3 2023",
      category: "Compact",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      dailyRate: 23000,
      seats: 5,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: 15,
      isAvailable: true,
      rating: 4.4,
      features: ["ac", "bluetooth", "gps"],
      location: "damascus-airport"
    },
    {
      id: 8,
      name: "Volkswagen Jetta 2023",
      category: "Midsize",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      dailyRate: 26000,
      seats: 5,
      transmission: "automatic",
      fuelType: "petrol",
      mileage: 13,
      isAvailable: false,
      rating: 4.5,
      features: ["ac", "bluetooth", "gps", "childSeat"],
      location: "old-damascus"
    },
    {
      id: 9,
      name: "Ford Focus 2022",
      category: "Compact",
      image: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg",
      dailyRate: 19000,
      seats: 5,
      transmission: "manual",
      fuelType: "petrol",
      mileage: 16,
      isAvailable: true,
      rating: 4.0,
      features: ["ac", "bluetooth"],
      location: "mezzeh"
    }
  ];

  const [cars, setCars] = useState(mockCars);
  const [filteredCars, setFilteredCars] = useState(mockCars);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, searchQuery]);

  const isRTL = language === 'ar';

  const applyFiltersAndSort = () => {
    let filtered = [...cars];

    // Apply search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(car => car.location === filters.location);
    }

    if (filters.vehicleTypes?.length > 0) {
      filtered = filtered.filter(car =>
        filters.vehicleTypes.some(type => car.category.toLowerCase().includes(type))
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.dailyRate >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.dailyRate <= parseInt(filters.maxPrice));
    }

    if (filters.transmission?.length > 0) {
      filtered = filtered.filter(car => filters.transmission.includes(car.transmission));
    }

    if (filters.fuelType?.length > 0) {
      filtered = filtered.filter(car => filters.fuelType.includes(car.fuelType));
    }

    if (filters.features?.length > 0) {
      filtered = filtered.filter(car =>
        filters.features.every(feature => car.features?.includes(feature))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'fuel-efficiency':
        filtered.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // popularity
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredCars(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterKey, value) => {
    if (filterKey === 'all') {
      setFilters({
        location: '',
        pickupDate: '',
        returnDate: '',
        vehicleTypes: [],
        minPrice: '',
        maxPrice: '',
        features: [],
        transmission: [],
        fuelType: []
      });
      return;
    }

    const newFilters = { ...filters };

    if (value && Array.isArray(newFilters[filterKey])) {
      // Remove specific item from array
      newFilters[filterKey] = newFilters[filterKey].filter(item => item !== value);
    } else if (filterKey === 'dateRange') {
      // Remove both dates
      newFilters.pickupDate = '';
      newFilters.returnDate = '';
    } else if (filterKey === 'priceRange') {
      // Remove price range
      newFilters.minPrice = '';
      newFilters.maxPrice = '';
    } else {
      // Remove entire filter
      if (Array.isArray(newFilters[filterKey])) {
        newFilters[filterKey] = [];
      } else {
        newFilters[filterKey] = '';
      }
    }

    setFilters(newFilters);
  };

  const handleLoadMore = async () => {
    // Simulate loading more cars
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setHasMore(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.location) count++;
    if (filters.pickupDate) count++;
    if (filters.returnDate) count++;
    if (filters.vehicleTypes?.length) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.features?.length) count++;
    if (filters.transmission?.length) count++;
    if (filters.fuelType?.length) count++;
    return count;
  };

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'تصفح السيارات - كار رنت دمشق' : 'Browse Cars - CarRent Damascus'}</title>
        <meta name="description" content={language === 'ar' ? 'تصفح واختر من مجموعة واسعة من السيارات المتاحة للإيجار في دمشق' : 'Browse and choose from a wide selection of rental cars available in Damascus'} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <CustomerNavigation />

        {/* Main Content */}
        <div className="pt-16 lg:pt-20 pb-20 lg:pb-8">
          <div className="flex">
            {/* Filter Sidebar - Desktop */}
            <FilterPanel
              isOpen={isFilterPanelOpen}
              onClose={() => setIsFilterPanelOpen(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              language={language}
            />

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-80">
              {/* Search and Controls Header */}
              <div className="sticky top-16 lg:top-20 z-30 bg-background border-b border-border">
                {/* Search Bar - Mobile */}
                <div className="lg:hidden p-4">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={18} 
                      className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`}
                    />
                    <Input
                      type="text"
                      placeholder={language === 'ar' ? 'البحث عن السيارات...' : 'Search cars...'}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                    />
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between p-4 bg-surface">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* Filter Button - Mobile */}
                    <Button
                      variant="outline"
                      onClick={() => setIsFilterPanelOpen(true)}
                      className="lg:hidden flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <Icon name="Filter" size={16} />
                      <span>{language === 'ar' ? 'تصفية' : 'Filter'}</span>
                      {getActiveFiltersCount() > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                          {getActiveFiltersCount()}
                        </span>
                      )}
                    </Button>

                    {/* Results Count */}
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' 
                        ? `${filteredCars.length} سيارة متاحة`
                        : `${filteredCars.length} cars available`
                      }
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* View Mode Toggle */}
                    <ViewModeToggle
                      viewMode={viewMode}
                      onViewModeChange={setViewMode}
                      language={language}
                    />

                    {/* Sort Dropdown */}
                    <SortDropdown
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      language={language}
                    />

                    {/* Map View Button */}
                    <Button
                      variant="outline"
                      onClick={() => setIsMapViewOpen(true)}
                      className="flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <Icon name="Map" size={16} />
                      <span className="hidden sm:inline">
                        {language === 'ar' ? 'خريطة' : 'Map'}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Filter Chips */}
                <FilterChips
                  filters={filters}
                  onRemoveFilter={handleRemoveFilter}
                  language={language}
                />
              </div>

              {/* Car Grid */}
              <div className="p-4 lg:p-6">
                <CarGrid
                  cars={filteredCars}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  language={language}
                  viewMode={viewMode}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map View */}
        <MapView
          cars={filteredCars}
          isVisible={isMapViewOpen}
          onClose={() => setIsMapViewOpen(false)}
          language={language}
        />
      </div>
    </>
  );
};

export default CarBrowseAndSearchScreen;