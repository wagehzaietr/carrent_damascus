import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const BookingStatistics = ({ language }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [activeTab, setActiveTab] = useState('overview');

  const dailyRevenueData = [
    { date: '2025-01-05', revenue: 2400, bookings: 8 },
    { date: '2025-01-06', revenue: 3200, bookings: 12 },
    { date: '2025-01-07', revenue: 2800, bookings: 10 },
    { date: '2025-01-08', revenue: 4100, bookings: 15 },
    { date: '2025-01-09', revenue: 3600, bookings: 13 },
    { date: '2025-01-10', revenue: 4500, bookings: 16 },
    { date: '2025-01-11', revenue: 3900, bookings: 14 }
  ];

  const vehicleCategoryData = [
    { name: language === 'ar' ? 'سيدان' : 'Sedan', value: 45, color: '#3B82F6' },
    { name: language === 'ar' ? 'دفع رباعي' : 'SUV', value: 30, color: '#10B981' },
    { name: language === 'ar' ? 'هاتشباك' : 'Hatchback', value: 15, color: '#F59E0B' },
    { name: language === 'ar' ? 'فاخرة' : 'Luxury', value: 10, color: '#EF4444' }
  ];

  const statusDistribution = [
    { status: language === 'ar' ? 'مؤكد' : 'Confirmed', count: 45, percentage: 60 },
    { status: language === 'ar' ? 'في الانتظار' : 'Pending', count: 15, percentage: 20 },
    { status: language === 'ar' ? 'نشط' : 'Active', count: 10, percentage: 13 },
    { status: language === 'ar' ? 'مكتمل' : 'Completed', count: 3, percentage: 4 },
    { status: language === 'ar' ? 'ملغي' : 'Cancelled', count: 2, percentage: 3 }
  ];

  const kpiData = [
    {
      title: language === 'ar' ? 'إجمالي الإيرادات اليوم' : 'Today\'s Revenue',
      value: '4,500 SYP',
      change: '+12%',
      changeType: 'positive',
      icon: 'DollarSign'
    },
    {
      title: language === 'ar' ? 'الحجوزات الجديدة' : 'New Bookings',
      value: '16',
      change: '+8%',
      changeType: 'positive',
      icon: 'Calendar'
    },
    {
      title: language === 'ar' ? 'معدل الإلغاء' : 'Cancellation Rate',
      value: '3%',
      change: '-2%',
      changeType: 'positive',
      icon: 'XCircle'
    },
    {
      title: language === 'ar' ? 'متوسط قيمة الحجز' : 'Average Booking Value',
      value: '281 SYP',
      change: '+5%',
      changeType: 'positive',
      icon: 'TrendingUp'
    }
  ];

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-success' : 'text-destructive';
  };

  const isRTL = language === 'ar';

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'ar' ? 'إحصائيات الحجوزات' : 'Booking Statistics'}
        </h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
          >
            <option value="today">{language === 'ar' ? 'اليوم' : 'Today'}</option>
            <option value="week">{language === 'ar' ? 'هذا الأسبوع' : 'This Week'}</option>
            <option value="month">{language === 'ar' ? 'هذا الشهر' : 'This Month'}</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 rtl:space-x-reverse mb-6 bg-surface rounded-lg p-1">
        {[
          { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview' },
          { id: 'revenue', label: language === 'ar' ? 'الإيرادات' : 'Revenue' },
          { id: 'vehicles', label: language === 'ar' ? 'المركبات' : 'Vehicles' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-surface rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name={kpi.icon} size={16} color="white" />
                  </div>
                  <span className={`text-sm font-medium ${getChangeColor(kpi.changeType)}`}>
                    {kpi.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.title}</div>
              </div>
            ))}
          </div>

          {/* Status Distribution */}
          <div className="bg-surface rounded-lg p-4 border border-border">
            <h4 className="text-md font-semibold text-foreground mb-4">
              {language === 'ar' ? 'توزيع حالات الحجز' : 'Booking Status Distribution'}
            </h4>
            <div className="space-y-3">
              {statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm text-foreground">{item.status}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-medium text-foreground">{item.count}</span>
                    <span className="text-xs text-muted-foreground">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg p-4 border border-border">
            <h4 className="text-md font-semibold text-foreground mb-4">
              {language === 'ar' ? 'الإيرادات اليومية' : 'Daily Revenue'}
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-popover)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-4 border border-border">
            <h4 className="text-md font-semibold text-foreground mb-4">
              {language === 'ar' ? 'اتجاه الحجوزات' : 'Booking Trend'}
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-popover)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="var(--color-success)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Tab */}
      {activeTab === 'vehicles' && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg p-4 border border-border">
            <h4 className="text-md font-semibold text-foreground mb-4">
              {language === 'ar' ? 'الفئات الشائعة' : 'Popular Categories'}
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vehicleCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-popover)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {vehicleCategoryData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingStatistics;