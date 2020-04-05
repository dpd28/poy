function juryGender() { // object has curly braces, brackets are arrays

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 1072 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // move into the scaffolding of the chart. 
    
    // append the svg object to the body of the page
    let svg = d3.select("figure#genderJury")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // do stuff with data

	// Loading data in d3v5
	d3.csv("data/judgesGenderCount.csv")
		// this is a promise load the data first aka await
		.then(
			// our chart goes here
			function(data) {
				//Set up stack method
			var stack = d3.stack()
            .keys([ "Male", "Female", "NA" ]);
         // List of years = value of the first column called Year -> show on the X axis
         var gender = data.columns.slice(2);
         var year = d3.map(data, function(d){return(d.Year)}).keys()

//Data, stacked
var series = stack(data);

//Set up scales
var xScale = d3.scaleBand()
  .domain(year)
  .range([0, width])
  .paddingInner(0.05);

var yScale = d3.scaleLinear()
  .domain([0,				
      d3.max(data, function(d) {
          return d.Male + d.Female + d.NA;
      })
  ])
  .range([0, height]);
  
//Easy colors accessible via a 10-step ordinal scale
var colors = d3.scaleOrdinal(d3.schemeCategory10);

// Add a group for each row of data
var groups = svg.selectAll("g")
  .data(series)
  .enter()
  .append("g")
  .style("fill", function(d, i) {
      return colors(i);
  });

// Add a rect for each data value
var rects = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
      return xScale(i);
  })
  .attr("y", function(d) {
      return yScale(d[0]);
  })
  .attr("height", function(d) {
      return yScale(d[1]) - yScale(d[0]);
  })
  .attr("width", xScale.bandwidth());

			}
		);
}
