<template>
  <div class="settings-content">
    <div class="settings-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id" 
        class="tab-button" 
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <i :class="tab.icon"></i>
        {{ tab.name }}
      </button>
    </div>

    <div class="settings-body">
      <!-- Cài đặt tài khoản -->
      <div v-if="activeTab === 'account'" class="tab-content">
        <h3>Cài đặt tài khoản</h3>
        <form @submit.prevent="saveAccountSettings">
          <div class="form-group">
            <label for="fullName">Họ và tên</label>
            <input 
              type="text" 
              id="fullName" 
              v-model="accountSettings.fullName" 
              placeholder="Nhập họ và tên"
            />
          </div>
          <div class="form-group">
            <label for="username">Tên người dùng</label>
            <input 
              type="text" 
              id="username" 
              v-model="accountSettings.username" 
              placeholder="Nhập tên người dùng"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="accountSettings.email" 
              placeholder="Nhập email"
            />
          </div>
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="accountSettings.phone" 
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div class="form-group">
            <label for="bio">Giới thiệu</label>
            <textarea 
              id="bio" 
              v-model="accountSettings.bio" 
              placeholder="Viết giới thiệu về bạn"
              rows="4"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="location">Vị trí</label>
            <input 
              type="text" 
              id="location" 
              v-model="accountSettings.location" 
              placeholder="Nhập vị trí của bạn"
            />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save">Lưu thay đổi</button>
          </div>
        </form>
      </div>

      <!-- Cài đặt mật khẩu -->
      <div v-if="activeTab === 'password'" class="tab-content">
        <h3>Thay đổi mật khẩu</h3>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="currentPassword">Mật khẩu hiện tại</label>
            <input 
              type="password" 
              id="currentPassword" 
              v-model="passwordSettings.currentPassword" 
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>
          <div class="form-group">
            <label for="newPassword">Mật khẩu mới</label>
            <input 
              type="password" 
              id="newPassword" 
              v-model="passwordSettings.newPassword" 
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="passwordSettings.confirmPassword" 
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          <div class="password-requirements">
            <p>Mật khẩu phải có:</p>
            <ul>
              <li :class="{ valid: passwordStrength.length }">Ít nhất 8 ký tự</li>
              <li :class="{ valid: passwordStrength.uppercase }">Ít nhất 1 chữ hoa</li>
              <li :class="{ valid: passwordStrength.lowercase }">Ít nhất 1 chữ thường</li>
              <li :class="{ valid: passwordStrength.number }">Ít nhất 1 số</li>
              <li :class="{ valid: passwordStrength.special }">Ít nhất 1 ký tự đặc biệt</li>
            </ul>
          </div>
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn-save"
              :disabled="!isPasswordValid"
            >
              Cập nhật mật khẩu
            </button>
          </div>
        </form>
      </div>

      <!-- Cài đặt thông báo -->
      <div v-if="activeTab === 'notifications'" class="tab-content">
        <h3>Cài đặt thông báo</h3>
        <div class="notification-options">
          <div class="notification-option">
            <div class="option-info">
              <h4>Thông báo giải đấu</h4>
              <p>Nhận thông báo về các giải đấu sắp diễn ra và kết quả</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notificationSettings.tournaments">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="notification-option">
            <div class="option-info">
              <h4>Thông báo đội</h4>
              <p>Nhận thông báo về hoạt động của đội và lời mời tham gia</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notificationSettings.teams">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="notification-option">
            <div class="option-info">
              <h4>Thông báo tin nhắn</h4>
              <p>Nhận thông báo khi có tin nhắn mới</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notificationSettings.messages">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="notification-option">
            <div class="option-info">
              <h4>Thông báo thành tích</h4>
              <p>Nhận thông báo khi đạt được thành tích mới</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notificationSettings.achievements">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="notification-option">
            <div class="option-info">
              <h4>Email thông báo</h4>
              <p>Nhận thông báo qua email</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notificationSettings.email">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="form-actions">
          <button @click="saveNotificationSettings" class="btn-save">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

// Tabs
const tabs = [
  { id: 'account', name: 'Tài khoản', icon: 'fas fa-user' },
  { id: 'password', name: 'Mật khẩu', icon: 'fas fa-lock' },
  { id: 'notifications', name: 'Thông báo', icon: 'fas fa-bell' }
];

const activeTab = ref('account');

// Account settings
const accountSettings = ref({
  fullName: props.user.fullName || '',
  username: props.user.username || '',
  email: props.user.email || '',
  phone: props.user.phone || '',
  bio: props.user.bio || '',
  location: props.user.location || ''
});

const saveAccountSettings = () => {
  // Giả lập lưu cài đặt
  console.log('Saving account settings:', accountSettings.value);
  alert('Đã lưu thay đổi thành công!');
};

// Password settings
const passwordSettings = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const passwordStrength = ref({
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  special: false
});

watch(() => passwordSettings.value.newPassword, (newPassword) => {
  passwordStrength.value.length = newPassword.length >= 8;
  passwordStrength.value.uppercase = /[A-Z]/.test(newPassword);
  passwordStrength.value.lowercase = /[a-z]/.test(newPassword);
  passwordStrength.value.number = /[0-9]/.test(newPassword);
  passwordStrength.value.special = /[^A-Za-z0-9]/.test(newPassword);
});

const isPasswordValid = computed(() => {
  const { length, uppercase, lowercase, number, special } = passwordStrength.value;
  const passwordsMatch = passwordSettings.value.newPassword === passwordSettings.value.confirmPassword;
  return length && uppercase && lowercase && number && special && passwordsMatch;
});

const changePassword = () => {
  if (!isPasswordValid.value) {
    alert('Vui lòng đảm bảo mật khẩu đáp ứng tất cả các yêu cầu và khớp với xác nhận mật khẩu.');
    return;
  }
  
  // Giả lập đổi mật khẩu
  console.log('Changing password');
  alert('Đã thay đổi mật khẩu thành công!');
  
  // Reset form
  passwordSettings.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
};

// Notification settings
const notificationSettings = ref({
  tournaments: true,
  teams: true,
  messages: true,
  achievements: true,
  email: false
});

const saveNotificationSettings = () => {
  // Giả lập lưu cài đặt thông báo
  console.log('Saving notification settings:', notificationSettings.value);
  alert('Đã lưu cài đặt thông báo thành công!');
};
</script>

<style scoped>
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-tabs {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

.tab-button {
  padding: 10px 15px;
  background: none;
  border: none;
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

.tab-button i {
  font-size: 16px;
}

.tab-button:hover {
  color: #fff;
}

.tab-button.active {
  color: #ff5ea2;
  position: relative;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(135deg, #ff5ea2, #ff9966);
}

.settings-body {
  padding: 10px 0;
}

.tab-content h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #ccc;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #222;
  color: #fff;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn-save {
  padding: 10px 20px;
  background: linear-gradient(135deg, #ff5ea2, #ff9966);
  border: none;
  border-radius: 6px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.btn-save:hover {
  opacity: 0.9;
}

.btn-save:disabled {
  background: #666;
  cursor: not-allowed;
  opacity: 0.7;
}

.password-requirements {
  background-color: #222;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.password-requirements p {
  color: #ccc;
  margin-bottom: 10px;
}

.password-requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.password-requirements li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #999;
  font-size: 14px;
}

.password-requirements li::before {
  content: '✕';
  color: #ff5e5e;
  margin-right: 8px;
}

.password-requirements li.valid {
  color: #43e97b;
}

.password-requirements li.valid::before {
  content: '✓';
  color: #43e97b;
}

.notification-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.notification-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #222;
  border-radius: 8px;
}

.option-info h4 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #fff;
}

.option-info p {
  font-size: 14px;
  color: #999;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #444;
  transition: 0.4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background: linear-gradient(135deg, #ff5ea2, #ff9966);
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

@media (max-width: 767px) {
  .settings-tabs {
    overflow-x: auto;
    padding-bottom: 15px;
  }
  
  .tab-button {
    white-space: nowrap;
  }
}
</style>