<script setup lang='ts'>
import { ref } from 'vue';
import type { Nav } from '../../types/Ship/nav';

const { nav } = defineProps<{
    nav: Nav
}>();

const emit = defineEmits<{
    (e: 'orbit-ship'): void;
    (e: 'dock-ship'): void;
    (e: 'navigate-ship-to-waypoint', waypoint: string): void;
}>();

let targetWaypoint = ref('')
let showTravelInput = ref(false);

function onNavigateShipToWaypoint() {
    emit('navigate-ship-to-waypoint', targetWaypoint.value);
    targetWaypoint.value = '';
    showTravelInput.value = false;
}

function toggleTravelInput() {
    showTravelInput.value = !showTravelInput.value;
}

</script>

<template>
    <span> {{ nav.status }} </span>
    <span v-if="nav.status == 'DOCKED'">
        <button @click="emit('orbit-ship')">Orbit</button>
    </span>
    <span v-if="nav.status == 'IN_ORBIT'">
        <button @click="emit('dock-ship')">Dock</button>
    </span>
    <span v-if="nav.status == 'IN_ORBIT'">
        <button v-on:click="toggleTravelInput">Travel</button>
    </span>
  <div v-if="nav.status == 'IN_ORBIT' && showTravelInput">
    <input v-model="targetWaypoint"></input>
    <button @click="onNavigateShipToWaypoint()" :disabled="!targetWaypoint">Travel</button>
  </div>
</template>

<style scoped></style>