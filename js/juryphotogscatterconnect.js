function femaleScatter() {
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 1072 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#femalescatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/femalejurorsphotogs8404.csv", function(data) {

// var jurors = d3.map(data, function (d) {
//         return (d.juror)
//       }).keys()

  // Add X axis
  var x = d3.scaleLinear() // changed 
    .domain([0.4, 1.00])
    .range([ 0, width ]);
    svg.append("g")
    .attr( "class", "x_axis" )
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // text label for the x axis
    svg.append("text")             
    .attr("transform",
        "translate(" + (width/2) + " ," + 
                       (height + margin.top + 45) + ")")
    .attr("class", "xlabel")
    .style("text-anchor", "middle")
    .text("Percent of Female Jurors");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 0.3])
    .range([ height, 0]);
    svg.append("g")
    .attr( "class", "y_axis" )
    .call(d3.axisLeft(y));
  
    // text label for the y axis
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "ylabel")
    .style("text-anchor", "middle")
    .text("Percent of Female Winners"); 
    
    // Add the line
    svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
    .x(function(d) { return x(d.juror) })
    .y(function(d) { return y(d.winner) })
    )

    // Add a scale for bubble size
    // var size = d3.scaleLinear()
    //   .domain([0,1])  // What's in the data
    //   .range([ 5, 50])  // Size in pixel

    // var opacity = d3.scaleLinear()
    //   .domain([0, 1]) // What's in the data
    //   .range([1, 0]) // Opacity

  // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#femalescatter")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute") //position the tooltip container
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "1px solid #eeeeee")
    .style("border-width", "1px")
    .style("border-radius", "3px")
    .style("padding", "10px")
    .style("pointer-events", "none") // Tip from Erin Brown to prevent mouseover shenanigans
    .style("font-size", "13px");

  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  }

  var mouseover = function(d) {
    tooltip.style("opacity", 1)
    .style("left", (d3.event.pageX+20) + "px")
    .style("top", (d3.event.pageY-10) + "px")
    .html(d.year + "<br>" + "% female jurors " + d.juror + "<br>" + "% female winners: " + d.winner)
        console.log("x: "+d3.mouse(this)[0]+" and y: "+d3.mouse(this)[1]); // check position of cursor
  }

  var mouseout = function(d) {
    tooltip
      .style("opacity", 0)
  } // end for mouseout

  // Add dots
  svg.append("g")
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.juror) } )
    .attr("cy", function(d) { return y(d.winner) } )
    .attr("r", 5)
    .attr("fill", "#69b3a2")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);


  // svg.append('g')
  //   .selectAll("dot")
  //   .data(data)
   // .data(data.filter(function(d,i){return i<50})) the .filter part is just to keep a few dots on the chart, not all of them
    // .enter()
    // .append("circle")
    //   .attr("cx", function (d) { return x(d.year); } )
    //   .attr("cy", function (d) { return y(d.juror); } )
    //   .attr("r", function(d){ return size(d.winner); })
    //   .style("fill", "#7859a0") //  I like this color #69b3a2 orange e57945 green d1d64d
    //   .style("fill-opacity", function(d){ return opacity(d.winner); })
    //   .style("stroke", "white")
    //   .on("mouseover", mouseover)
    //   .on("mouseout", mouseout);

});
}