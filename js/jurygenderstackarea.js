function juryStack() {
/// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("figure#genderJuryStack")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/judgesGenderLine.csv", function(data) {

// group the data: one array for each value of the X axis.
var sumstat = d3.nest()
.key(function(d) { return d.year;})
.entries(data);

// Stack the data: each group will be represented on top of each other
var mygroups = ["NA", "Female", "Male"] // list of group names
var mygroup = [1,2,3] // list of group names
var stackedData = d3.stack()
.keys(mygroup)
.value(function(d, key){
  return d.values[key].percent}) // getting an error message here about undefined - again AHHHHHHHHHHHHHHHH!!!!!!
(sumstat)

// Add X axis --> it is a date format
var x = d3.scaleLinear() // Should this be scaleBand?????
.domain(d3.extent(data, function(d) { return d.year; }))
.range([ 0, width ]);
svg.append("g")
.attr( "class", "x_axis" )
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x).ticks(5));

// Add Y axis
var y = d3.scaleLinear()
.domain([0, d3.max(data, function(d) { return +d.percent; })*1.2])
.range([ height, 0 ]);
svg.append("g")
.attr( "class", "y_axis" )
.call(d3.axisLeft(y));

// color palette
var color = d3.scaleOrdinal()
.domain(mygroups)
.range(['#e41a1c','#377eb8','#4daf4a'])

// Show the areas
svg
.selectAll("mylayers") // <--- DONT UNDERSTAND THIS PART WHY mylayers?????
.data(stackedData)
.enter()
.append("path")
  .style("fill", function(d) { name = mygroups[d.key-1] ;  return color(name); })
  .attr("d", d3.area()
    .x(function(d, i) { return x(d.data.key); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })
      )

});
}// end function