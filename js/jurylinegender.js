function juryLineGender() {
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 35, bottom: 30, left: 30},
      width = 500 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  
  // append the svg object to the body of the page
  var svg = d3.select("figure#genderJuryLine")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
      // * Hard code annotations begins here

    // Draw the annotations - hardcoded as a beginner
  // Add text label for each gender line
  var male = svg.append("text")
  .attr("class", "genderText")
  .text("Male")
  .attr("y", 55)
  .attr("x", "440")
  .style("fill", "#2d2d2d");

  var female = svg.append("text")
  .attr("class", "genderText")
  .text("Female")
  .attr("y", 270)
  .attr("x", "420")
  .style("fill", "#2d2d2d");

  //Read the data
  d3.csv("data/judgesGenderLine.csv", function(data) {
  
    // group the data: Draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
      .key(function(d) {return d.name;})
      .entries(data);
      console.log(sumstat); // categories are nested and works
  
    // Add X axis
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.year; }))
      .range([ 0, width ]);
      svg.append("g")
      .attr( "class", "x_axis" )
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
      .tickPadding([10]) // moves axis labels away from ticks and lines
      .tickSize(-height, 0, 0)
      .tickFormat("")
      .tickFormat(d3.format(".0f"))) // change 1,984 to 1984
      // .call(g => g.selectAll(".tick:not(:first-of-type) line")
      // .attr("stroke-opacity", 0.3) // lightens the gridlines
      .attr("stroke-dasharray", "2,2"); // add gridlines and make them dashed
      // .call(g => g.select(".domain").remove());

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.count; })])
      .range([ height, 0 ]);
      svg.append("g")
      .attr( "class", "y_axis" )
      .call(d3.axisLeft(y)
      .tickPadding([10]) // moves axis labels away from ticks and lines
      .ticks(7)
      .tickSize("0") // remove ticks
      .tickFormat(d3.format("0"))) // change 7.0 to whole numbers
      .call(g => g.select(".domain").remove()); // removes the line for axis
  
  
    // color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
      .domain(res)
      .range(['#a02799','#ff6e5d'])


    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
          .attr("fill", "none")
          .attr("stroke", function(d){ return color(d.key) })
          .attr("stroke-width", 1.5)
          .attr("d", function(d){
            return d3.line()
              .x(function(d) { return x(d.year); })
              .y(function(d) { return y(+d.count); })
              (d.values)
          });
  
  });
  }
  