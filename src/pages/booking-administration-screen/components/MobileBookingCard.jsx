import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileBookingCard = ({ booking, onAction, onViewDetails, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning text-warning-foreground',
      confirmed: 'bg-primary text-primary-foreground',
      active: 'bg-success text-success-foreground',
      completed: 'bg-accent text-accent-foreground',
      cancelled: 'bg-destructive text-destructive-foreground'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: language === 'ar' ? 'في الانتظار' : 'Pending',
      confirmed: language === 'ar' ? 'مؤكد' : 'Confirmed',
      active: language === 'ar' ? 'نشط' : 'Active',
      completed: language === 'ar' ? 'مكتمل' : 'Completed',
      cancelled: language === 'ar' ? 'ملغي' : 'Cancelled'
    };
    return labels[status] || status;
  };

  const handleSwipeAction = (action) => {
    setSwipeDirection(action);
    setTimeout(() => {
      onAction(action, booking.id);
      setSwipeDirection(null);
    }, 200);
  };

  const isRTL = language === 'ar';

  return (
    <div className={`bg-card rounded-lg border border-border mb-4 overflow-hidden transition-all duration-200 ${
      swipeDirection ? 'transform scale-95 opacity-75' : ''
    }`}>
      {/* Card Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{booking.customerName}</h4>
              <p className="text-sm text-muted-foreground">#{booking.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
              {getStatusLabel(booking.status)}
            </span>
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-muted-foreground"
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ? 'المركبة' : 'Vehicle'}
            </p>
            <p className="text-sm font-medium text-foreground">{booking.vehicleName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ? 'المبلغ' : 'Amount'}
            </p>
            <p className="text-sm font-medium text-foreground">{booking.totalAmount}</p>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border bg-surface">
          <div className="p-4 space-y-4">
            {/* Detailed Information */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </span>
                <span className="text-sm text-foreground">{booking.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'تاريخ البداية' : 'Start Date'}
                </span>
                <span className="text-sm text-foreground">{booking.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'تاريخ النهاية' : 'End Date'}
                </span>
                <span className="text-sm text-foreground">{booking.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'الموديل' : 'Model'}
                </span>
                <span className="text-sm text-foreground">{booking.vehicleModel}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 rtl:space-x-reverse pt-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                onClick={() => onViewDetails(booking)}
                className="flex-1"
              >
                {language === 'ar' ? 'عرض' : 'View'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={() => onAction('edit', booking.id)}
                className="flex-1"
              >
                {language === 'ar' ? 'تعديل' : 'Edit'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                onClick={() => onAction('message', booking.id)}
                className="flex-1"
              >
                {language === 'ar' ? 'رسالة' : 'Message'}
              </Button>
            </div>
          </div>

          {/* Swipe Actions */}
          <div className="px-4 pb-4">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => handleSwipeAction('confirm')}
                className="flex-1 bg-success text-success-foreground py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-success/90"
                disabled={booking.status === 'confirmed'}
              >
                <Icon name="Check" size={16} className="inline mr-1 rtl:ml-1" />
                {language === 'ar' ? 'تأكيد' : 'Confirm'}
              </button>
              <button
                onClick={() => handleSwipeAction('cancel')}
                className="flex-1 bg-destructive text-destructive-foreground py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-destructive/90"
                disabled={booking.status === 'cancelled'}
              >
                <Icon name="X" size={16} className="inline mr-1 rtl:ml-1" />
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Status Indicator */}
      <div className={`h-1 ${getStatusColor(booking.status).split(' ')[0]}`}></div>
    </div>
  );
};

export default MobileBookingCard;