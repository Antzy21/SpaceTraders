<script setup lang="ts">
import ShipView from './ShipView.vue'
import { store } from '../../store';

store.loadShips()

</script>

<template>
    <h2>Ships</h2>
    <div class="container" v-for="ship in store.myShips" :key="ship.symbol">
        <ShipView :ship="ship" />
    </div>
    <button @click="store.loadShips()">Refresh Ships</button>
</template>

<style scoped>

span {
    margin-right: 15px;
}
</style>