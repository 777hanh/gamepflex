export default defineNuxtRouteMiddleware((to, from) => {
  const apiStore = useApiStore()
  
  // Các trang yêu cầu đăng nhập
  const authRequiredPages = ['/profile']
  
  // Kiểm tra nếu trang yêu cầu đăng nhập và người dùng chưa đăng nhập
  if (authRequiredPages.includes(to.path) && !apiStore.user) {
    return navigateTo('/signin')
  }
})