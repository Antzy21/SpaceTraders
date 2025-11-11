<script setup lang="ts">
import { store } from '../../store';

const { symbol } = defineProps<{
    symbol: string
}>();

function updateLocationSearch() {
    store.locationSearch = symbol;
}

</script>

<template>
    <button v-if="store.locationSearch != symbol" @click="updateLocationSearch()">
        <slot name="name"></slot>
        <span v-if="!$slots.name">{{ symbol }}</span>
    </button>
    <span v-else>{{ symbol }}</span>
</template>