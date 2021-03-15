<template>
    <div>
        <router-link to ="/" class = "Nav"> Home </router-link>
        <router-link to="/Nav" class = "Nav"> Orders </router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>


.Nav {
  width: 49%;
  margin-right: 12px;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #222;
  color: green;
  display: inline-block;
}

</style>
