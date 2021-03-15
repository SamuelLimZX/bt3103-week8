<template>
  <div class="chart">
    <h1 id = "heading">Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
#heading {
  text-align: center;
  background:lightseagreen;
  color:honeydew;
  padding: 10px;
  font-size: 50px;
}
</style>
