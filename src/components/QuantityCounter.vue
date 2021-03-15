<template>
  <div id="app">
    <button v-on:click = "decrease()"> - </button>
    <div class ="divider"/>
    <div style = "font-size: 20px; display: inline-block"> {{counter}} </div>
    <div class ="divider"/>
    <button v-on:click = "increase()"> + </button>
  </div>
</template>

<script>
    export default {
     name: 'Qty',
     data() {
         return {
             counter: 0,
             title: "Quantity Count"

         }
     },
     props: {
         item: Array
     },
     methods: {
         decrease() {
             if (this.counter > 0) {
                 this.counter--;
             }
             this.$emit('counter', this.item, this.counter)
         },
         increase() {
             if (this.counter > 9) {
                 alert("You cannot buy more than 10 items.");
             } else {
                 this.counter++;
             }
             this.$emit('counter', this.item, this.counter)
         }

     }
    }
</script>

<style>
    .divider{
        width:10px;
        height:auto;
        display:inline-block;
    }
    button {
        background-color: orange;
        height: 30px;
        width: 50px;
        font-size: 20px;
    }
</style>