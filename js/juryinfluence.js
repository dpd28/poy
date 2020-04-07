function juryInfluence() {
// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 70, left: 70},
  width = 1072 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("figure#juryInfluence")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add a X axis
var x = d3.scaleLinear()
  .domain([0, 8])
  .range([0, width]);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSizeOuter(0))
  .selectAll("text")
// .style("text-anchor", "end");

// Read the csv, it has a column called Value and another called Country
d3.csv("data/juryinfluence.csv", function(data) {

  // Use d3-force algorithm to find a position for each entity
  var simulation = d3.forceSimulation(data)
      .force("x", d3.forceX(function(d) { return x(d.value); }).strength(5))
      .force("y", d3.forceY(height / 2))
      .force("collide", d3.forceCollide(6))
      .stop();
  for (var i = 0; i < 300; ++i) simulation.tick();

  // prepare data
  var cell = svg.append("g")
    .selectAll("g")
    .data(d3.voronoi()
      .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.top]])
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; })
      .polygons(data)
    )
    .enter()
    .append("g");

  // Finally append the circles
  cell.append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return d.data.x; })
        .attr("cy", function(d) { return d.data.y; });

});
}