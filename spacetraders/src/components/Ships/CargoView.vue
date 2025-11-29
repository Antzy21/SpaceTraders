<script setup lang='ts'>
import type { Cargo } from '../../types/cargo';
import type { Resource } from '../../types/resource';

const { cargo, canSell = false, canJetison = false } = defineProps<{
    shipSymbol?: string,
    cargo: Cargo,
    canSell?: boolean
    canJetison?: boolean
}>();

const emit = defineEmits<{
    (e: 'jettison-goods', resource: Resource): void;
    (e: 'sell-goods', resource: Resource): void;
}>();

</script>

<template>
<div>
    <div>Cargo: <b>{{ cargo.units }}/{{ cargo.capacity }}</b></div>
    <span v-for="resource in cargo.inventory">
        <b>{{ resource.units }}-{{ resource.name }}</b>
        <button v-if="canSell" @click="emit('sell-goods', resource)">S</button>
        <button v-if="canJetison" @click="emit('jettison-goods', resource)">J</button>
    </span>
</div>
</template>

<style scoped>
span {
  margin-right: 15px;
}
</style>