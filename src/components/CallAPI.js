import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
                {
                    label: "North",
                    data: [],
                    fill: false,
                    borderColor: "#3e95cd"
                },
                {
                    label: "South",
                    data: [],
                    fill: false,
                    borderColor: "#8e5ea2"
                },
                {
                    label: "East",
                    data: [],
                    fill: false,
                    borderColor: "#3cba9f"
                },
                {
                    label: "West",
                    data: [],
                    fill: false,
                    borderColor: "#e8c3b9"
                },
                {
                    label: "Central",
                    data: [],
                    fill: false,
                    borderColor: "#c45850"
                },
                {
                    label: "National",
                    data: [],
                    fill: false,
                    borderColor: "#ffdb58"
                },
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {

    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var result = []
            result = response.data.items
            //console.log(result)
            for (var i = 0; i < result.length; i ++) {
                this.datacollection.labels.push(result[i].timestamp)

                var readings = result[i].readings
                console.log(readings)
                var psi = readings.psi_twenty_four_hourly

                this.datacollection.datasets[0].data.push(psi.north)
                this.datacollection.datasets[1].data.push(psi.south)
                this.datacollection.datasets[2].data.push(psi.east)
                this.datacollection.datasets[3].data.push(psi.west)
                this.datacollection.datasets[4].data.push(psi.central)
                this.datacollection.datasets[5].data.push(psi.national)
            }
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}