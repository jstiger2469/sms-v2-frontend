import axios from 'axios';

const getMatches = async () => {
  return axios.get('/api/matches');
};

const getMatch = async (id) => {
  return axios.get(`/api/matches/${id}`);
};

const createMatch = async (studentData, mentorData) => {
  return axios.post('/api/matches', { studentData, mentorData });
};

const deleteMatch = async (id) => {
  return axios.delete(`/api/matches/${id}`);
};

const MatchService = {
  getMatches,
  getMatch,
  createMatch,
  deleteMatch,
};

export default MatchService; 