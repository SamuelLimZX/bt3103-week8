<template>
  <div>
      <ul id = "allitemsList">
        <li><router-link to ="/"> Home </router-link></li>
        <li><router-link to="/orders"> Orders </router-link></li>
        <li><router-link to="/dashboard"> Dashboard </router-link></li>
      </ul>
      <ul id = "allitemsList">
            <li v-bind:key = "item.name" v-for="item in items">
                <div id = "itemName"> {{item.name}} </div>
                <br>
                <img v-bind:src = "item.imageURL"/>
                <br>
                <div id = "price"> ${{item.price}} </div>
                <br><br>
                <qtycount v-bind:item = "item" v-on:counter = "onCounter"></qtycount>
            </li>
      </ul> 
      <basket id = "shoppingBasket" v-bind:sitems = "itemsSelected" v-bind:allitems = "items"></basket>

  </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'
export default {
  data () {
    return {
      itemsSelected: [],
      items: []
    }
  },
  components: {
    qtycount: QuantityCounter,
    basket: Basket,
  },
  methods: {
    onCounter: function (item, count) {
        
      if (this.itemsSelected.length == 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        var flag = false;

        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          if (item.name == item_name) {
            // if item_name is the same as item.name and the count is more than 0, 
            //update this.itemsSelected
            if (count > 0) {
              //curr_item[1] = count;
              this.itemsSelected.splice(i, 1);
              this.itemsSelected.splice(i, 0, [item.name, count, item.price]);
              flag = true;
              break;
            } else if (count == 0) {
              
              // Next, item_name is the same as item.name and the count is 0
              //, remove it from itemsSelected.

              this.itemsSelected.splice(i, 1)
              flag = true;
              break;
            }
              
          }
        }
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.

        if (!flag && count > 0) {
            this.itemsSelected.push([item.name, count, item.price]);
        }
      
      }
    },
      fetchItems: function() {
        database.collection('menu').get().then(snapshot => {
          let item = {}
          snapshot.forEach(doc => {
            item = doc.data()
            item.show = false
            item.id = doc.id
            this.items.push(item)
          });
        });
      }
  },
  created() {
    this.fetchItems()
  }
    

}

          
</script>

<style scoped>
#allitemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 245px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 25px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#itemName {
  font-size: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
 
.Nav {

  width: 48%;
  margin-right: 12px;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #222;
  color: green;
  display: inline-block;
}

</style>