import { defineStore } from 'pinia';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  wallet?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    setUser(user: User) {
      this.user = user;
    },

    setToken(token: string) {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },

    setAuthenticated(status: boolean) {
      this.isAuthenticated = status;
    },

    async login(email: string, password: string) {
      try {
        // Giả lập API call
        // Trong thực tế, sẽ gọi API thực sự
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Giả lập dữ liệu trả về
        const userData: User = {
          id: '1',
          username: 'user1',
          email: email,
          avatar: '/assets/img/avatar.png',
          wallet: '0x1234...5678'
        };
        
        const token = 'fake_jwt_token_' + Math.random().toString(36).substring(2);
        
        this.setUser(userData);
        this.setToken(token);
        this.setAuthenticated(true);
        
        return { success: true };
      } catch (error) {
        console.error('Login failed:', error);
        return { success: false, error };
      }
    },

    async register(username: string, email: string, password: string) {
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Giả lập dữ liệu trả về
        const userData: User = {
          id: '2',
          username,
          email,
          avatar: '/assets/img/default-avatar.png'
        };
        
        const token = 'fake_jwt_token_' + Math.random().toString(36).substring(2);
        
        this.setUser(userData);
        this.setToken(token);
        this.setAuthenticated(true);
        
        return { success: true };
      } catch (error) {
        console.error('Registration failed:', error);
        return { success: false, error };
      }
    },

    async connectWallet(walletAddress: string) {
      if (!this.user) return { success: false, error: 'User not logged in' };
      
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Cập nhật thông tin ví
        this.user = {
          ...this.user,
          wallet: walletAddress
        };
        
        return { success: true };
      } catch (error) {
        console.error('Wallet connection failed:', error);
        return { success: false, error };
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('auth_token');
    },

    async checkAuth() {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        this.logout();
        return false;
      }
      
      try {
        // Giả lập kiểm tra token
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Giả lập dữ liệu người dùng
        const userData: User = {
          id: '1',
          username: 'user1',
          email: 'user@example.com',
          avatar: '/assets/img/avatar.png',
          wallet: '0x1234...5678'
        };
        
        this.setUser(userData);
        this.setToken(token);
        this.setAuthenticated(true);
        
        return true;
      } catch (error) {
        console.error('Token validation failed:', error);
        this.logout();
        return false;
      }
    }
  }
});