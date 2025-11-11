<script setup lang="ts">
import type { Ship } from '../../types/ship';
import LocationButton from '../Locations/LocationButton.vue';
import { navigateShipToWaypoint, dockShip, orbitShip, refuelShip, jettisonGoods } from '../../api';
import CargoView from './CargoView.vue';
import CargoTransferView from './CargoTransferView.vue';
import FuelView from './FuelView.vue';
import NavView from './NavView.vue';
import { store } from '../../store';
import type { Resource } from '../../types/resource';
import type { NavResponse } from '../../types/Ship/navResponse';
import Actions from './Actions.vue';

const { ship } = defineProps<{
  ship: Ship
}>();

function onNavigateShipToWaypoint(targetWaypoint: string) {
  navigateShipToWaypoint(ship.symbol, targetWaypoint)
    .then((response: NavResponse) => {
      store.loadShips();
      setTimeout(() => {
        store.loadShips();
      }, Date.parse(response.nav.route.arrival) - Date.now());
    })
}

function onDockShip() {
  dockShip(ship.symbol)
    .then(() => {
      store.loadShips();
    })
}

function onOrbitShip() {
  orbitShip(ship.symbol)
    .then(() => {
      store.loadShips();
    })
}

function onJettisonGoods(resource: Resource) {
  jettisonGoods(ship.symbol, resource)
    .then(() => {
      store.loadShips();
    });
}

function onRefuelShip() {
  refuelShip(ship.symbol)
    .then(() => {
      store.loadShips();
    });
}

</script>

<template>
  <span>{{ ship.symbol }}</span>
  <span><b>{{ ship.registration.role }}</b></span>
  <Actions :ship="ship" />
  <LocationButton :symbol="ship.nav.waypointSymbol"></LocationButton>
  <div>
    <NavView :nav="ship.nav"
      @dock-ship="onDockShip()"
      @orbit-ship="onOrbitShip()"
      @navigate-ship-to-waypoint="onNavigateShipToWaypoint($event)"/>
    <FuelView :fuel="ship.fuel" />
    <button v-if="ship.fuel.current != ship.fuel.capacity && ship.nav.status == 'DOCKED'"
      @click="onRefuelShip()">Refuel</button>
  </div>
  <CargoView v-if="ship.cargo.capacity > 0" :cargo="ship.cargo" can-jetison @jettison-goods="onJettisonGoods($event)"/>
  <CargoTransferView v-if="ship.cargo.units > 0" :cargo="ship.cargo" :ship-symbol="ship.symbol"
    :shipWaypointSymbol="ship.nav.waypointSymbol" />
</template>

<style scoped>
span {
  margin-right: 15px;
}
</style>