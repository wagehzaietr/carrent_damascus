import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Add your imports here
import CustomerDashboard from "./pages/customer-dashboard";
import BookingManagementScreen from "./pages/booking-management-screen";
import FleetManagementScreen from "./pages/fleet-management-screen";
import CarBrowseAndSearchScreen from "./pages/car-browse-and-search-screen";
import CarDetailAndBookingScreen from "./pages/car-detail-and-booking-screen";
import BookingAdministrationScreen from "./pages/booking-administration-screen";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/booking-management-screen" element={<BookingManagementScreen />} />
        <Route path="/fleet-management-screen" element={<FleetManagementScreen />} />
        <Route path="/car-browse-and-search-screen" element={<CarBrowseAndSearchScreen />} />
        <Route path="/car-detail-and-booking-screen" element={<CarDetailAndBookingScreen />} />
        <Route path="/booking-administration-screen" element={<BookingAdministrationScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;