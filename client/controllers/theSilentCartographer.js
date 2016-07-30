var theSilentCartographer = {	//it's a Halo reference btw

	map: undefined,
	runningCircle: undefined,

	init: function($div) {
		this.$div = $div;
		this.$div.css('height', '400px').css('border', '1px solid black');
		this.$div.append("<div id='map'></div>");

		this.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -35.281, lng: 149.110},
			zoom:   10
		});

		this.geocoder = new google.maps.Geocoder();

		this.drawingManager = new google.maps.drawing.DrawingManager();
		this.drawingManager.setMap(map);
	},

	addMarker: function(lat, lng, title) {
		var myLatLng = {lat: lat, lng: lng};

		var marker = new google.maps.Marker({
			position: myLatLng,
			map:      this.map,
			title:    title,
		});

		return marker;
	},

	change: function(callback) {
		this.map.addListener('center_changed', callback);
	},

	/**
	 * Calculate the distance from the supplied lat/lng coordinates to the current map center.
	 * @param lat
	 * @param lng
	 * @return int distance in metres
	 */
	calculateDistance: function(lat, lng){
		var mapLat = this.map.center.lat();
		var mapLng = this.map.center.lng();

		var R    = 6371; // Radius of the earth in km
		var dLat = deg2rad(mapLat - lat);  // deg2rad below
		var dLon = deg2rad(mapLng - lng);
		var a    =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(deg2rad(mapLat)) * Math.cos(deg2rad(lat)) *
				Math.sin(dLon / 2) * Math.sin(dLon / 2)
			;
		var c    = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d    = R * c; // Distance in km

		return Math.floor(d * 1000); //metres
	},


	addSearchCircle: function(loc, radius) {

		this.map.setCenter(loc);

		if (this.runningCircle) {
			this.runningCircle.setMap(null);
			this.runningCircle = undefined;
		}


		this.runningCircle = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: this.map,
			center: loc,
			radius: radius * 1000
		  });

	},


};


function initMap() {
	// called when google maps is loaded.
	// map = new google.maps.Map(document.getElementById('map'), {
	//   center: {lat: -34.397, lng: 150.644},
	//   zoom: 8
	// });
}

var deg2rad = function(deg) {
	return deg * (Math.PI / 180)
};