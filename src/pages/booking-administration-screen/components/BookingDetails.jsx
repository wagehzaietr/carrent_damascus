import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingDetails = ({ booking, onClose, onUpdate, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState(booking);
  const [activeTab, setActiveTab] = useState('details');

  const statusOptions = [
    { value: 'pending', label: language === 'ar' ? 'في الانتظار' : 'Pending' },
    { value: 'confirmed', label: language === 'ar' ? 'مؤكد' : 'Confirmed' },
    { value: 'active', label: language === 'ar' ? 'نشط' : 'Active' },
    { value: 'completed', label: language === 'ar' ? 'مكتمل' : 'Completed' },
    { value: 'cancelled', label: language === 'ar' ? 'ملغي' : 'Cancelled' }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2025-01-10',
      amount: '1,500 SYP',
      type: 'payment',
      method: 'Credit Card',
      status: 'completed',
      description: language === 'ar' ? 'دفعة مقدمة' : 'Advance Payment'
    },
    {
      id: 2,
      date: '2025-01-08',
      amount: '500 SYP',
      type: 'refund',
      method: 'Credit Card',
      status: 'pending',
      description: language === 'ar' ? 'استرداد جزئي' : 'Partial Refund'
    }
  ];

  const communicationHistory = [
    {
      id: 1,
      date: '2025-01-11 10:30',
      type: 'email',
      subject: language === 'ar' ? 'تأكيد الحجز' : 'Booking Confirmation',
      status: 'sent',
      recipient: booking?.customerEmail
    },
    {
      id: 2,
      date: '2025-01-10 14:15',
      type: 'sms',
      subject: language === 'ar' ? 'تذكير بالحجز' : 'Booking Reminder',
      status: 'delivered',
      recipient: booking?.customerPhone
    }
  ];

  const handleSave = () => {
    onUpdate(editedBooking);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBooking(booking);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  const isRTL = language === 'ar';

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 bg-card rounded-lg border border-border shadow-xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-surface">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {language === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'رقم الحجز:' : 'Booking ID:'} #{booking.id}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {!isEditing ? (
                <Button
                  variant="outline"
                  iconName="Edit"
                  onClick={() => setIsEditing(true)}
                >
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button
                    variant="default"
                    iconName="Save"
                    onClick={handleSave}
                  >
                    {language === 'ar' ? 'حفظ' : 'Save'}
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 rtl:space-x-reverse p-6 pb-0">
            {[
              { id: 'details', label: language === 'ar' ? 'التفاصيل' : 'Details', icon: 'Info' },
              { id: 'payment', label: language === 'ar' ? 'الدفع' : 'Payment', icon: 'CreditCard' },
              { id: 'communication', label: language === 'ar' ? 'التواصل' : 'Communication', icon: 'MessageSquare' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-surface rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {language === 'ar' ? 'معلومات العميل' : 'Customer Information'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'الاسم' : 'Name'}
                      </label>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {booking.customerName}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                      </label>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {booking.customerEmail}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                      </label>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {booking.customerPhone || '+963 11 123 4567'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </label>
                      <div className="mt-1">
                        {isEditing ? (
                          <Select
                            options={statusOptions}
                            value={editedBooking.status}
                            onChange={(value) => handleInputChange('status', value)}
                          />
                        ) : (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusLabel(booking.status)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="bg-surface rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {language === 'ar' ? 'معلومات المركبة' : 'Vehicle Information'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'اسم المركبة' : 'Vehicle Name'}
                      </label>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {booking.vehicleName}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'الموديل' : 'Model'}
                      </label>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {booking.vehicleModel}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'رقم اللوحة' : 'License Plate'}
                      </label>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {booking.licensePlate || 'ABC-123'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'اللون' : 'Color'}
                      </label>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {booking.vehicleColor || (language === 'ar' ? 'أبيض' : 'White')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-surface rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {language === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'تاريخ البداية' : 'Start Date'}
                      </label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editedBooking.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <div className="mt-1 text-sm text-muted-foreground">
                          {booking.startDate} {booking.startTime}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'تاريخ النهاية' : 'End Date'}
                      </label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editedBooking.endDate}
                          onChange={(e) => handleInputChange('endDate', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <div className="mt-1 text-sm text-muted-foreground">
                          {booking.endDate} {booking.endTime}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount'}
                      </label>
                      <div className="mt-1 text-lg font-semibold text-foreground">
                        {booking.totalAmount} {booking.currency}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {language === 'ar' ? 'مدة الإيجار' : 'Rental Duration'}
                      </label>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {booking.duration || (language === 'ar' ? '3 أيام' : '3 days')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {language === 'ar' ? 'سجل المدفوعات' : 'Payment History'}
                  </h3>
                  <div className="space-y-3">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            payment.type === 'payment' ? 'bg-success' : 'bg-warning'
                          }`}>
                            <Icon 
                              name={payment.type === 'payment' ? 'ArrowDown' : 'ArrowUp'} 
                              size={16} 
                              color="white" 
                            />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{payment.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {payment.date} • {payment.method}
                            </div>
                          </div>
                        </div>
                        <div className="text-right rtl:text-left">
                          <div className={`font-semibold ${
                            payment.type === 'payment' ? 'text-success' : 'text-warning'
                          }`}>
                            {payment.type === 'payment' ? '+' : '-'}{payment.amount}
                          </div>
                          <div className={`text-xs ${
                            payment.status === 'completed' ? 'text-success' : 'text-warning'
                          }`}>
                            {payment.status === 'completed' 
                              ? (language === 'ar' ? 'مكتمل' : 'Completed')
                              : (language === 'ar' ? 'في الانتظار' : 'Pending')
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" iconName="Plus">
                    {language === 'ar' ? 'إضافة دفعة' : 'Add Payment'}
                  </Button>
                  <Button variant="outline" iconName="RefreshCw">
                    {language === 'ar' ? 'استرداد' : 'Refund'}
                  </Button>
                </div>
              </div>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {language === 'ar' ? 'سجل التواصل' : 'Communication History'}
                  </h3>
                  <div className="space-y-3">
                    {communicationHistory.map((comm) => (
                      <div key={comm.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Icon 
                              name={comm.type === 'email' ? 'Mail' : 'MessageSquare'} 
                              size={16} 
                              color="white" 
                            />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{comm.subject}</div>
                            <div className="text-sm text-muted-foreground">
                              {comm.date} • {comm.recipient}
                            </div>
                          </div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          comm.status === 'sent' || comm.status === 'delivered' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                        }`}>
                          {comm.status === 'sent' 
                            ? (language === 'ar' ? 'مرسل' : 'Sent')
                            : comm.status === 'delivered'
                            ? (language === 'ar' ? 'تم التسليم' : 'Delivered')
                            : (language === 'ar' ? 'في الانتظار' : 'Pending')
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" iconName="Mail">
                    {language === 'ar' ? 'إرسال بريد' : 'Send Email'}
                  </Button>
                  <Button variant="outline" iconName="MessageSquare">
                    {language === 'ar' ? 'إرسال رسالة' : 'Send SMS'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;