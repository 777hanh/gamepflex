import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    if (error.response?.status === 401) {
      // Xử lý lỗi xác thực
      const authStore = useAuthStore();
      authStore.logout();
      navigateTo('/login');
    }
    return Promise.reject(error);
  }
);

// Hàm gửi request API với kiểu dữ liệu generic
export const useApi = () => {
  const sendRequest = async <T>(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();

      let response: AxiosResponse;

      switch (method.toLowerCase()) {
        case 'get':
          response = await apiClient.get<T>(url, config);
          break;
        case 'post':
          response = await apiClient.post<T>(url, data, config);
          break;
        case 'put':
          response = await apiClient.put<T>(url, data, config);
          break;
        case 'delete':
          response = await apiClient.delete<T>(url, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      loadingStore.stopLoading();
      return response.data;
    } catch (error: any) {
      const loadingStore = useLoadingStore();
      loadingStore.stopLoading();
      
      // Xử lý lỗi
      console.error('API request failed:', error);
      throw error;
    }
  };

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) => 
      sendRequest<T>('get', url, undefined, config),
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
      sendRequest<T>('post', url, data, config),
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
      sendRequest<T>('put', url, data, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) => 
      sendRequest<T>('delete', url, undefined, config)
  };
};

// Composable để sử dụng trong các component
export default useApi;