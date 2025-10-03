<template>
    <div class="tournaments-content">
        <div class="filters">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Tìm kiếm giải đấu..."
                />
            </div>
            <div class="filter-options">
                <select v-model="gameFilter">
                    <option value="">Tất cả game</option>
                    <option
                        v-for="game in gameOptions"
                        :key="game"
                        :value="game"
                    >
                        {{ game }}
                    </option>
                </select>
                <select v-model="statusFilter">
                    <option value="">Tất cả trạng thái</option>
                    <option value="upcoming">Sắp diễn ra</option>
                    <option value="ongoing">Đang diễn ra</option>
                    <option value="completed">Đã kết thúc</option>
                </select>
            </div>
        </div>

        <div class="tournaments-list">
            <div v-if="filteredTournaments.length === 0" class="no-results">
                <i class="fas fa-trophy"></i>
                <p>Không tìm thấy giải đấu nào</p>
            </div>
            <div
                v-for="tournament in paginatedTournaments"
                :key="tournament.id"
                class="tournament-card"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <div class="tournament-image">
                    <img :src="tournament.image" :alt="tournament.name" />
                    <div class="tournament-status" :class="tournament.status">
                        {{ getStatusText(tournament.status) }}
                    </div>
                </div>
                <div class="tournament-info">
                    <h3>{{ tournament.name }}</h3>
                    <div class="tournament-meta">
                        <div class="meta-item">
                            <i class="fas fa-gamepad"></i>
                            <span>{{ tournament.game }}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>{{ formatDate(tournament.startDate) }}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-users"></i>
                            <span>{{ tournament.participants }} đội</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-trophy"></i>
                            <span>{{
                                formatCurrency(tournament.prizePool)
                            }}</span>
                        </div>
                    </div>
                    <div class="tournament-position" v-if="tournament.position">
                        <div
                            class="position-badge"
                            :class="getPositionClass(tournament.position)"
                        >
                            {{ getPositionText(tournament.position) }}
                        </div>
                    </div>
                </div>
                <div class="tournament-actions">
                    <NuxtLink
                        :to="`/tournaments/${tournament.id}`"
                        class="btn-details"
                    >
                        Chi tiết
                    </NuxtLink>
                </div>
            </div>
        </div>

        <div class="pagination" v-if="totalPages > 1">
            <button
                class="page-btn"
                :class="{ disabled: currentPage === 1 }"
                @click="currentPage > 1 && currentPage--"
            >
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="page-numbers">
                <button
                    v-for="page in displayedPages"
                    :key="page"
                    class="page-number"
                    :class="{ active: currentPage === page }"
                    @click="currentPage = page"
                >
                    {{ page }}
                </button>
            </div>
            <button
                class="page-btn"
                :class="{ disabled: currentPage === totalPages }"
                @click="currentPage < totalPages && currentPage++"
            >
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';

    const props = defineProps({
        tournaments: {
            type: Array,
            required: true
        }
    });

    // State
    const searchQuery = ref('');
    const gameFilter = ref('');
    const statusFilter = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 6;

    // Computed properties
    const gameOptions = computed(() => {
        const games = new Set();
        props.tournaments.forEach((tournament: any) => {
            games.add(tournament.game);
        });
        return Array.from(games);
    });

    const filteredTournaments = computed(() => {
        return props.tournaments.filter((tournament: any) => {
            const matchesSearch = tournament.name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase());
            const matchesGame =
                !gameFilter.value || tournament.game === gameFilter.value;
            const matchesStatus =
                !statusFilter.value || tournament.status === statusFilter.value;
            return matchesSearch && matchesGame && matchesStatus;
        });
    });

    const totalPages = computed(() => {
        return Math.ceil(filteredTournaments.value.length / itemsPerPage);
    });

    const paginatedTournaments = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredTournaments.value.slice(start, end);
    });

    const displayedPages = computed(() => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages.value <= maxPagesToShow) {
            for (let i = 1; i <= totalPages.value; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage.value <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
            } else if (currentPage.value >= totalPages.value - 2) {
                for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
                    pages.push(i);
                }
            } else {
                for (
                    let i = currentPage.value - 2;
                    i <= currentPage.value + 2;
                    i++
                ) {
                    pages.push(i);
                }
            }
        }

        return pages;
    });

    // Helper functions
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'Sắp diễn ra';
            case 'ongoing':
                return 'Đang diễn ra';
            case 'completed':
                return 'Đã kết thúc';
            default:
                return status;
        }
    };

    const getPositionClass = (position: number) => {
        if (position === 1) return 'first';
        if (position === 2) return 'second';
        if (position === 3) return 'third';
        return '';
    };

    const getPositionText = (position: number) => {
        if (position === 1) return '1st';
        if (position === 2) return '2nd';
        if (position === 3) return '3rd';
        return `${position}th`;
    };
</script>

<style scoped>
    .tournaments-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 10px;
    }

    .search-box {
        flex: 1;
        min-width: 250px;
        position: relative;
    }

    .search-box i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
    }

    .search-box input {
        width: 100%;
        padding: 12px 15px 12px 40px;
        border-radius: 8px;
        border: none;
        background-color: #222;
        color: #fff;
        font-size: 14px;
    }

    .filter-options {
        display: flex;
        gap: 10px;
    }

    .filter-options select {
        padding: 10px 15px;
        border-radius: 8px;
        border: none;
        background-color: #222;
        color: #fff;
        font-size: 14px;
        min-width: 150px;
    }

    .tournaments-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .no-results {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 0;
        color: #999;
    }

    .no-results i {
        font-size: 48px;
        margin-bottom: 15px;
        opacity: 0.5;
    }

    .tournament-card {
        background-color: #1a1a1a;
        border-radius: 8px;
        overflow: hidden;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .tournament-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .tournament-image {
        position: relative;
        height: 160px;
        overflow: hidden;
    }

    .tournament-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .tournament-status {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
    }

    .tournament-status.upcoming {
        background-color: #4facfe;
    }

    .tournament-status.ongoing {
        background-color: #43e97b;
    }

    .tournament-status.completed {
        background-color: #ff5ea2;
    }

    .tournament-info {
        padding: 15px;
    }

    .tournament-info h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #fff;
    }

    .tournament-meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 15px;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #ccc;
        font-size: 13px;
    }

    .meta-item i {
        color: #ff5ea2;
        width: 16px;
        text-align: center;
    }

    .tournament-position {
        margin-top: 10px;
    }

    .position-badge {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
    }

    .position-badge.first {
        background: linear-gradient(135deg, #ffd700, #ffa500);
    }

    .position-badge.second {
        background: linear-gradient(135deg, #c0c0c0, #a9a9a9);
    }

    .position-badge.third {
        background: linear-gradient(135deg, #cd7f32, #8b4513);
    }

    .tournament-actions {
        padding: 0 15px 15px;
        display: flex;
        justify-content: flex-end;
    }

    .btn-details {
        padding: 8px 15px;
        background: linear-gradient(135deg, #ff5ea2, #ff9966);
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        transition: opacity 0.3s ease;
    }

    .btn-details:hover {
        opacity: 0.9;
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        gap: 10px;
    }

    .page-btn {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background-color: #222;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
        transition: background-color 0.3s ease;
    }

    .page-btn:hover:not(.disabled) {
        background-color: #333;
    }

    .page-btn.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .page-numbers {
        display: flex;
        gap: 5px;
    }

    .page-number {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background-color: #222;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
        transition: background-color 0.3s ease;
    }

    .page-number:hover {
        background-color: #333;
    }

    .page-number.active {
        background: linear-gradient(135deg, #ff5ea2, #ff9966);
    }

    @media (max-width: 767px) {
        .filters {
            flex-direction: column;
        }

        .filter-options {
            width: 100%;
        }

        .filter-options select {
            flex: 1;
        }

        .tournaments-list {
            grid-template-columns: 1fr;
        }
    }
</style>
