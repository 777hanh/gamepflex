<script setup lang="ts">
    import { listLevels } from '~/constants/next-level-gaming';
</script>

<template>
    <div class="container flex flex-col gap-8">
        <h2
            class="grownUp display-five cursor-scale growUp title-anim flex! flex-col items-start"
        >
            <span>Game to</span><span>The Next Level</span>
        </h2>

        <!-- Content goes here -->

        <div
            class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
            <CardNextLevel
                v-for="(level, index) in listLevels"
                :key="index"
                :icon="level.icon"
                :title="level.title"
                :description="level.description"
                :link="level.link"
            />
        </div>
    </div>
</template>
