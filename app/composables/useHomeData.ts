import { ref } from 'vue';

// Centralized reactive data for homepage sections
const featuredGames = ref([
  { id: 1, name: 'Valorant', description: 'Tactical FPS', image: '/assets/img/game-x1.png', players: '125K', status: 'Live' },
  { id: 2, name: 'League of Legends', description: 'MOBA chiến thuật', image: '/assets/img/game-x2.png', players: '300K', status: 'Live' },
  { id: 3, name: 'Counter-Strike 2', description: 'FPS cổ điển', image: '/assets/img/game-x3.png', players: '200K', status: 'Live' },
  { id: 4, name: 'Dota 2', description: 'MOBA chuyên sâu', image: '/assets/img/game-x4.png', players: '180K', status: 'Live' },
  { id: 5, name: 'Fortnite', description: 'Battle royale sáng tạo', image: '/assets/img/game-x5.png', players: '250K', status: 'Live' },
  { id: 6, name: 'Apex Legends', description: 'Hero shooter battle royale', image: '/assets/img/game-x6.png', players: '150K', status: 'Live' },
]);

const liveTournaments = ref([
  { id: 1, name: 'World Championship 2024', game: 'Valorant', gameIcon: '/assets/img/game-x1.png', prizePool: '50,000', players: 128, maxPlayers: 256 },
  { id: 2, name: 'Summer Split Finals', game: 'League of Legends', gameIcon: '/assets/img/game-x2.png', prizePool: '75,000', players: 64, maxPlayers: 128 },
  { id: 3, name: 'Major Tournament', game: 'Counter-Strike 2', gameIcon: '/assets/img/game-x3.png', prizePool: '100,000', players: 32, maxPlayers: 64 },
  { id: 4, name: 'The International', game: 'Dota 2', gameIcon: '/assets/img/game-x4.png', prizePool: '200,000', players: 16, maxPlayers: 32 },
]);

const topTeams = ref([
  { id: 1, name: 'Team Alpha', region: 'North America', logo: '/assets/img/team-1.png', wins: 245, members: 5, earnings: '125K' },
  { id: 2, name: 'Cyber Warriors', region: 'Europe', logo: '/assets/img/team-2.png', wins: 198, members: 5, earnings: '98K' },
  { id: 3, name: 'Phoenix Squad', region: 'Asia', logo: '/assets/img/team-3.png', wins: 176, members: 5, earnings: '87K' },
]);

const topPlayers = ref([
  { id: 1, name: 'NeoBlade', country: 'VN', avatar: '/assets/img/avatar1.png', wins: 320, kda: '4.8', earnings: '45K' },
  { id: 2, name: 'ShadowFox', country: 'KR', avatar: '/assets/img/avatar2.png', wins: 298, kda: '5.1', earnings: '52K' },
  { id: 3, name: 'Astra', country: 'US', avatar: '/assets/img/avatar3.png', wins: 276, kda: '4.4', earnings: '39K' },
  { id: 4, name: 'RivenX', country: 'EU', avatar: '/assets/img/avatar4.png', wins: 260, kda: '4.9', earnings: '41K' },
  { id: 5, name: 'Flux', country: 'JP', avatar: '/assets/img/avatar5.png', wins: 248, kda: '4.1', earnings: '36K' },
  { id: 6, name: 'Nightcore', country: 'BR', avatar: '/assets/img/avatar6.png', wins: 230, kda: '3.9', earnings: '32K' },
]);

export function useHomeData() {
  return { featuredGames, liveTournaments, topTeams, topPlayers };
}
