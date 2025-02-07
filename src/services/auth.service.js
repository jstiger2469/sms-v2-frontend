import http from '../http-common';

class Auth0Service {
  createUser(data) {
    console.log(data);
    return http.post('/admin/create-user', data); // Get all matches
  }

  deleteUser(userId) {
    console.log(userId);
    return http.delete(`/admin/delete-user/${userId}`); // Get all matches
  }
}

export default new Auth0Service();
