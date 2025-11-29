<script setup lang="ts">
import ContractRow from './ContractRow.vue'
import { store } from '../../store';

store.loadContracts()

</script>

<template>
  <h2>Contracts</h2>
  <table>
    <tbody>
      <tr>
        <th>Type</th>
        <th>Accepted</th>
        <th>Fullfilled</th>
        <th>Due</th>
        <th>Pay</th>
        <th>Deliveries</th>
        <th>Accept</th>
      </tr>
    </tbody>
    <tbody>
      <ContractRow v-for="contract in store.myContracts" :contract="contract" :key="contract.id" />
    </tbody>
  </table>
  <div>
    <button @click="store.loadContracts()">Refresh Contracts</button>
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