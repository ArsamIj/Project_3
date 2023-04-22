let url = 'http://127.0.0.1:5000/api/stations.json'
let Data_filtered = []
let barrels_per_day = []
let year = []
let Data_spending = []
let Government_Share = [];
let Consumer_spending = [];
let year2 = [];
d3.json(url).then(Data => {

  console.log(Data.length)
  console.log(Data)



  for (let i = 0; i < Data.length; i++) {
    let data = Data[i]
    //console.log(data,data.Year != '0')
    //if (data.Year != '0') {
    Data_filtered.push(data)
    // }

  };
  for (let j = 0; j < Data_filtered.length; j++) {
    let row = Data_filtered[j];
    if(row.Barrels_per_Day !=0){
    barrels_per_day.push(row.Barrels_per_Day);
    year.push(row.Year);

    }
    


  }

  for (let k = 0; k < Data.length; k++) {
    let row1 = Data[k];
    if (row1.Consumer_spending != 0) {
      Data_spending.push(row1);
    }
  };

  for (let l = 0; l < Data_spending.length; l++) {
    let spending_data = Data_spending[l];
    Government_Share.push(spending_data.Government_Share);
    Consumer_spending.push(spending_data.Consumer_spending);
    year2.push(spending_data.Year)
    

  };
  console.log(barrels_per_day)
 //console.log(Data_filtered)
 // console.log(year)
 //console.log(Data_spending)
 //console.log(Government_Share)
  //console.log(Consumer_spending)
  //console.log(year2)






});

function init() {
  let trace1 = {
    x: year,
    y: barrels_per_day,
    type: 'bar',
    textposition: 'auto',
    hoverinfo: barrels_per_day,
    opacity: 0.6,
    marker: {
      color: 'rgb(142,124,195)',
      line: {
        color: 'rgb(8,48,107)',
        width: 1.5
      }
    }
  }

  let data1 = [trace1];
  let layout = {
    title: "Barrels consumption per Year in U.S.A",
    font: { size: 15 },
    autosize: false,
    width: 1000,
    height: 500
  };

  // Use Plotly.newPlot to create the graph
  Plotly.newPlot('bar', data1, layout);
}



// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);



// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data

  let results = [];


  if (dataset == 'graph-1') {
    results = barrels_per_day;
    traceData = [{
      x: year,
      y: barrels_per_day,
      type: "bar",
      text: barrels_per_day.map(String),
      textposition: "auto",
      hoverinfo: barrels_per_day,
      opacity: 0.6,
      marker: {
        color: "rgb(142,124,195)",
        line: {
          color: "rgb(8,48,107)",
          width: 1.5
        }
      }
    }];
    layout = {
      title: "Barrels consumption per Day in U.S.A",
      font: { size: 15 },
      autosize: false,
      width: 1000,
      height: 500
    };
  }
  else if (dataset == 'graph-2') {
    results = Government_Share;

    traceData = [{
      x: year,
      y: Government_Share,
      type: "scatter",
      mode: "lines+markers",
      name: "Government Share",
      marker: { color: "green" }
    }];
    layout = {
      title: "Consumer Spending in EV Market (USA)",
      font: { size: 15 },
      autosize: false,
      width: 1000,
      height: 500
    };

  }
  else if (dataset == 'graph-3') {
    results = Consumer_spending;

    traceData = [{
      x: year,
      y: Consumer_spending,
      type: "scatter",
      mode: "lines+markers",
      name: "Consumer Spending",
      marker: { color: "red" }
    }];
    layout = {
      title: "Government Share in EV Market (USA)",
      font: { size: 15 },
      autosize: false,
      width: 1000,
      height: 500
    };


  }
  updatePlotly(results)
}

function updatePlotly(newdata) {

  Plotly.newPlot("bar", traceData, layout);
}

init();