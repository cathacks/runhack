var rundata = {
	init: function($div){
		this.$div = $div;
	},

	drawElevation: function(results, markers){
		var markerLookup = {};

		function dp2(num){
			num = num * 100;
			num = Math.round(num);
			num = num / 100;
			return num;
		}

		markers = markers.slice(0);

		if (theSilentCartographer.startLoc) {
			markers.unshift(theSilentCartographer.startLoc);
		}
		if (theSilentCartographer.loopRoute) {
			markers.push(markers[0]);
		}

		var first = markers.shift().item;
		var last = markers.pop().item;

		markers.map(function(marker){
			var key = [dp2(marker.position.lat()), dp2(marker.position.lng())].join('-');
			markerLookup[key] = $.extend({}, marker.item);
			console.log(key, marker.item);
		});


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
			var key = [dp2(pt.location.lat()), dp2(pt.location.lng())].join('-');

			if (prev){
				var diff = theSilentCartographer.calculateDistance(pt.location, prev.location);
				dist += diff;
			}

			var anno = null;
			var desc = null;

			if (i == 0){
				anno = alpha[p++];
				desc = first.label;
			} else if (i == (results.length-1)){
				anno = alpha[p++];
				desc = last.label;
			} else if (markerLookup[key] && !markerLookup[key].used) {
				anno = alpha[p++];
				desc = markerLookup[key].label;
				markerLookup[key].used = true;
			}
			data.addRow([Math.round(dist), Math.round(pt.elevation), anno, desc]);

			prev = pt;
		}
		console.log('total distance', dist);

		// Draw the chart using the data within its DIV.
		chart.draw(data, {
			height: 100,
			legend: 'none',
			titleY: 'Elevation (m)'
		});
	}
};