import http from "../http-common";

class DashboardDataService {

    getTotalMessages() {
      return http.get('/admin/total-messages');  // Get all matches
    }
    
    getMessagesByTimePeriod() {
        return http.get('/messages-by-time-period');  // Get all messages
    }

    getAverageResponseTime() {
        return http.get('/admin/average-response-time');  // Get average response timee
    }

    getTopSenders() {
        return http.get('/top-senders');  // Get average response timee
    }
    
    getMessagesBySenderType() {
        return http.get('/admin/messages-by-sender-type');  // Get average response timee
    }

    getResponseTimeByMatch() {
        return http.get('/average-response-time-by-match');  // Get average response timee
    }


    

}

export default new DashboardDataService();