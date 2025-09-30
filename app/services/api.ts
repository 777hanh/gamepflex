import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Định nghĩa các interface cho API response
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Định nghĩa các interface cho các entity
export interface Tournament {
  id: string;
  title: string;
  game: string;
  prize: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
}

export interface Game {
  id: string;
  title: string;
  category: string;
  platform: string[];
  releaseDate: string;
  publisher: string;
  image: string;
  rating: number;
  players: number;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  members: number;
  wins: number;
  losses: number;
  game: string;
  ranking: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  wallet?: string;
  teams?: string[];
  tournaments?: string[];
}

// Tạo instance Axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor cho request
apiClient.interceptors.request.use(
  (config) => {
    // Thêm token nếu có
    if (process.client) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi chung
    if (error.response?.status === 401 && process.client) {
      // Xử lý lỗi xác thực
      navigateTo('/login');
    }
    return Promise.reject(error);
  }
);

// Hàm gửi request API với kiểu dữ liệu generic
export const sendRequestApi = async <T>(
  method: string,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    let response: AxiosResponse;

    switch (method.toLowerCase()) {
      case 'get':
        response = await apiClient.get<ApiResponse<T>>(url, config);
        break;
      case 'post':
        response = await apiClient.post<ApiResponse<T>>(url, data, config);
        break;
      case 'put':
        response = await apiClient.put<ApiResponse<T>>(url, data, config);
        break;
      case 'delete':
        response = await apiClient.delete<ApiResponse<T>>(url, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response.data;
  } catch (error: any) {
    // Xử lý lỗi
    console.error('API request failed:', error);
    
    // Trả về response lỗi có định dạng giống response thành công
    return {
      data: {} as T,
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'Unknown error'
    };
  }
};

// API Services
export const TournamentService = {
  getAll: () => sendRequestApi<Tournament[]>('get', '/tournaments'),
  getById: (id: string) => sendRequestApi<Tournament>('get', `/tournaments/${id}`),
  create: (data: Partial<Tournament>) => sendRequestApi<Tournament>('post', '/tournaments', data),
  update: (id: string, data: Partial<Tournament>) => sendRequestApi<Tournament>('put', `/tournaments/${id}`, data),
  delete: (id: string) => sendRequestApi<null>('delete', `/tournaments/${id}`)
};

export const GameService = {
  getAll: () => sendRequestApi<Game[]>('get', '/games'),
  getById: (id: string) => sendRequestApi<Game>('get', `/games/${id}`),
  create: (data: Partial<Game>) => sendRequestApi<Game>('post', '/games', data),
  update: (id: string, data: Partial<Game>) => sendRequestApi<Game>('put', `/games/${id}`, data),
  delete: (id: string) => sendRequestApi<null>('delete', `/games/${id}`)
};

export const TeamService = {
  getAll: () => sendRequestApi<Team[]>('get', '/teams'),
  getById: (id: string) => sendRequestApi<Team>('get', `/teams/${id}`),
  create: (data: Partial<Team>) => sendRequestApi<Team>('post', '/teams', data),
  update: (id: string, data: Partial<Team>) => sendRequestApi<Team>('put', `/teams/${id}`, data),
  delete: (id: string) => sendRequestApi<null>('delete', `/teams/${id}`)
};

export const UserService = {
  getProfile: () => sendRequestApi<User>('get', '/users/profile'),
  updateProfile: (data: Partial<User>) => sendRequestApi<User>('put', '/users/profile', data),
  login: (email: string, password: string) => sendRequestApi<{user: User, token: string}>('post', '/auth/login', { email, password }),
  register: (data: { username: string, email: string, password: string }) => sendRequestApi<{user: User, token: string}>('post', '/auth/register', data),
  connectWallet: (walletAddress: string) => sendRequestApi<User>('post', '/users/wallet', { walletAddress })
};