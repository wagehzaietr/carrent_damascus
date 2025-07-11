import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingForm = ({ onBookingSubmit, selectedDates, totalCost }) => {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    pickupLocation: '',
    returnLocation: '',
    pickupTime: '10:00',
    returnTime: '10:00',
    driverAge: '',
    licenseNumber: '',
    contactPhone: '',
    email: '',
    specialRequests: '',
    additionalServices: {
      gps: false,
      childSeat: false,
      additionalDriver: false,
      insurance: false,
      wifi: false
    },
    termsAccepted: false,
    newsletterSubscribe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const additionalServices = [
    {
      id: 'gps',
      label: language === 'ar' ? 'جهاز GPS' : 'GPS Navigation',
      price: 5000,
      description: language === 'ar' ? 'نظام ملاحة متقدم' : 'Advanced navigation system'
    },
    {
      id: 'childSeat',
      label: language === 'ar' ? 'مقعد أطفال' : 'Child Seat',
      price: 3000,
      description: language === 'ar' ? 'مقعد أمان للأطفال' : 'Safety seat for children'
    },
    {
      id: 'additionalDriver',
      label: language === 'ar' ? 'سائق إضافي' : 'Additional Driver',
      price: 8000,
      description: language === 'ar' ? 'إضافة سائق آخر للحجز' : 'Add another driver to booking'
    },
    {
      id: 'insurance',
      label: language === 'ar' ? 'تأمين إضافي' : 'Extra Insurance',
      price: 12000,
      description: language === 'ar' ? 'تغطية تأمينية شاملة' : 'Comprehensive insurance coverage'
    },
    {
      id: 'wifi',
      label: language === 'ar' ? 'واي فاي محمول' : 'Portable WiFi',
      price: 4000,
      description: language === 'ar' ? 'إنترنت محمول في السيارة' : 'Mobile internet in car'
    }
  ];

  const pickupLocations = [
    { value: 'damascus-airport', label: language === 'ar' ? 'مطار دمشق الدولي' : 'Damascus International Airport' },
    { value: 'old-city', label: language === 'ar' ? 'البلدة القديمة' : 'Old City Damascus' },
    { value: 'mazzeh', label: language === 'ar' ? 'المزة' : 'Mazzeh District' },
    { value: 'abu-rummaneh', label: language === 'ar' ? 'أبو رمانة' : 'Abu Rummaneh' },
    { value: 'malki', label: language === 'ar' ? 'المالكي' : 'Malki' },
    { value: 'shaalan', label: language === 'ar' ? 'الشعلان' : 'Shaalan' }
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

  const handleServiceChange = (serviceId, checked) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: {
        ...prev.additionalServices,
        [serviceId]: checked
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pickupLocation) {
      newErrors.pickupLocation = language === 'ar' ? 'يرجى اختيار موقع الاستلام' : 'Please select pickup location';
    }

    if (!formData.returnLocation) {
      newErrors.returnLocation = language === 'ar' ? 'يرجى اختيار موقع الإرجاع' : 'Please select return location';
    }

    if (!formData.driverAge || formData.driverAge < 21) {
      newErrors.driverAge = language === 'ar' ? 'يجب أن يكون عمر السائق 21 سنة على الأقل' : 'Driver must be at least 21 years old';
    }

    if (!formData.licenseNumber) {
      newErrors.licenseNumber = language === 'ar' ? 'رقم رخصة القيادة مطلوب' : 'License number is required';
    }

    if (!formData.contactPhone) {
      newErrors.contactPhone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    }

    if (!formData.email) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = language === 'ar' ? 'يجب الموافقة على الشروط والأحكام' : 'You must accept terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAdditionalServicesCost = () => {
    return additionalServices.reduce((total, service) => {
      return total + (formData.additionalServices[service.id] ? service.price : 0);
    }, 0);
  };

  const formatCurrency = (amount) => {
    return language === 'ar' 
      ? `${amount.toLocaleString('ar-SY')} ل.س`
      : `${amount.toLocaleString('en-US')} SYP`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        ...formData,
        selectedDates,
        totalCost: totalCost + calculateAdditionalServicesCost(),
        additionalServicesCost: calculateAdditionalServicesCost()
      };
      
      await onBookingSubmit(bookingData);
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-foreground mb-6 font-heading">
        {language === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pickup & Return Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === 'ar' ? 'موقع الاستلام' : 'Pickup Location'}
            </label>
            <select
              value={formData.pickupLocation}
              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">
                {language === 'ar' ? 'اختر الموقع' : 'Select location'}
              </option>
              {pickupLocations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
            {errors.pickupLocation && (
              <p className="text-error text-sm mt-1">{errors.pickupLocation}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === 'ar' ? 'موقع الإرجاع' : 'Return Location'}
            </label>
            <select
              value={formData.returnLocation}
              onChange={(e) => handleInputChange('returnLocation', e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">
                {language === 'ar' ? 'اختر الموقع' : 'Select location'}
              </option>
              {pickupLocations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
            {errors.returnLocation && (
              <p className="text-error text-sm mt-1">{errors.returnLocation}</p>
            )}
          </div>
        </div>

        {/* Pickup & Return Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="time"
            label={language === 'ar' ? 'وقت الاستلام' : 'Pickup Time'}
            value={formData.pickupTime}
            onChange={(e) => handleInputChange('pickupTime', e.target.value)}
          />
          <Input
            type="time"
            label={language === 'ar' ? 'وقت الإرجاع' : 'Return Time'}
            value={formData.returnTime}
            onChange={(e) => handleInputChange('returnTime', e.target.value)}
          />
        </div>

        {/* Driver Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label={language === 'ar' ? 'عمر السائق' : 'Driver Age'}
            placeholder={language === 'ar' ? 'أدخل العمر' : 'Enter age'}
            value={formData.driverAge}
            onChange={(e) => handleInputChange('driverAge', e.target.value)}
            error={errors.driverAge}
            min="18"
            max="80"
          />
          <Input
            type="text"
            label={language === 'ar' ? 'رقم رخصة القيادة' : 'License Number'}
            placeholder={language === 'ar' ? 'أدخل رقم الرخصة' : 'Enter license number'}
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
            error={errors.licenseNumber}
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="tel"
            label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
            placeholder={language === 'ar' ? '+963 XXX XXX XXX' : '+963 XXX XXX XXX'}
            value={formData.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
            error={errors.contactPhone}
          />
          <Input
            type="email"
            label={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
          />
        </div>

        {/* Additional Services */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">
            {language === 'ar' ? 'خدمات إضافية' : 'Additional Services'}
          </h4>
          {additionalServices.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Checkbox
                  checked={formData.additionalServices[service.id]}
                  onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                />
                <div>
                  <p className="font-medium text-foreground">{service.label}</p>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
              <span className="font-semibold text-primary">
                {formatCurrency(service.price)}
              </span>
            </div>
          ))}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'ar' ? 'طلبات خاصة' : 'Special Requests'}
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            placeholder={language === 'ar' ? 'أي طلبات أو ملاحظات خاصة...' : 'Any special requests or notes...'}
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="3"
          />
        </div>

        {/* Terms and Newsletter */}
        <div className="space-y-3">
          <Checkbox
            checked={formData.termsAccepted}
            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
            label={
              <span className="text-sm">
                {language === 'ar' ? 'أوافق على ' : 'I agree to the '}
                <a href="#" className="text-primary hover:underline">
                  {language === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions'}
                </a>
                {language === 'ar' ? ' و' : ' and '}
                <a href="#" className="text-primary hover:underline">
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </a>
              </span>
            }
            error={errors.termsAccepted}
          />
          
          <Checkbox
            checked={formData.newsletterSubscribe}
            onChange={(e) => handleInputChange('newsletterSubscribe', e.target.checked)}
            label={language === 'ar' ? 'أرغب في تلقي العروض والأخبار' : 'I want to receive offers and news'}
          />
        </div>

        {/* Cost Summary */}
        <div className="bg-surface p-4 rounded-lg border border-border">
          <h4 className="font-semibold text-foreground mb-3">
            {language === 'ar' ? 'ملخص التكلفة' : 'Cost Summary'}
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {language === 'ar' ? 'تكلفة الإيجار' : 'Rental Cost'}
              </span>
              <span className="font-medium">{formatCurrency(totalCost)}</span>
            </div>
            {calculateAdditionalServicesCost() > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {language === 'ar' ? 'الخدمات الإضافية' : 'Additional Services'}
                </span>
                <span className="font-medium">{formatCurrency(calculateAdditionalServicesCost())}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between font-semibold text-lg">
              <span>{language === 'ar' ? 'المجموع الكلي' : 'Total Amount'}</span>
              <span className="text-primary">{formatCurrency(totalCost + calculateAdditionalServicesCost())}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={!formData.termsAccepted}
          iconName="CreditCard"
          iconPosition="left"
        >
          {language === 'ar' ? 'احجز الآن' : 'Book Now'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {language === 'ar' ?'سيتم توجيهك إلى صفحة الدفع الآمنة' :'You will be redirected to secure payment page'
          }
        </p>
      </form>
    </div>
  );
};

export default BookingForm;