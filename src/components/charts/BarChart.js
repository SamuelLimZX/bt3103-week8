import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                // label: "",
                backgroundColor: ["#3e95cd","#8e5ea2","#3cba9f","#e8c3b9","#c45850","#ffdb58"],
                data: []
              }]
        },
        options: {
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
            },
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 

          for (const [key, value] of Object.entries(doc.data())) {
            if (!this.datacollection.labels.includes(key)) {
              this.datacollection.labels.push(key)
              this.datacollection.datasets[0].data.push(value)
            } else {
              var index = this.datacollection.labels.indexOf(key)
              this.datacollection.datasets[0].data[index] = +this.datacollection.datasets[0].data[index] + +value
            }

          }

            // this.datacollection.labels.push(doc.data())
            // // this.datacollection.datasets[0].backgroundColor.push(doc.data().color)
            // this.datacollection.datasets[0].data.push(doc.data())
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}

