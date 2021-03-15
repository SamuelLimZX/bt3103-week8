<template>
  <div class="chart">
    <h1 id = "heading">Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./CallAPI.js";

export default {
  components: {
    chart: Chart
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
