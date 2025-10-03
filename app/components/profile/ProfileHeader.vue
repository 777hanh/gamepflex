<template>
    <div class="profile-header" data-aos="fade-up">
        <div class="profile-cover">
            <img src="/assets/img/profile-cover.jpg" alt="Cover Image" />
            <button class="edit-cover-btn">
                <i class="fas fa-camera"></i>
            </button>
        </div>
        <div class="profile-info">
            <div class="profile-avatar">
                <img src="/assets/img/avatar.jpg" alt="User Avatar" />
                <button class="edit-avatar-btn">
                    <i class="fas fa-camera"></i>
                </button>
            </div>
            <div class="profile-details">
                <h1 class="profile-name">{{ user.name }}</h1>
                <p class="profile-username">@{{ user.username }}</p>
                <div class="profile-stats">
                    <div class="stat-item">
                        <span class="stat-value">{{
                            user.stats.tournaments
                        }}</span>
                        <span class="stat-label">Giải đấu</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ user.stats.wins }}</span>
                        <span class="stat-label">Trận thắng</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ userTeams.length }}</span>
                        <span class="stat-label">Đội</span>
                    </div>
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-primary">
                    <i class="fas fa-edit"></i> Chỉnh sửa hồ sơ
                </button>
                <button class="btn btn-outline">
                    <i class="fas fa-share-alt"></i> Chia sẻ
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        user: {
            type: Object,
            required: true
        },
        userTeams: {
            type: Array,
            required: true
        }
    });
</script>

<style scoped>
    .profile-header {
        position: relative;
    }

    .profile-cover {
        height: 300px;
        position: relative;
        overflow: hidden;
    }

    .profile-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .edit-cover-btn {
        position: absolute;
        right: 20px;
        bottom: 20px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .edit-cover-btn:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    .profile-info {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        padding: 0 30px 20px;
        background-color: #151515;
        border-radius: 0 0 12px 12px;
        position: relative;
    }

    .profile-avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 5px solid #151515;
        overflow: hidden;
        position: relative;
        margin-top: -75px;
        background-color: #151515;
    }

    .profile-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .edit-avatar-btn {
        position: absolute;
        right: 5px;
        bottom: 5px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .edit-avatar-btn:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    .profile-details {
        flex: 1;
        padding-left: 30px;
    }

    .profile-name {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 5px;
        color: #fff;
    }

    .profile-username {
        font-size: 16px;
        color: #ccc;
        margin-bottom: 15px;
    }

    .profile-stats {
        display: flex;
        gap: 30px;
        margin-top: 15px;
    }

    .stat-item {
        text-align: center;
    }

    .stat-value {
        display: block;
        font-size: 24px;
        font-weight: 700;
        color: #ff5ea2;
    }

    .stat-label {
        font-size: 14px;
        color: #ccc;
    }

    .profile-actions {
        display: flex;
        gap: 15px;
        margin-left: auto;
        align-self: flex-end;
    }

    /* Buttons */
    .btn {
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
    }

    .btn-primary {
        background: linear-gradient(90deg, #ff5ea2, #ff9966);
        color: #fff;
    }

    .btn-primary:hover {
        opacity: 0.9;
    }

    .btn-outline {
        background: transparent;
        border: 1px solid #ff5ea2;
        color: #ff5ea2;
    }

    .btn-outline:hover {
        background: rgba(255, 94, 162, 0.1);
    }

    @media (max-width: 991px) {
        .profile-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .profile-details {
            padding-left: 0;
            margin-top: 20px;
        }

        .profile-stats {
            justify-content: center;
        }

        .profile-actions {
            margin-left: 0;
            margin-top: 20px;
        }
    }

    @media (max-width: 767px) {
        .profile-cover {
            height: 200px;
        }

        .profile-avatar {
            width: 120px;
            height: 120px;
            margin-top: -60px;
        }

        .profile-name {
            font-size: 24px;
        }
    }
</style>
