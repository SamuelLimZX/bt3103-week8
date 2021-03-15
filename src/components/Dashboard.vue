<template>
    <div>
        <ul>
            <li><router-link to ="/"> Home </router-link></li>
            <li><router-link to="/orders"> Orders </router-link></li>
            <li><router-link to="/dashboard"> Dashboard </router-link></li>
        </ul>
        <barchart></barchart>
        <psi></psi>

    </div>
</template>

<script>

import BarChart from './charts/BarChart.vue'
import PSI from './CallAPI.vue'

export default {
  name: 'app',
  components: {
    barchart: BarChart,
    psi: PSI
  }
}
</script>

<style scoped>

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

</style>