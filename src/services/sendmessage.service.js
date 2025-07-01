import http from '../http-common';

class SendMessageService {
  // Get all mentors
  // Fetch mentors
  async getMentors() {
    try {
      const response = await http.get('/mentors');
      console.log('Mentors Data: ', response.data); // Log the mentors data
      return response.data;
    } catch (error) {
      console.error('Error fetching mentors: ', error);
    }
  }

  // Fetch students
  async getStudents() {
    try {
      const response = await http.get('/students');
      console.log('Students Data: ', response.data); // Log the students data
      return response.data;
    } catch (error) {
      console.error('Error fetching students: ', error);
    }
  }

  // Send a message to a user
  sendMessage(userId, message, phone, selectedType) {
    return http.post('/admin/send-message', { userId, message, phone, selectedType});
  }
}

export default new SendMessageService();
