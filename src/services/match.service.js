import http from "../http-common";

class MatchDataService {

    getAll() {
      return http.get('/matches');  // Get all matches
    }
    
    getById() {
      const id ="675811936c1ff12b52aa9e40";

      return http.get(`/matches/${id}`);  // Get match by ID
    }

}

export default new MatchDataService();


