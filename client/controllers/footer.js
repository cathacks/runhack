var footer = {
	init: function($div){
		this.$div = $div;
		this.$div.append("<img src='images/govhack.png' height='50'/><p>Fun Run CBR by Cathacks</p>");
	},

	drawElevation: function(results, markers){
		var markerLookup = {};

		function dp5(num){
			num = num * 1000;
			num = Math.round(num);
			num = num / 1000;
			return num;
		}

		markers = markers.slice(0);
		var first = markers.shift().item;
		var last = markers.pop().item;

		markers.map(function(marker){
			var key = [dp5(marker.position.lat()), dp5(marker.position.lng())].join('-');
			markerLookup[key] = marker.item;
		})


		// Create a new chart in the elevation_chart DIV.
		var chart = new google.visualization.LineChart(this.$div[0]);

		// Extract the data from which to populate the chart.
		// Because the samples are equidistant, the 'Sample'
		// column here does double duty as distance along the
		// X axis.
		var data = new google.visualization.DataTable();
		data.addColumn('number', 'Distance');
		data.addColumn('number', 'Elevation');
		data.addColumn({type: 'string', role: 'annotation'});
		data.addColumn({type: 'string', role: 'annotationText'});

		var prev = null;
		var dist = 0;
		var alpha = 'ABCDEFGHIJ'.split('');
		var p = 0;
		for (var i = 0; i < results.length; i++) {
			var pt = results[i];
			var key = [dp5(pt.location.lat()), dp5(pt.location.lng())].join('-');;

			if (prev){
				var diff = theSilentCartographer.calculateDistance(pt.location, prev.location);
				dist += diff;
			}

			var anno = null;
			var desc = null;

			if (i == 0){
				console.log("EYE ZERO");
				anno = alpha[p++];
				desc = first.label;
				console.log(anno, desc, p, pt, first);
			} else if (i == (results.length-1)){
				anno = alpha[p++];
				desc = last.label;
			} else if (markerLookup[key]) {
				anno = alpha[p++];
				desc = markerLookup[key].label;
			}
			if (anno){
				console.log(i, dist, pt, anno, desc);
			}
			data.addRow([Math.round(dist), Math.round(pt.elevation), anno, desc]);

			prev = pt;
		}

		console.log('total distance', dist);
		console.log('lookups', markerLookup, first, last);

		// Draw the chart using the data within its DIV.
		chart.draw(data, {
			height: 100,
			legend: 'none',
			titleY: 'Elevation (m)'
		});
	}
};