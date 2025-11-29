<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiGet, apiPost } from '../apiBase.ts'

let query = ref('/my/agent')

type Result = {
  query: string
  data: string
}

let results = ref<Result[]>([])

let isPost = ref(false)

function fetchData() {
  if (isPost.value) {
    apiPost(interpolatedQuery.value)
    .then(response => response.json())
    .then(data => {
      var result = {
        query: interpolatedQuery.value,
        data: JSON.stringify(data)
      }
      if (!results.value.includes(result)) {
        results.value.push(result)
      }
    })
  }
  else {
    apiGet(interpolatedQuery.value)
      .then(response => response.json())
      .then(data => {
        var result = {
          query: interpolatedQuery.value,
          data: JSON.stringify(data)
        }
        if (!results.value.includes(result)) {
          results.value.push(result)
        }
      })
  }
}

let interpolatedQuery = computed(() => {
  return query.value
    .replace('https://api.spacetraders.io/v2', '')
    .replace(':systemSymbol', 'X1-VN47')
    .replace(':waypointSymbol', 'X1-VN47-A1')
    .replace(':shipyardWaypointSymbol', 'X1-VN47-A2')
    .replace(':miningShipSymbol', 'ANTZY21-3')
})

</script>

<template>
  <h2>API Testing</h2>
  <div>
    Post <input type="checkbox" id="checkbox" v-model="isPost" />
    <input v-model="query" placeholder="Enter query" />
    <button type="button" @click="fetchData()">Fetch Data</button>
  </div>

  <div>
    <h3 v-if="results.length > 0">Previous Results:</h3>
    <div v-for="(result, index) in results.slice().reverse()" :key="result.query">
      <span>{{ result.query }}</span>
      <pre>{{ result.data }}</pre>
    </div>
  </div>
</template>

<style scoped>
pre {
    white-space: wrap
}
</style>