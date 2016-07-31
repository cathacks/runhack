var wizzard = {
	init: function($div){
		this.$div = $div;
		this.$div.append("<h3>Wizzard</h3>");
		this.$div.css('height', '400px'); //.css('border', '1px solid black');

		this.$div.append("<p>A basic start location</p>")
		this.$div.append('<input id="startaddress" type="text" value="Parliament House, ACT">')

		// this.$div.append("<p>A basic end location</p>")
		// this.$div.append('<input id="endaddress" type="text" value="Grease Monkey, ACT">')

		this.$div.append("<p>loop to start</p>")
		this.$div.append('<input id="loopaddress" type="checkbox" value="true">')

		this.$div.append("<br>")
		this.$div.append('<button id="gobutton" name="button">Click me</button>')

		$("#gobutton").click(function() {

			var startAddr = $("#startaddress").val();
			// var endAddr = $("#endaddress").val();

			var loopAddr = $("#loopaddress").is(':checked')

			theSilentCartographer.setLoop(loopAddr);
			
			theSilentCartographer.geocoder.geocode( { 'address': startAddr}, function(results, status) {
			  if (status == 'OK') {
			  	theSilentCartographer.setStart(results[0].geometry.location);
			  } else {
				alert('Geocode was not successful for the following reason: ' + status);
			  }

			  theSilentCartographer.updateRoute();
			});

			// theSilentCartographer.geocoder.geocode( { 'address': endAddr}, function(results, status) {
			//   if (status == 'OK') {
			//   	theSilentCartographer.setEnd(results[0].geometry.location);
			//   } else {
			// 	alert('Geocode was not successful for the following reason: ' + status);
			//   }
			// });

		});
	}
};