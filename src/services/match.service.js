import http from '../http-common';

class MatchDataService {
  getAll() {
    return http.get('/matches'); // Get all matches
  }

  getById() {
    const id = '675811936c1ff12b52aa9e40';

    return http.get(`/matches/${id}`); // Get match by ID
  }

  createMatchWithEntities(data) {
    return http.post('/matches/create-match', data);
  }

  deleteMatch(id) {
    return http.delete(`/matches/delete-match/${id}`);
  }

  // Create a meeting with selected entities
  async createMeeting({ match, date, time }) {
    try {
      const response = await http.post('/matches/create-meeting', {
        match,
        date,
        time,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw error;
    }
  }
}

export default new MatchDataService();
