<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import { watch } from 'vue'
import WaypointView from './WaypointView.vue';
import SystemView from './SystemView.vue';
import LocationButton from './LocationButton.vue';
import { store } from '../../store';

let searchInput = ref<string>('')

const sectorSymbol = computed(() => {
  return searchInput.value?.trim().split('-')[0] ?? ''
})
const systemIndicator = computed(() => {
  return searchInput.value?.trim().split('-')[1] ?? ''
})
const systemSymbol = computed(() => {
  if (sectorSymbol.value === '' || systemIndicator.value === '') {
    return ''
  }
  return `${sectorSymbol.value}-${systemIndicator.value}`
})
const waypointIndicator = computed(() => {
  return searchInput.value?.trim().split('-')[2] ?? ''
})
const waypointSymbol = computed(() => {
  if (systemSymbol.value === '' || waypointIndicator.value === '') {
    return ''
  }
  return `${systemSymbol.value}-${waypointIndicator.value}`
})

let waypoint = computed(() => {
  if (waypointSymbol.value) {
    return store.system.waypoints?.find(w => w.symbol == waypointSymbol.value)
  }
})

watch(systemSymbol, async (newVal) => {
  console.log(`${newVal} -- ${store.system.symbol}`);
  
  if (newVal && newVal != store.system.symbol) {
    store.loadSystem(newVal)
  }
})

watch(store, (store) => {
  searchInput.value = store.locationSearch
}, { immediate: true })

</script>

<template>
  <h2>Location Search</h2>
  <input v-model="searchInput" placeholder="Location" />
  <div style="height: 1rem;" v-if="systemSymbol">
    <span><LocationButton :symbol="systemSymbol"><b>{{ systemIndicator }}</b></LocationButton></span>
  </div>
  <div v-if="waypoint" >
    <h3>Waypoint</h3>
    <WaypointView :waypoint="waypoint" />
  </div>
  <div v-if="systemSymbol && systemSymbol == searchInput">
    <h3>System</h3>
    <SystemView :system="store.system" />
  </div>

</template>

<style scoped>
</style>