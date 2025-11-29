<script setup lang='ts'>
import type { Market } from '../../types/market';
import { store } from '../../store';
import { computed } from 'vue';
import CargoView from '../Ships/CargoView.vue';
import type { Resource } from '../../types/resource';
import { sellGoods } from '../../api';

const { market } = defineProps<{
    market: Market
}>();

let shipsAtMarket = computed(() => {
    return store.myShips.filter(ship => 
        ship.nav.waypointSymbol === market.symbol &&
        ship.cargo.inventory.some(c => market.imports.includes(c.symbol))
    )
})

function onSellGoods(shipSymbol: string, resource: Resource) {
  sellGoods(shipSymbol, resource)
    .then(() => {
      store.loadShips();
    });
}

</script>

<template>
    <h3>Market</h3>
    <div v-if="market.tradeGoods?.length > 0">
        Trades: <span v-for="tg in market.tradeGoods">{{ tg.symbol }} - {{ tg.purchasePrice }} - {{ tg.sellPrice }}</span>
    </div>
    <div v-if="market.imports?.length > 0">
        Imports: <span v-for="im in market.imports">{{ im.name }},</span>
    </div>
    <div v-if="market.exports?.length > 0">
        Exports: <span v-for="ex in market.exports">{{ ex.name }}</span>
    </div>
    <div v-if="market.transactions?.length > 0">
        <span>Transactions: <b>{{ market.transactions?.length }}</b></span>
    </div>
    <div v-for="ship in shipsAtMarket">
        <CargoView :cargo="ship.cargo" :canSell="true" @sell-goods="onSellGoods(ship.symbol, $event)"/>
    </div>
</template>

<style scoped>
span {
  margin-right: 5px;
}
</style>