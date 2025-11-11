<script setup lang='ts'>
import { ref } from 'vue';
import { store } from './store';

let alternativeAgentToken = ref("")
let environmentVariabesLoaded = ref(store.env.AGENT_TOKEN)

function tryAlternativeAgentToken() {
    const url = store.env.API_BASE_URL + "/my/agent"
    fetch(url.toString(), {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${alternativeAgentToken.value}`,
        },
    })
    .then((response) => {
        if (response.ok) {
            store.env.AGENT_TOKEN = alternativeAgentToken
            console.log("loaded successfully");
            environmentVariabesLoaded.value = true;
        }
        else {
            environmentVariabesLoaded.value = false;
            console.error(`Token failed: "${alternativeAgentToken.value}"`)
        }
    })
}
</script>

<template>
    <div v-if="!environmentVariabesLoaded" class="container">
        <h2>
            Environment Variables Not Loaded
        </h2>
        Agent Token: <input v-model="alternativeAgentToken"></input>
        <button @click="tryAlternativeAgentToken">Enter</button>
    </div>
    <slot v-else></slot>
</template>

<style scoped></style>