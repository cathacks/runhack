var theSilentCartographer = {	//it's a Halo reference btw
	init: function($div){
		this.$div = $div;
		this.$div.css('height', '400px').css('border', '1px solid black');
		this.$div.append("<div id='map'></div>");

		map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: -34.397, lng: 150.644},
		  zoom: 8
		});
	}
};


var map;
function initMap() {
	// called when google maps is loaded.
	// map = new google.maps.Map(document.getElementById('map'), {
	//   center: {lat: -34.397, lng: 150.644},
	//   zoom: 8
	// });
}