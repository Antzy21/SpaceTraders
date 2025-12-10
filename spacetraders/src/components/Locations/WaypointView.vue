<script setup lang="ts">
import LocationButton from '../Locations/LocationButton.vue';
import Waypoint from "./WaypointView.vue"
import type { Waypoint as WaypointType } from "../../types/Location/waypoint"
import { ref, watch } from 'vue';
import ShipyardView from '../Shops/ShipyardView.vue';
import type { Shipyard } from '../../types/shipyard';
import MarketView from '../Shops/MarketView.vue';
import type { Market } from '../../types/market';
import { store } from '../../store';

const { waypoint } = defineProps<{
  waypoint: WaypointType
}>();

let shipyard = ref<Shipyard>();
let market = ref<Market>();

async function loadShipyard() {
  if (waypoint.traits?.some(t => t.name == "Shipyard")) {
    shipyard.value = await store.getShipyard(waypoint.symbol)
  }
  else {
    shipyard.value = undefined
  }
}

async function loadMarket() {
  if (waypoint.traits?.some(t => t.name == "Marketplace")) {
    market.value = await store.getMarket(waypoint.symbol)
  }
  else {
    market.value = undefined
  }
}

watch(() => waypoint, () => loadShipyard())
watch(() => waypoint, () => loadMarket())

loadShipyard()
loadMarket()

</script>

<template>
  <div class="container">
    <div>
      <span>Type: <b>{{ waypoint.type }}</b></span>
      <span>Coords: <b>{{ waypoint.x }}, {{ waypoint.y }}</b></span>
      <span>Waypoint:
        <LocationButton :symbol="waypoint.symbol"></LocationButton>
      </span>
      <span v-if="waypoint.faction">
        Faction: <b>{{ waypoint.faction.symbol }}</b>
      </span>
    </div>
    <div v-if="waypoint.modifiers?.length > 0">
      <span v-for="modifier in waypoint.modifiers"><b>{{ modifier }}</b></span>
    </div>
    <div v-if="waypoint.traits?.length > 0">
      <span v-for="trait in waypoint.traits"><b>{{ trait.name }}</b></span>
    </div>
    <div v-if="waypoint.isUnderConstruction">Waypoint is under construction</div>
    <ShipyardView v-if="shipyard" :shipyard="shipyard" :waypointSymbol="waypoint.symbol"/>
    <MarketView v-if="market" :market="market"/>
    <div v-for="orbital in waypoint.orbitalWaypoints" :key="orbital.symbol">
      <WaypointView :waypoint="orbital" />
    </div>
  </div>
</template>

<style scoped>
span {
  margin-right: 15px;
}
</style>