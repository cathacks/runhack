var theSilentCartographer = {	//it's a Halo reference btw

	map:               undefined,
	runningCircle:     undefined,
	routeMarkers:      [],
	directionService:  undefined,
	elevationService:  undefined,
	directionRenderer: undefined,
	startLoc:          undefined,
	loopRoute:         false,

	init: function($div) {
		this.$div = $div;
		this.$div.css('height', '400px'); //.css('border', '1px solid black');
		this.$div.append("<div id='map'></div>");

		this.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -35.281, lng: 149.110},
			zoom:   12
		});

		this.geocoder = new google.maps.Geocoder();

		// this.drawingManager = new google.maps.drawing.DrawingManager();
		// this.drawingManager.setMap(this.map);

		this.directionService = new google.maps.DirectionsService();
		this.elevationService = new google.maps.ElevationService();

	},

	addMarker: function(lat, lng, title, icon) {
		var myLatLng = {lat: lat, lng: lng};

		var marker = new google.maps.Marker({
			position:  myLatLng,
			map:       this.map,
			title:     title,
			clickable: true,
			icon:      icon
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
	distanceFromCenter: function(lat, lng) {
		var mapLat = this.map.center.lat();
		var mapLng = this.map.center.lng();

		return this.calculateDistance(lat, lng, mapLat, mapLng);
	},

	calculateDistance: function(latA, lngA, latB, lngB) {
		if (latA.lat && lngA.lat) {
			var posA = latA;
			var posB = lngA;

			latA = posA.lat();
			lngA = posA.lng();

			latB = posB.lat();
			lngB = posB.lng();
		}

		var R    = 6371; // Radius of the earth in km
		var dLat = deg2rad(latA - latB);  // deg2rad below
		var dLon = deg2rad(lngA - lngB);
		var a    =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(deg2rad(latA)) * Math.cos(deg2rad(latB)) *
				Math.sin(dLon / 2) * Math.sin(dLon / 2)
			;
		var c    = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d    = R * c; // Distance in km

		return d * 1000; //metres
	},

	addSearchCircle: function(loc, radius) {

		this.map.setCenter(loc);

		if (this.runningCircle) {
			this.runningCircle.setMap(null);
			this.runningCircle = undefined;
		}


		this.runningCircle = new google.maps.Circle({
			strokeColor:   '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight:  2,
			fillColor:     '#FF0000',
			fillOpacity:   0.35,
			map:           this.map,
			center:        loc,
			radius:        radius * 1000
		});

	},


	focus: function(marker, addToRoute) {
		if (addToRoute === undefined) addToRoute = true;

		this.map.panTo(marker.position);
		this.map.setZoom(12);
		marker.setAnimation(google.maps.Animation.BOUNCE);

		if (marker.timer) clearTimeout(marker.timer);

		marker.timer = setTimeout(function() {
			marker.setAnimation(null);
		}, 2000);

		if (addToRoute) this.updateRoute(marker);
	},

	setStart: function(loc) {
		if (this.startLoc && this.startLoc.marker) this.startLoc.marker.setMap(null);

		this.startLoc = loc;
		this.startLoc.marker = this.addMarker(this.startLoc.lat(), this.startLoc.lng(), this.startLoc.item.label, 'http://maps.google.com/mapfiles/ms/micons/flag.png');
		this.focus(this.startLoc.marker, false);
	},

	// setEnd: function(loc) {
	// },

	setLoop: function(val) {
		this.loopRoute = val;
	},

	updateRoute: function(marker) {
		if (marker) {
			this.routeMarkers.push(marker);
		}

		var route = this.routeMarkers.slice(0);
		route     = route.map(function(marker) {
			return marker.getPosition();
		});
		if (this.startLoc) {
			route.unshift(this.startLoc);
		}

		console.log('update route', route);

		if (route.length < 2) return; // need start and end at least

		if (this.loopRoute) {
			route.push(route[0]);
		}

		var request         = {
			travelMode: google.maps.TravelMode.WALKING
		};
		request.origin      = route.shift();
		request.destination = route.pop();

		if (route.length) {
			request.waypoints = route.map(function(latlng) {
				return {
					location: latlng,
					stopover: false
				};
			});
		}

		this.directionService.route(request, function(result, status) {
			if (status !== 'OK') {
				console.log("Problem calculating route :(", result, status, request);
				return;
			}

			var route = result.routes[0];
			console.log(route);
			console.log(route.legs[0].distance.text, "route calculated");

			if (this.directionRenderer) {
				this.directionRenderer.setMap(null);
				this.directionRenderer = undefined;

			}

			this.directionRenderer = new google.maps.DirectionsRenderer({
				map: this.map
			});
			this.directionRenderer.setDirections(result);
			this.elevationService.getElevationAlongPath(
				{path: route.overview_path, samples: route.overview_path.length},
				function(results, status) {
					if (status != 'OK' || !results || !results.length) return;

					rundata.drawElevation(results, this.routeMarkers);
				}.bind(this));

		}.bind(this));
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