<script setup lang='ts'>
import { computed, ref } from 'vue';
import type { Cargo } from '../../types/cargo';
import { store } from '../../store';
import { transferCargo } from '../../api';
import type { Resource } from '../../types/resource';

const { cargo, shipSymbol, shipWaypointSymbol } = defineProps<{
    cargo: Cargo,
    shipSymbol: string,
    shipWaypointSymbol: string
}>();

let shipToTransferTo = ref<string>("")
let resourceToTransfer = ref<Resource>()

var shipsToTransferTo = computed(() => {
    return store.myShips.filter(ship => ship.nav.waypointSymbol === shipWaypointSymbol).map(ship => ship.symbol)
})

function onTransferCargo(shipSymbol: string, targetShipSymbol: string, resource: Resource) {
    transferCargo(shipSymbol, targetShipSymbol, resource)
        .then(() => {
            resourceToTransfer.value = undefined
            shipToTransferTo.value = ""
            store.loadShips();
        })
}

</script>

<template>
    <span>Transfer</span>
    <select v-model="resourceToTransfer">
        <option v-for="resource in cargo.inventory" :value="resource">{{ resource.name }} - {{ resource.units }}
        </option>
    </select>
    <span> to </span>
    <select v-if="shipsToTransferTo.length > 0" v-model="shipToTransferTo">
        <option v-for="ship in shipsToTransferTo" :value="ship">{{ ship }}</option>
    </select>
    <button v-if="shipToTransferTo && resourceToTransfer"
        @click="onTransferCargo(shipSymbol, shipToTransferTo, resourceToTransfer)">T to {{ shipToTransferTo }}</button>
</template>

<style scoped></style>