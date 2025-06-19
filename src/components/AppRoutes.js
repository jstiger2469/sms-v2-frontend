import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Dashboard from './Dashboard';
import Matches from './Matches';
import Users from './Users';
import Messages from './Messages';
import Scheduler from './Scheduler';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';  // You need to create this

export default function AppRoutes() {
  return (
    <>
      <Navigation />
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduler"
          element={
            <ProtectedRoute>
              <Scheduler />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
