import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// Placeholder Pages
import DashboardPage from '../pages/DashboardPage';
import EventBookingsPage from '../pages/EventBookingsPage';
import UsersManagementPage from '../pages/UsersManagementPage';
import RefundLogsPage from '../pages/RefundLogsPage';
import ContentManagementPage from '../pages/ContentManagementPage';
import ReportsPage from '../pages/ReportsPage';
import AdminSettingsPage from '../pages/AdminSettingsPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes rendered within MainLayout */}
      <Route
        path="/"
        element={<ProtectedRoute element={<MainLayout />} />}
      >
        {/* If path is exactly "/", navigate to "/dashboard" */}
        {/* The ProtectedRoute wrapper on MainLayout handles auth. */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="event-bookings" element={<EventBookingsPage />} />
        <Route path="users" element={<UsersManagementPage />} />
        <Route path="refund-logs" element={<RefundLogsPage />} />
        <Route path="content-management" element={<ContentManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="admin-settings" element={<AdminSettingsPage />} />

        {/* Fallback for any other authenticated routes not matched under MainLayout, redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/*
        A general fallback for any path not matched at all.
        If this point is reached, it means the path didn't match /login or any protected routes.
        So, redirect to /login as a sensible default.
      */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
