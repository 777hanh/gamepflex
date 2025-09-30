export default defineNuxtRouteMiddleware(async (to, from) => {
  // Chỉ chạy khi đây là lần đầu tiên truy cập trang
  if (process.client && to.path !== '/error') {
    const loadingStore = useLoadingStore()
    const apiStore = useApiStore()
    
    // Nếu dữ liệu chưa được tải
    if (!loadingStore.dataLoaded) {
      loadingStore.startLoading()
      
      try {
        // Tải tất cả dữ liệu cần thiết
        const success = await apiStore.fetchAllData()
        
        if (!success) {
          return navigateTo('/error')
        }
        
        loadingStore.setDataLoaded(true)
      } catch (error) {
        console.error('Error loading initial data:', error)
        return navigateTo('/error')
      } finally {
        loadingStore.stopLoading()
      }
    }
  }
})