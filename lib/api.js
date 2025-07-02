const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sms-v2-backend-production.up.railway.app/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Dashboard API
  async getDashboardStats() {
    // Since the backend doesn't have a dedicated dashboard endpoint,
    // we'll fetch the data from multiple endpoints
    const [matches, messages] = await Promise.all([
      this.getMatches(),
      this.getMessages()
    ])

    const stats = {
      totalMatches: matches.length,
      totalMessages: messages.length,
      activeMatches: matches.filter(match => match.status === 'active').length,
      totalStudents: new Set(matches.map(match => match.student?._id)).size,
      totalMentors: new Set(matches.map(match => match.mentor?._id)).size,
    }

    return {
      stats,
      recentMatches: matches.slice(0, 5),
      recentMessages: messages.slice(0, 10)
    }
  }

  // Matches API
  async getMatches() {
    return this.request('/matches')
  }

  async getMatch(id) {
    return this.request(`/matches/${id}`)
  }

  async createMatch(studentData, mentorData) {
    return this.request('/matches/create-match', {
      method: 'POST',
      body: JSON.stringify({ studentData, mentorData })
    })
  }

  async deleteMatch(id) {
    return this.request(`/matches/delete-match/${id}`, {
      method: 'DELETE'
    })
  }

  // Messages API - Fetch paginated messages from backend
  async getMessages(page = 1, limit = 20) {
    return this.request(`/messages?page=${page}&limit=${limit}`)
  }

  async sendAdminSMS(to, messageBody) {
    return this.request('/send-admin-sms', {
      method: 'POST',
      body: JSON.stringify({ to, messageBody })
    })
  }

  // Users API (Mentors and Students)
  async getMentors() {
    const matches = await this.getMatches()
    // Extract unique mentors from matches
    const mentorsMap = new Map()
    
    matches.forEach(match => {
      if (match.mentor && match.mentor._id) {
        mentorsMap.set(match.mentor._id, match.mentor)
      }
    })
    
    return Array.from(mentorsMap.values())
  }

  async getStudents() {
    const matches = await this.getMatches()
    // Extract unique students from matches
    const studentsMap = new Map()
    
    matches.forEach(match => {
      if (match.student && match.student._id) {
        studentsMap.set(match.student._id, match.student)
      }
    })
    
    return Array.from(studentsMap.values())
  }

  // Admin API
  async getAdminStats() {
    return this.request('/admin/stats')
  }
}

export const apiService = new ApiService() 