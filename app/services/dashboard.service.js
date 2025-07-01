import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getTotalMessages = async () => {
  return axios.get('/api/dashboard/total-messages');
};

const getAverageResponseTime = async () => {
  return axios.get('/api/dashboard/average-response-time');
};

const getMessagesByMonth = async () => {
  return axios.get('/api/dashboard/messages-by-month');
};

const getAverageMessagesPerDay = async () => {
  return axios.get('/api/dashboard/average-messages-per-day');
};

const getAverageDailyUsers = async () => {
  return axios.get('/api/dashboard/average-daily-users');
};

const getResponseRateBySenderType = async () => {
  return axios.get('/api/dashboard/response-rate-by-sender-type');
};

const getMessagesBySenderType = async () => {
  return axios.get('/api/dashboard/messages-by-sender-type');
};

const getTopUsers = async () => {
  return axios.get('/api/dashboard/top-users');
};

const DashboardDataService = {
  getTotalMessages,
  getAverageResponseTime,
  getMessagesByMonth,
  getAverageMessagesPerDay,
  getAverageDailyUsers,
  getResponseRateBySenderType,
  getMessagesBySenderType,
  getTopUsers,
};

export default DashboardDataService; 