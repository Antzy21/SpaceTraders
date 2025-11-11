<script setup lang='ts'>
import { computed } from 'vue';
import type { Fuel } from '../../types/Ship/fuel';

const { fuel } = defineProps<{
    fuel: Fuel
}>();

let fuelPercentage = computed(() => {
    return Math.round((fuel.current / fuel.capacity) * 100);
})

</script>

<template>
    <span v-if="fuelPercentage">
        Fuel <b>{{ fuelPercentage }}%</b>
    </span>
</template>

<style scoped></style>