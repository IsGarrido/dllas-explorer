<template>
    <div v-if="loaded">
        <RadarChart :chartData="chartData" :options="options"></RadarChart>
        <!-- <canvas id="chart"></canvas> -->
    </div>
</template>
  
<script>

// import Chart from "chart.js/auto";
import { Chart, registerables, } from 'chart.js';
import { RadarChart } from 'vue-chart-3';

Chart.register(...registerables);

// import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';

export default {
    props: ["dimensions", "categories", "data", "attribute"],
    components: {
        RadarChart
    },
    created() {
        let labels = this.categories;
        let datasets = this.dimensions.map( (dimension, idx) => {
            let dimension_data = this.data[dimension]; // data[male]
            let values = this.categories.map(category => {
                let catData = dimension_data[category];
                if(!catData) return 0;
                return catData[this.attribute];
            });
            return this.CreateDataset(dimension, values, idx);
        });

        this.chartData = {
            labels,
            datasets
        };

        this.options = {
            elements: {
                line: {
                    borderWidth: 3
                }
            },

            // responsive: true,
            // lineTension: 0,

            scales: {
                // yAxes: [
                //   {
                //     ticks: {
                //       beginAtZero: true,
                //       padding: 25,
                //     },
                //   },
                // ],
            },
            onClick: (e, activeEls) => {
                let datasetIndex = activeEls[0].datasetIndex;
                let dataIndex = activeEls[0].index;
                let dimension = e.chart.data.datasets[datasetIndex].label;
                let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
                let category = e.chart.data.labels[dataIndex];
                console.log("In click", dimension, category, value);
                this.emit("click", { dimension, category, value });
            }
        };

        this.loaded = true;

        // const ctx = document.getElementById("chart");
        // new Chart(ctx, planetChartData);
    },
    data() {
        return {
            loaded: false,
            chartData: {},
            options: {},
            backgroundColors: [
                "rgba(255, 153, 255,.5)",
                "rgba(102, 204, 255,.5)"
            ]
        };
    },
    methods: {
        CreateDataset(label, data, idx) {
            return {
                label,
                data,
                fill: true,
                backgroundColor: this.backgroundColors[idx],
                borderColor: this.backgroundColors[idx],
                pointBackgroundColor: this.backgroundColors[idx],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }
        }
    }
};
</script>
  
<style scoped>

</style>
  