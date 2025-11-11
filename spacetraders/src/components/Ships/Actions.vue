<script setup lang='ts'>
import { computed, ref } from 'vue';
import { extractShip, deliverCargo } from '../../api';
import { store } from '../../store';
import type { ExtractionResponse } from '../../types/extractionResponse';
import type { Ship } from '../../types/ship';
import type { Contract } from '../../types/contract';

const { ship } = defineProps<{
  ship: Ship
}>();

let extractionTime = ref(Date.now());

function onExtraction() {
  extractShip(ship.symbol)
    .then((response: ExtractionResponse) => {
      extractionTime.value = Date.now();
      store.loadShips();
      if (ship.cargo.capacity > 0) {
        setTimeout(() => {
          onExtraction()
        }, response.cooldown.totalSeconds * 1000);
      }
    })
}

var goodToDeliver = computed(() => {
    return ship.cargo.inventory.filter(resource => {
        return store.myContracts.some((contract: Contract) => {
            return contract.terms.deliver.some(delivery => {
                return delivery.tradeSymbol === resource.symbol &&
                    delivery.destinationSymbol === ship.nav.waypointSymbol;
            })
        })
    });
})

function onDeliverCargo() {
    goodToDeliver.value.forEach(resource => {
        var contractIndex = store.myContracts.findIndex((contract: Contract) => {
            return contract.terms.deliver.some(delivery => {
                return delivery.tradeSymbol === resource.symbol &&
                    delivery.destinationSymbol === ship.nav.waypointSymbol;
            })
        })
        if (contractIndex != -1) {
            deliverCargo(store.myContracts[contractIndex]!.id, ship.symbol, resource)
                .then(() => {
                    store.loadShips();
                    store.loadContracts();
                });
        }
    });
}

</script>

<template>
    <span v-if="ship.nav.status == 'IN_ORBIT' && ship.registration.role == 'EXCAVATOR'">
        <button @click="onExtraction()">Extract Resources</button>
    </span>
    <span v-if="ship.nav.status == 'DOCKED' && goodToDeliver.length > 0">
        <button @click="onDeliverCargo()">Deliver Goods</button>
    </span>
</template>

<style scoped>
</style>