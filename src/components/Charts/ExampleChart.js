// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data


// STEP 3 - Creating the JSON object to store the chart configurations


// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const ExampleChart=({data})=> {
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Popularity of the languages",
        //Set the chart subcaption
        subCaption: "Members using the languages",
        //Set the x-axis name
        xAxisName: "Language",
        //Set the y-axis name
        yAxisName: "Members",
        numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data
      data,
    }
  };

    return (<ReactFC {...chartConfigs} />);

}

export default ExampleChart