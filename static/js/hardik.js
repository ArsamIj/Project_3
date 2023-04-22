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

    Data_filtered.push(data)


  };
  for (let j = 0; j < Data_filtered.length; j++) {
    let row = Data_filtered[j];
    if (row.Barrels_per_Day != 0) {
      barrels_per_day.push(row.Barrels_per_Day);
      year.push(row.Year);

    }

  };

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
 init();
});

console.log(barrels_per_day)
console.log(year)










function init() {


  let data1 = []
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
    title: "Barrels consumption per Year in U.S.A",
    font: { size: 15 },
    autosize: false,
    width: 1000,
    height: 500
  };
  data1 = traceData;

  Plotly.newPlot('bar', data1, layout);
}

d3.selectAll("#selDataset").on("change", getData);


function getData() {
  let dropdownMenu = d3.select("#selDataset");

  let dataset = dropdownMenu.property("value");


  let results = [];


  if (dataset == 'graph-1') {

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
      title: "Barrels consumption per Year in U.S.A",
      font: { size: 15 },
      autosize: false,
      width: 1000,
      height: 500
    };
    results = traceData;

  }
  else if (dataset == 'graph-2') {
    //results = Government_Share;

    traceData = [{
      x: year2,
      y: Government_Share,
      type: "scatter",
      mode: "lines+markers",
      name: "Government Share",
      marker: { color: "red" }
    }];
    layout = {
      title: "Government Share in EV Market (USA)",
      font: { size: 15 },
      autosize: false,
      width: 1000,
      height: 500
    };
    results = traceData;

  }
  else if (dataset == 'graph-3') {
    //results = Consumer_spending;

    traceData = [{
      x: year2,
      y: Consumer_spending,
      type: "scatter",
      mode: "lines+markers",
      name: "Consumer Spending",
      marker: { color: "green" }
    }];
    layout = {
      title: "Consumer Share in EV Market (USA)",
      font: { size: 15 },
      autosize: false,
      width: 1000,
      height: 500
    };
    results = traceData;

  }
  updatePlotly(results)
}

function updatePlotly(newdata) {

  Plotly.newPlot("bar", newdata, layout);
}

