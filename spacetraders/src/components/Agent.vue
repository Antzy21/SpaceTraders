<script setup lang="ts">
import { ref } from 'vue'
import { getMyAgent } from '../api.ts'
import type { Agent } from '../types/agent.ts'
import LocationButton from './Locations/LocationButton.vue'

let agent = ref<Agent>()

getMyAgent().then(response => {
  agent.value = response
})

</script>

<template>  
  <div v-if="agent">
    <span>Symbol: <b>{{ agent.symbol }}</b></span>
    <span>Headquarters: <LocationButton :symbol="agent.headquarters" /></span>
    <span>Credits: <b>{{ agent.credits }}</b></span>
    <span>Starting Faction: <b>{{ agent.startingFaction }}</b></span>
    <span>Ship Count: <b>{{ agent.shipCount }}</b></span>
  </div>
</template>

<style scoped>
div {
  padding: 10px;
}
span {
  margin-right: 15px;
}
</style>