import React, { useState, useEffect } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import CustomerNavigation from '../../components/ui/CustomerNavigation';
import WelcomeSection from './components/WelcomeSection';
import CurrentBookingCard from './components/CurrentBookingCard';
import QuickActionCards from './components/QuickActionCards';
import RecentActivityFeed from './components/RecentActivityFeed';
import PromotionalBanners from './components/PromotionalBanners';
import SummaryStatistics from './components/SummaryStatistics';
import AccountSidebar from './components/AccountSidebar';

const CustomerDashboard = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // Set page title
    document.title = language === 'ar' ?'لوحة تحكم العميل - كار رنت دمشق' :'Customer Dashboard - CarRent Damascus';
  }, [language]);

  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader />
      
      {/* Customer Navigation */}
      <CustomerNavigation />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              <WelcomeSection />
              <CurrentBookingCard />
              <QuickActionCards />
              <PromotionalBanners />
              <SummaryStatistics />
              <RecentActivityFeed />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AccountSidebar />
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden space-y-6">
            <WelcomeSection />
            <CurrentBookingCard />
            <QuickActionCards />
            <SummaryStatistics />
            <PromotionalBanners />
            <RecentActivityFeed />
            
            {/* Mobile Account Summary */}
            <div className="md:hidden">
              <AccountSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;