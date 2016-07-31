var wizzard = {
	init: function($div){
		this.$div = $div;
		this.$div.append("<h3>Wizzard</h3>");
		this.$div.css('height', '400px'); //.css('border', '1px solid black');

		this.$div.append("<p>A basic start location</p>")
		this.$div.append('<input id="goaddress" type="text" value="Parliament House, ACT">')

		this.$div.append("<p>Radius (km)</p>")
		this.$div.append('<input id="goradius" type="range" min="1" max="10" step="1" />')

		this.$div.append("<br>")
		this.$div.append('<button id="gobutton" name="button">Click me</button>')

		$("#gobutton").click(function() {

			var addr = $("#goaddress").val();
			var radius = parseInt($("#goradius").val());

			theSilentCartographer.geocoder.geocode( { 'address': addr}, function(results, status) {
			  if (status == 'OK') {
				// theSilentCartographer.map.setCenter(results[0].geometry.location);

				theSilentCartographer.addSearchCircle(results[0].geometry.location, radius);
				// var marker = new google.maps.Marker({
				// 	map: map,
				// 	position: results[0].geometry.location
				// });



			  } else {
				alert('Geocode was not successful for the following reason: ' + status);
			  }
			});


		});



	}
};