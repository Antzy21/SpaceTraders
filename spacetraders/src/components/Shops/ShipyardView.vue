<script setup lang='ts'>
import { computed } from 'vue';
import { buyShip } from '../../api';
import type { Shipyard } from '../../types/shipyard';
import { store } from '../../store';

const { shipyard, waypointSymbol } = defineProps<{
    shipyard: Shipyard,
    waypointSymbol: string
}>();

function clickBuyShip(shipType: string) {
    buyShip(shipyard.symbol, shipType)
    .then(() => {
        store.loadShips();
    });
}

var shipIsAtShipyard = computed(() => {
    return store.myShips.some(ship => ship.nav.waypointSymbol === waypointSymbol)
})

</script>

<template>
    <h3>Shipyard</h3>
    <span v-if="!shipyard.ships" v-for="ship in shipyard.shipTypes">
        {{ ship.type }}
    </span>
    <div v-for="ship in shipyard.ships">
        {{ ship.type }}
        {{ ship.purchasePrice }}
        <button v-if="shipIsAtShipyard" @click="clickBuyShip(ship.type)">Buy</button>
    </div>
</template>

<style scoped>
span {
  margin-right: 15px;
}
</style>