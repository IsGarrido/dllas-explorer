<template>
    <div v-if="loaded">
      <BarChart :chartData="chartData" :options="options"></BarChart>
    </div>
  </template>
  
  <script>
  
  // import Chart from "chart.js/auto";
  import { Chart, registerables,  } from 'chart.js';
  import { BarChart } from 'vue-chart-3';
  
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
    },
    data() {
      return {
        loaded: false,
          chartData: {},
          options: {},
          backgroundColors: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
          
      };
    },
  };
  </script>
  
  <style scoped></style>
  