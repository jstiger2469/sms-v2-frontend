import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Matches from './components/Matches';
import Users from './components/Users';
import Messages from './components/Messages';
import Scheduler from './components/Scheduler';

import AuthProvider from './auth/AuthProvider'; // Import AuthProvider
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* Wrap the entire app with AuthProvider */}
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/scheduler" element={<Scheduler />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);

reportWebVitals();
