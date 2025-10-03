<template>
    <div class="team-members" data-aos="fade-up">
        <h3 class="members-title">Thành viên đội</h3>
        <div class="members-grid">
            <div
                v-for="member in members"
                :key="member.id"
                class="member-card"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <div class="member-avatar">
                    <img :src="member.avatar" :alt="member.name" />
                    <div class="member-role">{{ member.role }}</div>
                </div>
                <div class="member-info">
                    <h4 class="member-name">{{ member.name }}</h4>
                    <p class="member-nickname">{{ member.nickname }}</p>
                    <div class="member-stats">
                        <div class="stat">
                            <span class="stat-label">KDA:</span>
                            <span class="stat-value">{{ member.kda }}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Trận:</span>
                            <span class="stat-value">{{ member.matches }}</span>
                        </div>
                    </div>
                    <div class="member-social">
                        <a
                            v-if="member.socialLinks?.twitter"
                            :href="member.socialLinks.twitter"
                            target="_blank"
                            class="social-link"
                        >
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a
                            v-if="member.socialLinks?.twitch"
                            :href="member.socialLinks.twitch"
                            target="_blank"
                            class="social-link"
                        >
                            <i class="fab fa-twitch"></i>
                        </a>
                        <a
                            v-if="member.socialLinks?.youtube"
                            :href="member.socialLinks.youtube"
                            target="_blank"
                            class="social-link"
                        >
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    interface Member {
        id: string;
        name: string;
        nickname: string;
        avatar: string;
        role: string;
        kda: string;
        matches: number;
        socialLinks?: {
            twitter?: string;
            twitch?: string;
            youtube?: string;
        };
    }

    const props = defineProps<{
        members: Member[];
    }>();
</script>

<style scoped>
    .team-members {
        background-color: #151515;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 30px;
    }

    .members-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #fff;
    }

    .members-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    .member-card {
        background-color: #1a1a1a;
        border-radius: 10px;
        overflow: hidden;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .member-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .member-avatar {
        position: relative;
        height: 180px;
        overflow: hidden;
    }

    .member-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .member-role {
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(90deg, #ff5ea2, #ff9966);
        color: #fff;
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 600;
        border-top-right-radius: 8px;
    }

    .member-info {
        padding: 15px;
    }

    .member-name {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
        color: #fff;
    }

    .member-nickname {
        font-size: 14px;
        color: #ff5ea2;
        margin-bottom: 10px;
    }

    .member-stats {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .stat {
        display: flex;
        align-items: center;
    }

    .stat-label {
        font-size: 12px;
        color: #ccc;
        margin-right: 5px;
    }

    .stat-value {
        font-size: 14px;
        font-weight: 600;
        color: #fff;
    }

    .member-social {
        display: flex;
        gap: 10px;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-color: #252525;
        border-radius: 50%;
        color: #ccc;
        transition: all 0.3s ease;
    }

    .social-link:hover {
        background: linear-gradient(90deg, #ff5ea2, #ff9966);
        color: #fff;
    }

    @media (max-width: 991px) {
        .members-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 767px) {
        .members-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
