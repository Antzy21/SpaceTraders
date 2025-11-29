<script setup lang="ts">
import { computed, ref } from 'vue';
import type { System } from '../../types/Location/system';
import WaypointView from './WaypointView.vue';
import type { Waypoint } from '../../types/Location/waypoint';

let filterMarkets = ref(false)
let filterShipyards = ref(false)

const { system } = defineProps<{
  system: System
}>();

let filteredWaypoints = computed(() => {
  return system.waypoints
    .filter((waypoint: Waypoint) => {
      return !filterMarkets.value || waypoint.traits.findIndex(t => t.symbol == "MARKETPLACE") != -1
    })
    .filter((waypoint: Waypoint) => {
      return !filterShipyards.value || waypoint.traits.findIndex(t => t.symbol == "SHIPYARD") != -1
    })
})

</script>

<template>
  <div class="container">
    <div>
      <span>Type: <b>{{ system.type }}</b></span>
      <span>Coords: <b>{{ system.x }}, {{ system.y }}</b></span>
      <span v-if="system.factions?.length == 0">No Factions</span>
      <span v-else>Factions: <span v-for="faction in system.factions"><b>{{ faction }}</b></span></span>
      <span>Constelation: <b>{{ system.constellation }}</b></span>
    </div>
    <div>
      Filters:
      <button @click="filterMarkets = !filterMarkets" :class="{ buttonActive: filterMarkets }">Markets</button>
      <button @click="filterShipyards = !filterShipyards" :class="{ buttonActive: filterShipyards }">Shipyards</button>
    </div>
    <div>
      <h4>Waypoints</h4>
      <div v-for="waypoint in filteredWaypoints" :key="waypoint.symbol">
        <WaypointView :waypoint="waypoint" />
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  margin-right: 15px;
}
</style>