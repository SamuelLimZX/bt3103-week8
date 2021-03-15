<template>
    <div>
        
        <div v-for = "(item, index) in datapacket" v-bind:key = "item">
            {{item[0]}} : {{item[1]}} <br>
            <input v-bind:id = "index" placeholder =0 type="number" min="0">
            <br><br>
        </div>
        <button v-on:click = "updateOrder()"> Update Order </button>
        
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            datapacket: [],
            updateddatapacket:[],
            curid: ""
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').doc(this.curid).get().then(snapshot => {
                let localdata = []
                localdata.push(snapshot.data())
                let a = localdata[0]

                for (let k in a) {
                    let currarr = []
                    currarr.push(k)
                    currarr.push(a[k])
                    const currarr2 = [...currarr]
                    this.datapacket.push(currarr)
                    this.updateddatapacket.push(currarr2)
                } 
            });
        },
        updateOrder: function() {
            for (var j = 0; j < this.updateddatapacket.length; j++) {

                var nitem = 0;
                // alert(document.getElementById("0").value)
                if (document.getElementById(j).value.length !== 0) {
                    
                    nitem = document.getElementById(j).value
                }

                this.updateddatapacket[j][1] = nitem
            }
            for (var n = 0; n < this.updateddatapacket.length; n++) {
                var curitem = this.updateddatapacket[n][0]
                var curcount = this.updateddatapacket[n][1]
                database.collection('orders').doc(this.curid).update({
                    [curitem]: curcount
                })
            }
            alert("Order has been updated")
            this.$router.push({path: '/orders'})
        }
    },
    created() {
        this.curid = this.$route.params.id
        this.fetchItems()


    }
    
}
</script>

<style scoped>
button {
  width: fit-content;
  height: fit-content;
  padding: 10px;
  margin-left: 20px;
  font-size: 15px;
  background-color: greenyellow;
  border-radius: 10px;
  border-width: 1px;
}


</style>