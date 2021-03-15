<template>
    <div>
        <p style = "font-size: 22px; font-weight:bold">Menu:</p>
        <ul>
            <li class = "items" v-bind:key = "item.name" v-for = "item in sitems">
                <p>{{item[0]}} x {{item[1]}}</p>
            </li>
        </ul>
        <button id = "totalbtn" v-on:click = "findTotal(); sendOrders()"> Add Orders </button>
        <p class = "price" v-show="finalprice.showprice"> Subtotal: ${{finalprice.subtotal}} </p>
        <p class = "price" v-show="finalprice.showprice"> Grand Total: ${{finalprice.grandtotal}} </p>
    </div>
</template>
<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            finalprice: {        
                subtotal:0,
                grandtotal:0,
                showprice: false
            }
        }
    },
    props: {
        sitems: Array,
        allitems: Array
    },
    methods: {
        findTotal() {
            this.finalprice.subtotal = 0;
            this.finalprice.grandtotal = 0;
            for (var i = 0; i < this.sitems.length; i ++) {
                var total = this.sitems[i][1] * this.sitems[i][2];
                this.finalprice.subtotal += total;
            }
            this.finalprice.grandtotal = this.finalprice.subtotal * 1.07;
            this.finalprice.grandtotal = this.finalprice.grandtotal.toFixed(2);
            this.finalprice.showprice = true;
        },
        sendOrders() {
            let totalorder = {};
            let curitem = "";
            let curn = 0;
            let name = "";
            for (var j = 0; j < this.allitems.length; j ++) {
                name = this.allitems[j].name
                totalorder[name] = 0
            }
            for (var i = 0; i < this.sitems.length; i ++) {
                curitem = this.sitems[i][0]
                curn = this.sitems[i][1]
                totalorder[curitem] = curn
            }
            database.collection('orders').add(totalorder).then(() => {
                alert("Your order has been added")
                location.reload()})
        }
        

        
    }

}
</script>

<style>
.price {
    font-weight: bolder;
    font-size: 20px;
    color:midnightblue;
}

#totalbtn {
  background-color:springgreen; /* Green */
  padding: 15px 32px;
  text-align: center;
  width: fit-content;
  height: fit-content;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
}
.items {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 22px;
}
</style>