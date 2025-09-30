import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
  state: () => ({
    tournaments: [],
    games: [],
    teams: [],
    user: null
  }),
  
  actions: {
    async fetchAllData() {
      try {
        // Giả lập API calls song song
        const [tournaments, games, teams] = await Promise.all([
          this.fetchTournaments(),
          this.fetchGames(),
          this.fetchTeams()
        ])
        
        return true
      } catch (error) {
        console.error('Error fetching all data:', error)
        return false
      }
    },
    
    async fetchTournaments() {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.tournaments = [
        { id: 1, name: 'Copa Punto Gamer', game: 'Fortnite', prize: '$10,000', date: '2023-12-15', image: '/assets/img/tournament1.png' },
        { id: 2, name: 'ESL Pro League', game: 'CS:GO', prize: '$50,000', date: '2023-12-20', image: '/assets/img/tournament2.png' },
        { id: 3, name: 'Gameplex Masters', game: 'Valorant', prize: '$25,000', date: '2023-12-25', image: '/assets/img/tournament3.png' }
      ]
      return this.tournaments
    },
    
    async fetchGames() {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 800))
      this.games = [
        { id: 1, name: 'Fortnite', players: '125K', image: '/assets/img/game1.png' },
        { id: 2, name: 'CS:GO', players: '98K', image: '/assets/img/game2.png' },
        { id: 3, name: 'Valorant', players: '87K', image: '/assets/img/game3.png' }
      ]
      return this.games
    },
    
    async fetchTeams() {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1200))
      this.teams = [
        { id: 1, name: 'Team Liquid', members: 12, image: '/assets/img/team1.png' },
        { id: 2, name: 'Cloud9', members: 10, image: '/assets/img/team2.png' },
        { id: 3, name: 'FaZe Clan', members: 15, image: '/assets/img/team3.png' }
      ]
      return this.teams
    },
    
    async login(email, password) {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 500))
      this.user = { name: 'David Malan', email, avatar: '/assets/img/profile.png' }
      return this.user
    },
    
    logout() {
      this.user = null
    }
  }
})