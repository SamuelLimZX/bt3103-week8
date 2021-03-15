<template>
    <div>
      <ul>
        <li><router-link to ="/"> Home </router-link></li>
        <li><router-link to="/orders"> Orders </router-link></li>
        <li><router-link to="/dashboard"> Dashboard </router-link></li>
      </ul>

        <ul>
          <li v-for = "name in orders" v-bind:key = "name"  style = "position: relative">

            <div v-for = "(qty, food) in name[1]" v-bind:key = "food" class = "allitems">
              {{food}} : {{qty}}
            </div>
            <button class = "button1" v-bind:id = "name[0]" v-on:click = "deleteItem($event)"> Delete </button>
            <button class = "button2" v-bind:id = "name[0]" v-on:click = "route($event)"> Modify </button>
            

          </li>
        </ul>
    </div>
    
</template>


<script>
import database from '../firebase.js'
export default {
  data () {
    return {
      orders: []
    }
  },
  methods: {
    fetchItems: function() {
      database.collection('orders').get().then(snapshot => {
        let arr = []
        snapshot.forEach(doc => {
          arr = [doc.id, doc.data()]
          this.orders.push(arr)
        });
      });
    },
    deleteItem: function(event) {

      let doc_id = event.target.getAttribute('id');
      database.collection('orders').doc(doc_id).delete().then(() => {
        alert('Item has been deleted')
        location.reload()
      })
    },
    route: function(event) {
      let doc_id = event.target.getAttribute('id');
      this.$router.push({name: 'mod', params: {id: doc_id}})
    }
  },
  created() {
    this.fetchItems()
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

button {
  flex-grow: 1;
  text-align: center;
  width: 50px;
  height: 20px;
  margin-left: 50%;
  border: 1px solid #222;
  font-size: 12px;
  background-color: greenyellow;
}
 
.allitems {
  margin-right: 50%;
}


.button1 {
  margin-left:70%;  
  position: absolute;
  top: 10px;
  right: 40px;
}

.button2 {
  position: absolute;
  top: 10px;
  right: 100px;
}


</style>