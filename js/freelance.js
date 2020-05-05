function freelance() { // object has curly braces, brackets are arrays

	var dimensions = {
		width: window.innerWidth * 0.85, // grab the innerwidth and use 90%
		height: 900,
		margin: {
			top: 20,
			right: 20,
			bottom: 30,
			left: 70,
		}
	};

	// create two new parameters
	// you are choosing from above. chaining from above. descendent selectors, down the tree.

	dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
	dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

	// move into the scaffolding of the chart. 

	var freelance = d3.select( "figure#freelance" ) // do something to the specified html container
		.append( "svg" )
		// .attr("width", dimensions.width) // we defined this earlier on the page
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

	// var xAxisGenerator = d3.axisBottom(xScale);

	var yScale = d3.scaleBand()
		.range( [ 0, dimensions.boundedHeight ] )
		.padding( 1 );

	// check the data format
	var rowConvertor = function( d ) {
		// look for every line and return an object
		return {
			year: d.year, // look for the column variables
			percent: +d.percent // plus ensures everything in the count column is an integer. If a date, need another function before the parse
		}
	};
	// a new way to write a function (the arrow function)
	var rowConvertor2 = ( d ) => {
		return {
			year: d.year,
			percent: +d.percent
		}
	};

	// Loading data in d3v5
	// d3.csv( "data/freelanceNumAwards84-04.csv", rowConvertor )
		// this is a promise of loading the data (await)
		// .then(
			// chart goes here
			//function( data ) { //end load data d3v5
	// load data d3v4 due to issues with v5
	d3.csv( "data/freelanceNumAwards84-04.csv", rowConvertor, function( data ) {
				// console.log(data);
				// domain refers to the data itself
				// xScale.domain(d3.extent(data, d => d.percent)) 
				// we can update the domain of the xScale with d3.extent
				//xScale.domain(d3.extent(data, function(d) {return d.percent}));
				// method is the same as function but used for back to back
			// * Below was original statement but plot went to far to edge
				// xScale.domain( [ 0, d3.max( data, d => d.percent ) ] );
			// * Adjust the scale manually but update the number of ticks generated
				xScale.domain( [ 0, 0.35 ] ); 

				// accessor is which column of data you want to use
				yScale.domain( data.map( d => d.year ) ); // map method

				var line = freelance.selectAll( "myLine" )
					.data( data )
					.enter()
					.append( "line" )
					.attr( "x1", d => xScale( d.percent ) )
					.attr( "x2", xScale( 0 ) )
					.attr( "y1", d => yScale( d.year ) + 0.5 )
					.attr( "y2", d => yScale( d.year ) + 0.5 )
					.attr( "stroke-width", 1 )
					.attr( "stroke", "#2d2d2d" );

				// xAxisGenerator.tickSize(0); // IS THIS WORKING?

				var xAxis = freelance.append( "g" )
					.attr( "class", "x-axis" )
					.call( d3.axisBottom( xScale )
						// .ticks(12)
						.tickFormat(d3.format(".0%")) // change to percent
						.tickSize(-dimensions.boundedHeight, 0, 0))
						// .tickFormat("") )
					.attr( "transform", `translate(0, ${dimensions.boundedHeight})` )
					.attr("stroke-dasharray", "2,2"); 
					// .call(g => g.select(".domain").remove())// removes the line for axis

				var xAxisText = xAxis.selectAll( "text" )
					.attr( "class", "axis_text" )
					.style( "fill", "#2d2d2d" )

					// add the candy after the gridlines are drawn
				var candy = freelance.selectAll( "circle" )
					// join the selection of rectangles with data and then modify
					.data( data )
					.enter() // adds the rectangles
					.append( "circle" )
					// set the y position of the center
					.attr( "cy", d => yScale( d.year ) )
					.attr( "cx", d => xScale( d.percent ) )
					.attr( "r", 8 )
					// .attr("height", yScale.bandwidth())
					.attr( "fill", "#47bedb" );

				var yAxis = freelance.append( "g" )
					.attr( "class", "y-axis" )
					.call( d3.axisLeft( yScale )
					// move axis labels away from ticks and lines
						.tickPadding([10]) 
						.tickSize("0") )
					.call(g => g.select(".domain").remove()); // removes the line for axis

				var yAxisText = yAxis.selectAll( "text" )
					.attr( "class", "axis_text" )
					.style( "fill", "#2d2d2d" );
			}
		);
}
