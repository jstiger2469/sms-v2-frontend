import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles.css';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import Matches from './Matches';
import Messages from './Messages';
import Calendar from './Calendar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  //wrap client in queryProvider
  <QueryClientProvider client={queryClient}>
  <Router>
  <Navigation />
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/team" element={<Matches />} />
      <Route path="/Messages" element={<Messages />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  </Router>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
