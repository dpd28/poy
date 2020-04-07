function photogGender() {
// set the dimensions and margins of the graph
var margin = {
    top: 10,
    right: 30,
    bottom: 20,
    left: 50
  },
  width = 1072 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("figure#genderPhotogs")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("data/photogsGenderCount.csv", function (data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function (d) {
    return (d.group)
  }).keys()

  // Add X axis
  var x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0,400])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    // .range(['#5a5e7a', '#c12626', '#e9ce2c'])
    // .range(['#5a5e7a', '#6a8f8f', '#e57945']) 
    // .range(['#5a5e7a', '#db704c', '#98bdd7'])    
    // .range(['#333333', '#db704c', '#98bdd7'])   
    // .range(['#e57945', '#624c99', '#d1d64d'])        
    // .range(['#d42b21', '#f4ba3b', '#7CB46D'])     
    .range(['#e57945', '#7859a0', '#d1d64d'])          
  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // ----------------
  // Create a tooltip
  // ----------------
  var tooltip = d3.select("figure#genderPhotogs")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute") //position the tooltip container
    .style("background-color", "white")
    .style("border", "solid 1px #eeeeee")
    .style("border-width", "1px")
    .style("border-radius", "3px")
    .style("padding", "10px")
    .style("pointer-events", "none") // Tip from Erin Brown to prevent mouseover shenanigans
    .style("font-size", "13px");

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    var subgroupValue = d.data[subgroupName];
    tooltip.style("opacity", 1)
      .style("left", (d3.event.pageX+20) + "px")
      .style("top", (d3.event.pageY-10) + "px")
        .html("Gender: " + subgroupName + "<br>" + "Number: " + subgroupValue)
        console.log("x: "+d3.mouse(this)[0]+" and y: "+d3.mouse(this)[1]); // check position of cursor
  }
  // var mousemove = function(d) {
  //   tooltip
  //     .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
  //     .style("top", (d3.mouse(this)[1]) + "px")
  // }
  var mouseout = function(d) {
    tooltip
      // .transition()
      .style("opacity", 0)
  } // end for mouseout

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
    .attr("fill", function (d) {
      return color(d.key);
    })
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(function (d) {
      return d;
    })
    .enter().append("rect")
    .attr("x", function (d) {
      return x(d.data.group);
    })
    .attr("y", function (d) {
      return y(d[1]);
    })
    .attr("height", function (d) {
      return y(d[0]) - y(d[1]);
    })
    .attr("width", x.bandwidth())
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
    // added for mouseover - don't need these with mouseout
      // .on("mousemove", mousemove)

});
} // end photoGender function