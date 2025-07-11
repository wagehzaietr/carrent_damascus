import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';

const VehicleTable = ({ filters, onVehicleEdit, onVehicleView, onMaintenanceSchedule }) => {
  const [language, setLanguage] = useState('en');
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const vehicleData = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      licensePlate: "دمشق 123456",
      status: "available",
      location: "Damascus Center",
      mileage: 15420,
      lastMaintenance: "2024-06-15",
      nextMaintenance: "2024-08-15",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      color: "White",
      fuelType: "Gasoline",
      transmission: "Automatic"
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2022,
      licensePlate: "دمشق 789012",
      status: "rented",
      location: "Mazzeh",
      mileage: 28750,
      lastMaintenance: "2024-05-20",
      nextMaintenance: "2024-07-20",
      image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg",
      color: "Blue",
      fuelType: "Gasoline",
      transmission: "Manual"
    },
    {
      id: 3,
      make: "BMW",
      model: "X5",
      year: 2023,
      licensePlate: "دمشق 345678",
      status: "maintenance",
      location: "Abu Rummaneh",
      mileage: 12300,
      lastMaintenance: "2024-07-01",
      nextMaintenance: "2024-09-01",
      image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
      color: "Black",
      fuelType: "Gasoline",
      transmission: "Automatic"
    },
    {
      id: 4,
      make: "Mercedes",
      model: "C-Class",
      year: 2022,
      licensePlate: "دمشق 901234",
      status: "available",
      location: "Malki",
      mileage: 22100,
      lastMaintenance: "2024-04-10",
      nextMaintenance: "2024-06-10",
      image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      color: "Silver",
      fuelType: "Gasoline",
      transmission: "Automatic"
    },
    {
      id: 5,
      make: "Hyundai",
      model: "Elantra",
      year: 2023,
      licensePlate: "دمشق 567890",
      status: "out-of-service",
      location: "Qassaa",
      mileage: 8900,
      lastMaintenance: "2024-06-25",
      nextMaintenance: "2024-08-25",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      color: "Red",
      fuelType: "Gasoline",
      transmission: "Automatic"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rented':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'out-of-service':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return language === 'ar' ? 'متاح' : 'Available';
      case 'rented':
        return language === 'ar' ? 'مؤجر' : 'Rented';
      case 'maintenance':
        return language === 'ar' ? 'في الصيانة' : 'Maintenance';
      case 'out-of-service':
        return language === 'ar' ? 'خارج الخدمة' : 'Out of Service';
      default:
        return status;
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedVehicles(vehicleData.map(vehicle => vehicle.id));
    } else {
      setSelectedVehicles([]);
    }
  };

  const handleSelectVehicle = (vehicleId, checked) => {
    if (checked) {
      setSelectedVehicles([...selectedVehicles, vehicleId]);
    } else {
      setSelectedVehicles(selectedVehicles.filter(id => id !== vehicleId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for vehicles:`, selectedVehicles);
    setShowBulkActions(false);
    setSelectedVehicles([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SY' : 'en-US');
  };

  const isMaintenanceOverdue = (nextMaintenanceDate) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenanceDate);
    return maintenanceDate < today;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedVehicles.length > 0 && (
        <div className="bg-primary/10 border-b border-border p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {language === 'ar' ? 
              `${selectedVehicles.length} مركبة محددة` :
              `${selectedVehicles.length} vehicles selected`
            }
          </span>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('status-change')}
              iconName="Edit"
              iconPosition="left"
            >
              {language === 'ar' ? 'تغيير الحالة' : 'Change Status'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('location-transfer')}
              iconName="MapPin"
              iconPosition="left"
            >
              {language === 'ar' ? 'نقل الموقع' : 'Transfer Location'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('maintenance-schedule')}
              iconName="Wrench"
              iconPosition="left"
            >
              {language === 'ar' ? 'جدولة الصيانة' : 'Schedule Maintenance'}
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedVehicles.length === vehicleData.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left rtl:text-right p-4 text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'المركبة' : 'Vehicle'}
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('licensePlate')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{language === 'ar' ? 'رقم اللوحة' : 'License Plate'}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{language === 'ar' ? 'الحالة' : 'Status'}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left rtl:text-right p-4 text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'الموقع' : 'Location'}
              </th>
              <th 
                className="text-left rtl:text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('mileage')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{language === 'ar' ? 'المسافة المقطوعة' : 'Mileage'}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left rtl:text-right p-4 text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'الصيانة القادمة' : 'Next Maintenance'}
              </th>
              <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                {language === 'ar' ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                <td className="p-4">
                  <Checkbox
                    checked={selectedVehicles.includes(vehicle.id)}
                    onChange={(e) => handleSelectVehicle(vehicle.id, e.target.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={vehicle.image}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {vehicle.make} {vehicle.model}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle.year} • {vehicle.color}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-foreground">
                    {vehicle.licensePlate}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {getStatusText(vehicle.status)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {language === 'ar' ? 
                        (vehicle.location === 'Damascus Center' ? 'وسط دمشق' :
                         vehicle.location === 'Mazzeh' ? 'المزة' :
                         vehicle.location === 'Abu Rummaneh' ? 'أبو رمانة' :
                         vehicle.location === 'Malki' ? 'المالكي' :
                         vehicle.location === 'Qassaa' ? 'القصاع' : vehicle.location) :
                        vehicle.location
                      }
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {vehicle.mileage.toLocaleString()} {language === 'ar' ? 'كم' : 'km'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {isMaintenanceOverdue(vehicle.nextMaintenance) && (
                      <Icon name="AlertTriangle" size={14} className="text-warning" />
                    )}
                    <span className={`text-sm ${isMaintenanceOverdue(vehicle.nextMaintenance) ? 'text-warning font-medium' : 'text-foreground'}`}>
                      {formatDate(vehicle.nextMaintenance)}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onVehicleView(vehicle.id)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onVehicleEdit(vehicle.id)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMaintenanceSchedule(vehicle.id)}
                      className="h-8 w-8"
                    >
                      <Icon name="Wrench" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {vehicleData.map((vehicle) => (
          <div key={vehicle.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3 rtl:space-x-reverse mb-3">
              <Checkbox
                checked={selectedVehicles.includes(vehicle.id)}
                onChange={(e) => handleSelectVehicle(vehicle.id, e.target.checked)}
              />
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {getStatusText(vehicle.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {vehicle.year} • {vehicle.color} • {vehicle.licensePlate}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="MapPin" size={12} />
                    <span>
                      {language === 'ar' ? 
                        (vehicle.location === 'Damascus Center' ? 'وسط دمشق' :
                         vehicle.location === 'Mazzeh' ? 'المزة' :
                         vehicle.location === 'Abu Rummaneh' ? 'أبو رمانة' :
                         vehicle.location === 'Malki' ? 'المالكي' :
                         vehicle.location === 'Qassaa' ? 'القصاع' : vehicle.location) :
                        vehicle.location
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="Gauge" size={12} />
                    <span>{vehicle.mileage.toLocaleString()} {language === 'ar' ? 'كم' : 'km'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs">
                {isMaintenanceOverdue(vehicle.nextMaintenance) && (
                  <Icon name="AlertTriangle" size={12} className="text-warning" />
                )}
                <span className={`${isMaintenanceOverdue(vehicle.nextMaintenance) ? 'text-warning' : 'text-muted-foreground'}`}>
                  {language === 'ar' ? 'الصيانة القادمة: ' : 'Next maintenance: '}
                  {formatDate(vehicle.nextMaintenance)}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onVehicleView(vehicle.id)}
                  className="h-8 w-8"
                >
                  <Icon name="Eye" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onVehicleEdit(vehicle.id)}
                  className="h-8 w-8"
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMaintenanceSchedule(vehicle.id)}
                  className="h-8 w-8"
                >
                  <Icon name="Wrench" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleTable;