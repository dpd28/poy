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
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // do stuff with data

	// Loading data in d3v5
	d3.csv("data/judgesGenderCount.csv")
		// this is a promise load the data first aka await
		.then(
			// our chart goes here
			function(data) {
				// console.log(data);
				// domain refers to the data itself
                // List of gender subgroups = header of the csv files = male, female, NA
                var gender = data.columns.slice(2)

                // List of years = value of the first column called Year -> show on the X axis
                var year = d3.map(data, function(d){return(d.Year)}).keys()

                // Add X axis
                var x = d3.scaleBand()
                .domain(year)
                .range([0, width])
                .padding([0.2])
                svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickSizeOuter(0));

                // Add Y axis
                var y = d3.scaleLinear()
                .domain([0, 16])
                .range([height, 0]);
                svg.append("g")
                .call(d3.axisLeft(y));

                // color palette = one color per subgroup of gender
                var color = d3.scaleOrdinal()
                .domain(gender)
                .range(['#b59365','#a1aeb7','#000'])

                //stack the data? --> stack per subgroup of gender
                var stackedData = d3.stack().keys(gender)
                (data)

                // Show the bars
                svg.append("g")
                .selectAll("g")
                // Enter in the stack data = loop key per key = group per group
                .data(stackedData)
                .enter().append("g")
                 .attr("fill", function(d) { return color(d.key); })
                .selectAll("rect")
                // enter a second time = loop subgroup per subgroup to add all rectangles
                .data(function(d) { return d; })
                .enter().append("rect")
                .attr("x", function(d) { return x(d.data.year); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width",x.bandwidth())

			}
		);
}
