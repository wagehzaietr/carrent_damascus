import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import AdminNavigation from '../../components/ui/AdminNavigation';
import FleetSummaryCard from './components/FleetSummaryCard';
import VehicleFilters from './components/VehicleFilters';
import VehicleTable from './components/VehicleTable';
import AddVehicleModal from './components/AddVehicleModal';
import LocationMapView from './components/LocationMapView';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FleetManagementScreen = () => {
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState({});
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isLocationMapOpen, setIsLocationMapOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // Listen for language changes
    const handleStorageChange = () => {
      const currentLanguage = localStorage.getItem('language') || 'en';
      setLanguage(currentLanguage);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddVehicle = () => {
    setIsAddVehicleModalOpen(true);
  };

  const handleSaveVehicle = (vehicleData) => {
    console.log('Saving vehicle:', vehicleData);
    // Here you would typically save to your backend
  };

  const handleVehicleEdit = (vehicleId) => {
    console.log('Editing vehicle:', vehicleId);
    // Navigate to edit vehicle page or open edit modal
  };

  const handleVehicleView = (vehicleId) => {
    console.log('Viewing vehicle:', vehicleId);
    // Navigate to vehicle detail page or open view modal
  };

  const handleMaintenanceSchedule = (vehicleId) => {
    console.log('Scheduling maintenance for vehicle:', vehicleId);
    // Open maintenance scheduling modal or navigate to maintenance page
  };

  const handleExportData = () => {
    console.log('Exporting fleet data');
    // Implement export functionality
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
                {language === 'ar' ? 'إدارة الأسطول' : 'Fleet Management'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === 'ar' ? 'إدارة شاملة لأسطول المركبات والصيانة والعمليات': 'Comprehensive vehicle fleet, maintenance, and operations management'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Button
                variant="outline"
                onClick={() => setShowSummary(!showSummary)}
                iconName={showSummary ? 'EyeOff' : 'Eye'}
                iconPosition="left"
                className="hidden lg:flex"
              >
                {showSummary ? 
                  (language === 'ar' ? 'إخفاء الملخص' : 'Hide Summary') :
                  (language === 'ar' ? 'إظهار الملخص' : 'Show Summary')
                }
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsLocationMapOpen(true)}
                iconName="Map"
                iconPosition="left"
              >
                {language === 'ar' ? 'عرض الخريطة' : 'Map View'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
              >
                {language === 'ar' ? 'تصدير البيانات' : 'Export Data'}
              </Button>
            </div>
          </div>

          {/* Fleet Summary - Collapsible */}
          {showSummary && (
            <div className="animate-slide-down">
              <FleetSummaryCard />
            </div>
          )}

          {/* Filters and Controls */}
          <VehicleFilters
            onFiltersChange={handleFiltersChange}
            onAddVehicle={handleAddVehicle}
          />

          {/* Vehicle Table */}
          <VehicleTable
            filters={filters}
            onVehicleEdit={handleVehicleEdit}
            onVehicleView={handleVehicleView}
            onMaintenanceSchedule={handleMaintenanceSchedule}
          />

          {/* Quick Actions - Mobile Only */}
          <div className="lg:hidden fixed bottom-20 right-4 z-[800]">
            <div className="flex flex-col space-y-2">
              <Button
                variant="default"
                size="icon"
                onClick={handleAddVehicle}
                className="w-12 h-12 rounded-full shadow-lg"
              >
                <Icon name="Plus" size={20} />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLocationMapOpen(true)}
                className="w-12 h-12 rounded-full shadow-lg bg-background"
              >
                <Icon name="Map" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddVehicleModal
        isOpen={isAddVehicleModalOpen}
        onClose={() => setIsAddVehicleModalOpen(false)}
        onSave={handleSaveVehicle}
      />

      <LocationMapView
        isOpen={isLocationMapOpen}
        onClose={() => setIsLocationMapOpen(false)}
      />

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default FleetManagementScreen;