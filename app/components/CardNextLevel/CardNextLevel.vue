<script setup lang="ts">
    import type { LucideIcon } from 'lucide-vue-next';

    const props = defineProps({
        icon: {
            type: Object as () => LucideIcon,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    });
</script>

<template>
    <div
        class="group bg-card hover:border-primary! flex flex-col gap-4 rounded-lg p-6 text-left hover:shadow-lg"
    >
        <div
            class="bg-primary/10 text-primary group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors"
        >
            <component :is="props.icon" class="fs-lg h-5 w-5" />
        </div>
        <h3
            class="cursor-scale growDown2 text-secondary group-hover:text-primary mb-2 text-xl! font-semibold transition-colors duration-500 md:text-2xl!"
        >
            {{ props.title }}
        </h3>
        <p class="text-secondary text-xs">{{ props.description }}</p>
        <NuxtLink
            :to="props.link"
            class="text-primary hover:text-primary! learn-more flex text-sm font-medium transition-colors"
        >
            Learn More
        </NuxtLink>
    </div>
</template>

<style lang="css" scoped>
    .bg-card {
        border: 2px solid rgba(246, 87, 30, 0.1);
        transition: all 0.3s ease;
    }
    .bg-card:hover {
        border-color: rgba(246, 87, 30, 0.7);
    }

    .learn-more {
        position: relative;
        display: inline-block;
        width: fit-content;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            display: flex;
            margin-right: 0.5rem;
            transition: transform 0.3s ease;
            width: 100%;
            height: 1.5px;
            background-color: var(--color-primary);
            transform: scaleX(0);
            transform-origin: left center;
        }

        &:hover::before {
            transform: scaleX(1);
        }
    }
</style>
