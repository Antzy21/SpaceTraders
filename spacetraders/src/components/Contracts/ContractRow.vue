<script setup lang="ts">
import { computed, watch } from 'vue'
import { acceptContract, fulfillContract } from '../../api.ts'
import type { Contract } from '../../types/contract.ts'
import { store } from '../../store.ts';

const props = defineProps<{
  contract: Contract
}>()

let hoursTillDeadline = computed(() => {
  const deadline = new Date(props.contract.terms.deadline)
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()
  const hours = Math.ceil(diff / (1000 * 3600))
  return hours
})

function onAcceptContract(contractId: string) {
  acceptContract(contractId)
  .then(() => {
    store.loadContracts();
  })
}

function fulfillContracts(contracts: Contract[]) {
  contracts.forEach(contract => {
    let contractCanBeCompleted = 
      !contract.terms.deliver.some(delivery => delivery.unitsRequired != delivery.unitsFulfilled) &&
      contract.expiration > new Date().toISOString() &&
      !contract.fulfilled
    if (contractCanBeCompleted) {
      fulfillContract(contract.id);
      store.loadContracts();
    }
  });
}

watch(() => store.myContracts, (contracts) => {
  fulfillContracts(contracts);
})

fulfillContracts(store.myContracts);

</script>

<template>
  <tr>
    <td>{{ contract.type }}</td>
    <td>{{ contract.accepted }}</td>
    <td>{{ contract.fulfilled }}</td>
    <td>
      <span v-if="contract.fulfilled">-</span>
      <span v-else>{{ hoursTillDeadline }}</span>
    </td>
    <td>
      <span v-if="contract.fulfilled">
        {{ contract.terms.payment.onAccepted + contract.terms.payment.onFulfilled }}
      </span>
      <span v-else>
        {{ contract.terms.payment.onAccepted }} + {{ contract.terms.payment.onFulfilled }}
      </span>
    </td>
    <td>
      <div v-for="delivery in contract.terms.deliver">
        {{ delivery.unitsRequired - delivery.unitsFulfilled }} {{ delivery.tradeSymbol }} {{ delivery.destinationSymbol }}
      </div>
    </td>
    <td v-if="!contract.accepted">
      <button @click="onAcceptContract(contract.id)">Y</button>
    </td>
  </tr>
</template>