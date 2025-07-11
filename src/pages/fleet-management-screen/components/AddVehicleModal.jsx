import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddVehicleModal = ({ isOpen, onClose, onSave }) => {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    color: '',
    fuelType: '',
    transmission: '',
    location: '',
    mileage: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    features: [],
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const makeOptions = [
    { value: '', label: language === 'ar' ? 'اختر الماركة' : 'Select Make' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'honda', label: 'Honda' },
    { value: 'bmw', label: 'BMW' },
    { value: 'mercedes', label: 'Mercedes-Benz' },
    { value: 'hyundai', label: 'Hyundai' },
    { value: 'kia', label: 'Kia' },
    { value: 'nissan', label: 'Nissan' },
    { value: 'ford', label: 'Ford' }
  ];

  const colorOptions = [
    { value: '', label: language === 'ar' ? 'اختر اللون' : 'Select Color' },
    { value: 'white', label: language === 'ar' ? 'أبيض' : 'White' },
    { value: 'black', label: language === 'ar' ? 'أسود' : 'Black' },
    { value: 'silver', label: language === 'ar' ? 'فضي' : 'Silver' },
    { value: 'blue', label: language === 'ar' ? 'أزرق' : 'Blue' },
    { value: 'red', label: language === 'ar' ? 'أحمر' : 'Red' },
    { value: 'gray', label: language === 'ar' ? 'رمادي' : 'Gray' }
  ];

  const fuelTypeOptions = [
    { value: '', label: language === 'ar' ? 'نوع الوقود' : 'Select Fuel Type' },
    { value: 'gasoline', label: language === 'ar' ? 'بنزين' : 'Gasoline' },
    { value: 'diesel', label: language === 'ar' ? 'ديزل' : 'Diesel' },
    { value: 'hybrid', label: language === 'ar' ? 'هجين' : 'Hybrid' },
    { value: 'electric', label: language === 'ar' ? 'كهربائي' : 'Electric' }
  ];

  const transmissionOptions = [
    { value: '', label: language === 'ar' ? 'نوع ناقل الحركة' : 'Select Transmission' },
    { value: 'manual', label: language === 'ar' ? 'يدوي' : 'Manual' },
    { value: 'automatic', label: language === 'ar' ? 'أوتوماتيكي' : 'Automatic' }
  ];

  const locationOptions = [
    { value: '', label: language === 'ar' ? 'اختر الموقع' : 'Select Location' },
    { value: 'damascus-center', label: language === 'ar' ? 'وسط دمشق' : 'Damascus Center' },
    { value: 'mazzeh', label: language === 'ar' ? 'المزة' : 'Mazzeh' },
    { value: 'abu-rummaneh', label: language === 'ar' ? 'أبو رمانة' : 'Abu Rummaneh' },
    { value: 'malki', label: language === 'ar' ? 'المالكي' : 'Malki' },
    { value: 'qassaa', label: language === 'ar' ? 'القصاع' : 'Qassaa' }
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: '', label: language === 'ar' ? 'اختر السنة' : 'Select Year' },
    ...Array.from({ length: 20 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    })
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.make) newErrors.make = language === 'ar' ? 'الماركة مطلوبة' : 'Make is required';
    if (!formData.model) newErrors.model = language === 'ar' ? 'الموديل مطلوب' : 'Model is required';
    if (!formData.year) newErrors.year = language === 'ar' ? 'السنة مطلوبة' : 'Year is required';
    if (!formData.licensePlate) newErrors.licensePlate = language === 'ar' ? 'رقم اللوحة مطلوب' : 'License plate is required';
    if (!formData.color) newErrors.color = language === 'ar' ? 'اللون مطلوب' : 'Color is required';
    if (!formData.fuelType) newErrors.fuelType = language === 'ar' ? 'نوع الوقود مطلوب' : 'Fuel type is required';
    if (!formData.transmission) newErrors.transmission = language === 'ar' ? 'ناقل الحركة مطلوب' : 'Transmission is required';
    if (!formData.location) newErrors.location = language === 'ar' ? 'الموقع مطلوب' : 'Location is required';
    if (!formData.mileage) newErrors.mileage = language === 'ar' ? 'المسافة المقطوعة مطلوبة' : 'Mileage is required';
    if (!formData.dailyRate) newErrors.dailyRate = language === 'ar' ? 'السعر اليومي مطلوب' : 'Daily rate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      onClose();
      
      // Reset form
      setFormData({
        make: '',
        model: '',
        year: '',
        licensePlate: '',
        color: '',
        fuelType: '',
        transmission: '',
        location: '',
        mileage: '',
        dailyRate: '',
        weeklyRate: '',
        monthlyRate: '',
        features: [],
        description: ''
      });
    } catch (error) {
      console.error('Error saving vehicle:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-card border border-border rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {language === 'ar' ? 'إضافة مركبة جديدة' : 'Add New Vehicle'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">
                {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Select
                  label={language === 'ar' ? 'الماركة' : 'Make'}
                  options={makeOptions}
                  value={formData.make}
                  onChange={(value) => handleInputChange('make', value)}
                  error={errors.make}
                  required
                />

                <Input
                  label={language === 'ar' ? 'الموديل' : 'Model'}
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل الموديل' : 'Enter model'}
                  error={errors.model}
                  required
                />

                <Select
                  label={language === 'ar' ? 'السنة' : 'Year'}
                  options={yearOptions}
                  value={formData.year}
                  onChange={(value) => handleInputChange('year', value)}
                  error={errors.year}
                  required
                />

                <Input
                  label={language === 'ar' ? 'رقم اللوحة' : 'License Plate'}
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                  placeholder={language === 'ar' ? 'دمشق 123456' : 'Damascus 123456'}
                  error={errors.licensePlate}
                  required
                />

                <Select
                  label={language === 'ar' ? 'اللون' : 'Color'}
                  options={colorOptions}
                  value={formData.color}
                  onChange={(value) => handleInputChange('color', value)}
                  error={errors.color}
                  required
                />

                <Select
                  label={language === 'ar' ? 'نوع الوقود' : 'Fuel Type'}
                  options={fuelTypeOptions}
                  value={formData.fuelType}
                  onChange={(value) => handleInputChange('fuelType', value)}
                  error={errors.fuelType}
                  required
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">
                {language === 'ar' ? 'المواصفات التقنية' : 'Technical Specifications'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Select
                  label={language === 'ar' ? 'ناقل الحركة' : 'Transmission'}
                  options={transmissionOptions}
                  value={formData.transmission}
                  onChange={(value) => handleInputChange('transmission', value)}
                  error={errors.transmission}
                  required
                />

                <Select
                  label={language === 'ar' ? 'الموقع' : 'Location'}
                  options={locationOptions}
                  value={formData.location}
                  onChange={(value) => handleInputChange('location', value)}
                  error={errors.location}
                  required
                />

                <Input
                  label={language === 'ar' ? 'المسافة المقطوعة (كم)' : 'Mileage (km)'}
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange('mileage', e.target.value)}
                  placeholder="0"
                  error={errors.mileage}
                  required
                />
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">
                {language === 'ar' ? 'التسعير' : 'Pricing'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label={language === 'ar' ? 'السعر اليومي (ل.س)' : 'Daily Rate (SYP)'}
                  type="number"
                  value={formData.dailyRate}
                  onChange={(e) => handleInputChange('dailyRate', e.target.value)}
                  placeholder="0"
                  error={errors.dailyRate}
                  required
                />

                <Input
                  label={language === 'ar' ? 'السعر الأسبوعي (ل.س)' : 'Weekly Rate (SYP)'}
                  type="number"
                  value={formData.weeklyRate}
                  onChange={(e) => handleInputChange('weeklyRate', e.target.value)}
                  placeholder="0"
                />

                <Input
                  label={language === 'ar' ? 'السعر الشهري (ل.س)' : 'Monthly Rate (SYP)'}
                  type="number"
                  value={formData.monthlyRate}
                  onChange={(e) => handleInputChange('monthlyRate', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">
                {language === 'ar' ? 'وصف إضافي' : 'Additional Description'}
              </h3>
              <textarea
                className="w-full h-24 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder={language === 'ar' ? 'أدخل وصف المركبة...' : 'Enter vehicle description...'}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse p-6 border-t border-border bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Plus"
              iconPosition="left"
            >
              {language === 'ar' ? 'إضافة المركبة' : 'Add Vehicle'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;