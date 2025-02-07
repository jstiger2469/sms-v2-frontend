import http from '../http-common';

class DashboardDataService {
  getTotalMessages() {
    return http.get('/admin/total-messages'); // Get all matches
  }

  getUsers() {
    return http.get('/admin/users'); // Get all matches
  }

  createUsers() {
    return http.get('/admin/create-user'); // Get all matches
  }

  getNotifications() {
    return http.get('/admin/get-notifications'); // Get all matches
  }

  getMessagesByTimePeriod() {
    return http.get('/messages-by-time-period'); // Get all messages
  }

  getAverageResponseTime() {
    return http.get('/admin/average-response-time'); // Get average response timee
  }

  getTopUsers() {
    return http.get('/admin/top-users'); // Get average response timee
  }

  getMessagesBySenderType() {
    return http.get('/admin/messages-by-sender-type'); // Get average response timee
  }

  getResponseTimeByMatch() {
    return http.get('/average-response-time-by-match'); // Get average response timee
  }

  getMessagesByMonth() {
    return http.get('/admin/messages-by-month'); // Get average response timee
  }

  getInteractions() {
    return http.get('/admin/user-interactions'); // Get average response timee
  }

  getResponseRateBySenderType() {
    return http.get('/admin/response-rate-by-sender-type'); // Get average response timee
  }

  getAverageMessagesPerDay() {
    return http.get('/admin/average-messages-per-day'); // Get average response timee
  }

  getAverageDailyUsers() {
    return http.get('/admin/average-daily-users'); // Get average response timee
  }
}

export default new DashboardDataService();
