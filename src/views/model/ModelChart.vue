<template>
  <div v-if="loaded">
    <BarChart :chartData="chartData" :options="options"></BarChart>
    <!-- <canvas id="chart"></canvas> -->
  </div>
</template>

<script>

// import Chart from "chart.js/auto";
import { Chart, registerables,  } from 'chart.js';
import { BarChart, useBarChart } from 'vue-chart-3';

Chart.register(...registerables);

// import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';

export default {
  props: ["labels", "data", "datalabels" ],
  components: {
    BarChart
  },
  created() {
    let datasets = this.labels.map( (label, idx) => {
      return {
        label: label,
        data: this.data[label],
        backgroundColor: this.backgroundColors[idx],
        borderColor: "#000000",
        borderWidth: 2,
      }
    });

    this.chartData = {
        labels: this.datalabels,
        datasets
      };

    this.options = {
        responsive: true,
        lineTension: 0,

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
};
</script>

<style scoped></style>
