<script setup lang="ts">
import HelloWorld from './components/Title.vue'
import Agent from './components/Agent.vue'
import Contracts from './components/Contracts/Contracts.vue'
import ApiTesting from './components/ApiTesting.vue'
import LocationSearch from './components/Locations/LocationSearch.vue'
import Ships from './components/Ships/Ships.vue'
import BackupTokens from './BackupTokens.vue'

</script>

<template>
  <HelloWorld />
  <BackupTokens>
    <div class="container">
      <Agent />
    </div>
    <div class="container">
      <Ships />
    </div>
    <div class="container">
      <Contracts />
    </div>
    <div class="container">
      <LocationSearch />
    </div>
    <div class="container">
      <ApiTesting />
    </div>
  </BackupTokens>
</template>

<style scoped>
.container {
  margin: 0.4rem;
  padding: 0.3rem;
  width: 100%;
}
</style>
