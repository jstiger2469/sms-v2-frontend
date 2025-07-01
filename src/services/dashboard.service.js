import http from '../http-common';

class DashboardDataService {
  getTotalMessages() {
    return http.get('/dashboard/total-messages'); // Get all matches
  }

  getUsers() {
    return http.get('/admin/users'); // Get all matches
  }

  createUsers() {
    return http.get('/dashboard/create-user'); // Get all matches
  }

  getNotifications() {
    return http.get('/dashboard/get-notifications'); // Get all matches
  }

  getMessagesByTimePeriod() {
    return http.get('/messages-by-time-period'); // Get all messages
  }

  getAverageResponseTime() {
    return http.get('/dashboard/average-response-time'); // Get average response timee
  }

  getTopUsers() {
    return http.get('/dashboard/top-users'); // Get average response timee
  }

  getMessagesBySenderType() {
    return http.get('/dashboard/messages-by-sender-type'); // Get average response timee
  }

  getResponseTimeByMatch() {
    return http.get('/dashboard/average-response-time-by-match'); // Get average response timee
  }

  getMessagesByMonth() {
    return http.get('/dashboard/messages-by-month'); // Get average response timee
  }

  getInteractions() {
    return http.get('/dashboard/user-interactions'); // Get average response timee
  }

  getResponseRateBySenderType() {
    return http.get('/dashboard/response-rate-by-sender-type'); // Get average response timee
  }

  getAverageMessagesPerDay() {
    return http.get('/dashboard/average-messages-per-day'); // Get average response timee
  }

  getAverageDailyUsers() {
    return http.get('/dashboard/average-daily-users'); // Get average response timee
  }

  getMessages() {
    return http.get('/messages/messages');
  }
}

export default new DashboardDataService();
