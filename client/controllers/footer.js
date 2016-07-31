var footer = {
	init: function($div){
		this.$div = $div;
		this.$div.append("<p>Footer</p>");
//		this.$div.css('height', '100px').css('border', '1px solid black');
	},

	drawElevation: function(results){
		// Create a new chart in the elevation_chart DIV.
		var chart = new google.visualization.LineChart(this.$div[0]);

		// Extract the data from which to populate the chart.
		// Because the samples are equidistant, the 'Sample'
		// column here does double duty as distance along the
		// X axis.
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Sample');
		data.addColumn('number', 'Elevation');
		for (var i = 0; i < results.length; i++) {
			data.addRow(['', results[i].elevation]);
		}

		// Draw the chart using the data within its DIV.
		chart.draw(data, {
			height: 100,
			legend: 'none',
			titleY: 'Elevation (m)'
		});
	}
};