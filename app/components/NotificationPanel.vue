<template>
  <div class="notification-panel" :class="{ 'active': isOpen }">
    <div class="notification-header">
      <h4>Thông báo</h4>
      <button class="close-btn" @click="closePanel">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="notification-body">
      <div v-if="notifications.length === 0" class="no-notifications">
        <p>Không có thông báo mới</p>
      </div>
      <ul v-else class="notification-list">
        <li v-for="(notification, index) in notifications" :key="index" class="notification-item" :class="{ 'unread': !notification.read }">
          <div class="notification-icon" :class="notification.type">
            <i :class="getIconClass(notification.type)"></i>
          </div>
          <div class="notification-content">
            <h5>{{ notification.title }}</h5>
            <p>{{ notification.message }}</p>
            <span class="notification-time">{{ formatTime(notification.time) }}</span>
          </div>
          <button class="mark-read-btn" v-if="!notification.read" @click="markAsRead(index)">
            <i class="fas fa-check"></i>
          </button>
        </li>
      </ul>
    </div>
    <div class="notification-footer">
      <button class="mark-all-read" @click="markAllAsRead">Đánh dấu tất cả đã đọc</button>
      <button class="view-all">Xem tất cả</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);

// Mẫu dữ liệu thông báo
const notificationsData = ref<Notification[]>([
  {
    id: 1,
    title: 'Giải đấu mới',
    message: 'Giải đấu Fortnite Championship Series đã được mở đăng ký!',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 phút trước
    read: false,
    type: 'info'
  },
  {
    id: 2,
    title: 'Lời mời đội',
    message: 'Bạn đã được mời tham gia đội "Pro Gamers"',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 giờ trước
    read: false,
    type: 'success'
  },
  {
    id: 3,
    title: 'Cập nhật hệ thống',
    message: 'Hệ thống sẽ bảo trì vào ngày 15/07/2023',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 ngày trước
    read: true,
    type: 'warning'
  }
]);

const notifications = computed(() => {
  return notificationsData.value;
});

const closePanel = () => {
  emit('close');
};

const markAsRead = (index: number) => {
  notificationsData.value[index].read = true;
};

const markAllAsRead = () => {
  notificationsData.value.forEach(notification => {
    notification.read = true;
  });
};

const getIconClass = (type: string) => {
  switch (type) {
    case 'info':
      return 'fas fa-info-circle';
    case 'success':
      return 'fas fa-check-circle';
    case 'warning':
      return 'fas fa-exclamation-triangle';
    case 'error':
      return 'fas fa-times-circle';
    default:
      return 'fas fa-bell';
  }
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Dưới 1 phút
  if (diff < 60 * 1000) {
    return 'Vừa xong';
  }
  
  // Dưới 1 giờ
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes} phút trước`;
  }
  
  // Dưới 1 ngày
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours} giờ trước`;
  }
  
  // Dưới 7 ngày
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days} ngày trước`;
  }
  
  // Định dạng ngày tháng
  return date.toLocaleDateString('vi-VN');
};
</script>

<style scoped>
.notification-panel {
  position: fixed;
  top: 80px;
  right: -400px;
  width: 350px;
  height: calc(100vh - 80px);
  background-color: #1a1a1a;
  border-left: 1px solid #333;
  z-index: 1000;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
}

.notification-panel.active {
  right: 0;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #333;
}

.notification-header h4 {
  margin: 0;
  color: #fff;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  cursor: pointer;
}

.close-btn:hover {
  color: #ff5ea2;
}

.notification-body {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}

.no-notifications {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
}

.notification-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification-item {
  display: flex;
  padding: 15px 20px;
  border-bottom: 1px solid #333;
  position: relative;
}

.notification-item.unread {
  background-color: rgba(255, 94, 162, 0.05);
}

.notification-item.unread::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(to bottom, #ff5ea2, #f072b6);
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.notification-icon.info {
  background-color: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.notification-icon.success {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.notification-icon.warning {
  background-color: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.notification-icon.error {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.notification-content {
  flex: 1;
}

.notification-content h5 {
  margin: 0 0 5px;
  font-size: 16px;
  color: #fff;
}

.notification-content p {
  margin: 0 0 5px;
  font-size: 14px;
  color: #ccc;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 5px;
}

.mark-read-btn:hover {
  color: #ff5ea2;
}

.notification-footer {
  padding: 15px 20px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
}

.notification-footer button {
  background: none;
  border: none;
  color: #ff5ea2;
  cursor: pointer;
  font-size: 14px;
}

.notification-footer button:hover {
  text-decoration: underline;
}
</style>