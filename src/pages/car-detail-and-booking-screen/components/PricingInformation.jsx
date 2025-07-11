import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PricingInformation = ({ pricing, selectedDuration, onDurationChange }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const pricingOptions = [
    {
      id: 'daily',
      label: language === 'ar' ? 'يومي' : 'Daily',
      price: pricing.daily,
      unit: language === 'ar' ? 'يوم' : 'day',
      popular: false
    },
    {
      id: 'weekly',
      label: language === 'ar' ? 'أسبوعي' : 'Weekly',
      price: pricing.weekly,
      unit: language === 'ar' ? 'أسبوع' : 'week',
      popular: true,
      discount: '15%'
    },
    {
      id: 'monthly',
      label: language === 'ar' ? 'شهري' : 'Monthly',
      price: pricing.monthly,
      unit: language === 'ar' ? 'شهر' : 'month',
      popular: false,
      discount: '25%'
    }
  ];

  const fees = [
    {
      label: language === 'ar' ? 'رسوم التسليم' : 'Delivery Fee',
      amount: pricing.fees.delivery,
      description: language === 'ar' ? 'توصيل المركبة للموقع المحدد' : 'Vehicle delivery to specified location'
    },
    {
      label: language === 'ar' ? 'رسوم التأمين' : 'Insurance Fee',
      amount: pricing.fees.insurance,
      description: language === 'ar' ? 'تأمين شامل ضد الأضرار' : 'Comprehensive damage insurance'
    },
    {
      label: language === 'ar' ? 'الضرائب' : 'Taxes',
      amount: pricing.fees.taxes,
      description: language === 'ar' ? 'ضريبة القيمة المضافة' : 'Value Added Tax (VAT)'
    }
  ];

  const formatCurrency = (amount) => {
    return language === 'ar' 
      ? `${amount.toLocaleString('ar-SY')} ل.س`
      : `${amount.toLocaleString('en-US')} SYP`;
  };

  const calculateTotal = () => {
    const selectedOption = pricingOptions.find(option => option.id === selectedDuration);
    const basePrice = selectedOption ? selectedOption.price : pricing.daily;
    const totalFees = Object.values(pricing.fees).reduce((sum, fee) => sum + fee, 0);
    return basePrice + totalFees;
  };

  return (
    <div className="space-y-6">
      {/* Pricing Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">
          {language === 'ar' ? 'خيارات التسعير' : 'Pricing Options'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => onDurationChange(option.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedDuration === option.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 bg-surface'
              }`}
            >
              {option.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                  </span>
                </div>
              )}
              
              {option.discount && (
                <div className="absolute -top-2 right-2">
                  <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
                    -{option.discount}
                  </span>
                </div>
              )}

              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-2">{option.label}</h4>
                <div className="text-2xl font-bold text-primary mb-1">
                  {formatCurrency(option.price)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'لكل' : 'per'} {option.unit}
                </p>
              </div>

              {selectedDuration === option.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">
          {language === 'ar' ? 'تفصيل الرسوم' : 'Fee Breakdown'}
        </h3>
        
        <div className="space-y-3">
          {fees.map((fee, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="font-medium text-foreground">{fee.label}</span>
                  <div className="group relative">
                    <Icon name="Info" size={14} className="text-muted-foreground cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-md">
                      {fee.description}
                    </div>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-foreground">
                {formatCurrency(fee.amount)}
              </span>
            </div>
          ))}
        </div>

        {/* Total Calculation */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              {language === 'ar' ? 'المجموع الكلي' : 'Total Amount'}
            </span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(calculateTotal())}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {language === 'ar' ?'شامل جميع الرسوم والضرائب' :'Including all fees and taxes'
            }
          </p>
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Gift" size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">
              {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ?'احجز لأكثر من 7 أيام واحصل على خصم 10% إضافي + توصيل مجاني' :'Book for more than 7 days and get an additional 10% discount + free delivery'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInformation;