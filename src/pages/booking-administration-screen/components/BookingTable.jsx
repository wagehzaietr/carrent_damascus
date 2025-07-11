import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const BookingTable = ({ bookings, onBookingAction, onViewDetails, language }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedBookings, setSelectedBookings] = useState([]);

  const statusOptions = [
    { value: 'all', label: language === 'ar' ? 'جميع الحالات' : 'All Status' },
    { value: 'pending', label: language === 'ar' ? 'في الانتظار' : 'Pending' },
    { value: 'confirmed', label: language === 'ar' ? 'مؤكد' : 'Confirmed' },
    { value: 'active', label: language === 'ar' ? 'نشط' : 'Active' },
    { value: 'completed', label: language === 'ar' ? 'مكتمل' : 'Completed' },
    { value: 'cancelled', label: language === 'ar' ? 'ملغي' : 'Cancelled' }
  ];

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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedBookings(bookings.map(booking => booking.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (bookingId, checked) => {
    if (checked) {
      setSelectedBookings([...selectedBookings, bookingId]);
    } else {
      setSelectedBookings(selectedBookings.filter(id => id !== bookingId));
    }
  };

  const sortedBookings = React.useMemo(() => {
    if (!sortConfig.key) return bookings;

    return [...bookings].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [bookings, sortConfig]);

  const isRTL = language === 'ar';

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Table Header */}
      <div className="p-4 border-b border-border bg-surface">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {language === 'ar' ? 'جدول الحجوزات' : 'Booking Table'}
          </h3>
          {selectedBookings.length > 0 && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm text-muted-foreground">
                {selectedBookings.length} {language === 'ar' ? 'محدد' : 'selected'}
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="Mail"
                onClick={() => onBookingAction('bulk-email', selectedBookings)}
              >
                {language === 'ar' ? 'إرسال بريد' : 'Send Email'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => onBookingAction('bulk-export', selectedBookings)}
              >
                {language === 'ar' ? 'تصدير' : 'Export'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedBookings.length === bookings.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="text-left rtl:text-right p-4 font-medium text-foreground cursor-pointer hover:bg-accent"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{language === 'ar' ? 'رقم الحجز' : 'Booking ID'}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 font-medium text-foreground cursor-pointer hover:bg-accent"
                onClick={() => handleSort('customerName')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{language === 'ar' ? 'اسم العميل' : 'Customer'}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left rtl:text-right p-4 font-medium text-foreground">
                {language === 'ar' ? 'المركبة' : 'Vehicle'}
              </th>
              <th 
                className="text-left rtl:text-right p-4 font-medium text-foreground cursor-pointer hover:bg-accent"
                onClick={() => handleSort('startDate')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{language === 'ar' ? 'تاريخ البداية' : 'Start Date'}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left rtl:text-right p-4 font-medium text-foreground cursor-pointer hover:bg-accent"
                onClick={() => handleSort('endDate')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{language === 'ar' ? 'تاريخ النهاية' : 'End Date'}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left rtl:text-right p-4 font-medium text-foreground">
                {language === 'ar' ? 'الحالة' : 'Status'}
              </th>
              <th 
                className="text-left rtl:text-right p-4 font-medium text-foreground cursor-pointer hover:bg-accent"
                onClick={() => handleSort('totalAmount')}
              >
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span>{language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-center p-4 font-medium text-foreground">
                {language === 'ar' ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((booking) => (
              <tr key={booking.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking.id)}
                    onChange={(e) => handleSelectBooking(booking.id, e.target.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-foreground">#{booking.id}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{booking.customerName}</div>
                      <div className="text-xs text-muted-foreground">{booking.customerEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                      <Icon name="Car" size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{booking.vehicleName}</div>
                      <div className="text-xs text-muted-foreground">{booking.vehicleModel}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{booking.startDate}</div>
                  <div className="text-xs text-muted-foreground">{booking.startTime}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{booking.endDate}</div>
                  <div className="text-xs text-muted-foreground">{booking.endTime}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusLabel(booking.status)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{booking.totalAmount}</div>
                  <div className="text-xs text-muted-foreground">{booking.currency}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(booking)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onBookingAction('edit', booking.id)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onBookingAction('message', booking.id)}
                      className="h-8 w-8"
                    >
                      <Icon name="MessageSquare" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? `عرض ${bookings.length} من إجمالي ${bookings.length} حجز`
              : `Showing ${bookings.length} of ${bookings.length} bookings`
            }
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
              {language === 'ar' ? 'السابق' : 'Previous'}
            </Button>
            <Button variant="outline" size="sm" disabled>
              {language === 'ar' ? 'التالي' : 'Next'}
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;