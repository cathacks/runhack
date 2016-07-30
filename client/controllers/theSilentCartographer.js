
var theSilentCartographer = {	//it's a Halo reference btw

	map: undefined,

	init: function($div){
		this.$div = $div;
		this.$div.css('height', '400px').css('border', '1px solid black');
		this.$div.append("<div id='map'></div>");

		this.map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: -35.281, lng: 149.110},
		  zoom: 10
		});
	},

	addMarker: function(lat, lng, title) {
	  var myLatLng = {lat: lat, lng: lng};

	  var marker = new google.maps.Marker({
	    position: myLatLng,
	    map: this.map,
	    title: title,
	  });

	  return marker;
	},
};


function initMap() {
	// called when google maps is loaded.
	// map = new google.maps.Map(document.getElementById('map'), {
	//   center: {lat: -34.397, lng: 150.644},
	//   zoom: 8
	// });
}