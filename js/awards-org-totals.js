function orgTotals() { // object has curly braces, brackets are arrays

	var dimensions = {
		width: window.innerWidth * 0.85, // grab the innerwidth and use 90%
		height: 900,
		margin: {
			top: 20,
			right: 30,
			bottom: 40,
			left: 260,
		}
	};
	// create two new parameters
	// you are choosing from above. chaining from above. descendent selectors, down the tree.

	dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
	dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

	// move into the scaffolding of the chart. 

	var svg = d3.select( "figure#orgTotalAwards" ) // add something to the html container
		.append( "svg" )
		// .attr("width", dimensions.width) // defined earlier on the page
		// .attr("height", dimensions.height);

		.attr( "viewBox", `0 0 ${dimensions.width} ${dimensions.height}` )
		// viewbox retains proportions
		// group the svg
		.append( "g" )
		.attr( "transform", `translate(${dimensions.margin.left},${dimensions.margin.right})` );

	// think of this scale as a function: F(x) = something
	var xScale = d3.scaleLinear() // don't use scale.linear
		// domain refers to the spread of you dataset
		// range is the spread of pixels 0 to boundedWidth
		.range( [ 0, dimensions.boundedWidth ] );

	var yScale = d3.scaleBand()
		.range( [ 0, dimensions.boundedHeight ] )
		.padding( 0.3 );

	// check the data format
	var rowConvertor = function( d ) {
		// look for every line and return an object
		return {
			organization: d.organization, // look for the column variables
			value: +d.value // plus ensures everything in the count column is an integer. If a date, need another function before the parse
		}
	};
	// a new way to write a function (the arrow function)
	var rowConvertor2 = ( d ) => {
		return {
			organization: d.organization,
			value: +d.value
		}
	};
	// Loading data in d3v4
	// d3.csv("data/orgTopAwards.csv", rowConvertor, function(data {
	// do stuff with data
	// })

// Loading data in d3v5
	// d3.csv( "data/orgTopAwards.csv", rowConvertor )
		// this is a promise load the data first aka await
		// .then(
			// our chart goes here
			// function( data ) { //end of d3v5 loading data

// Loading data in d3v4 because of issues
d3.csv( "data/orgTopAwards.csv", rowConvertor, function( data ) {
			// sort data
			data.sort(function(b, a) {
				return a.value - b.value;
			});
				// console.log(data);
				// domain refers to the data itself
				// xScale.domain(d3.extent(data, d => d.value)) 
				// we can update the domain of the xScale with d3.extent
				//xScale.domain(d3.extent(data, function(d) {return d.value}));
				// method is the same as function but used for back to back
				// xScale.domain( [ 0, d3.max( data, d => d.value ) ] ); // accessor - column of data you want to use
				xScale.domain( [ 0, 110 ] );
				yScale.domain( data.map( d => d.organization ) ); // map method

				var xAxis = svg.append( "g" )
					.attr( "class", "x_axis" )
					.call( d3.axisBottom(xScale)
					// add gridlines
					.tickSize(-dimensions.boundedHeight, 0, 0))
					// .tickFormat(""))
					.attr( "transform", `translate(0, ${dimensions.boundedHeight})`)
					// add gridlines and make them dashed
					.attr("stroke-dasharray", "2,2"); 
					// remove the line for axis
					// .call(g => g.select(".domain").remove()); 

				// ! WHAT HAPPENED TO THE X-AXIS LABELS????
				var xAxisText = xAxis.selectAll( "text" )
					.attr( "class", "axis_text" )
					.style( "fill", "#2d2d2d" );

				// add bars after axis to be in front of gridlines
				var bars = svg.selectAll( "rect" )
					// join the selection of rectangles with data and then modify
					.data( data )
					.enter() // adds the rectangles
					.append( "rect" )
					.attr( "y", d => yScale( d.organization ) ) // set the position of the rectangle and match category names
					.attr( "width", d => xScale( d.value ) )
					.attr( "height", yScale.bandwidth() )
					.attr( "fill", "#47bedb" );

				var yAxis = svg.append( "g" )
					.attr( "class", "y_axis" )
					.call( d3.axisLeft( yScale )
					// move axis labels away from ticks and lines
					.tickPadding([10]) 
					// remove ticks
					.tickSize("0")) 
					.call(g => g.select(".domain").remove()); // removes the line for axis

				var yAxisText = yAxis.selectAll( "text" )
					.attr( "class", "axis_text" )
					.style( "fill", "#2d2d2d" );

			}
		);
}
