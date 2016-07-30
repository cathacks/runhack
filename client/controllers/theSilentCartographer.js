var theSilentCartographer = {
	init: function($div){
		this.$div = $div;
		this.$div.append("<h1>Map</h1>");
		this.$div.css('height', '400px').css('border', '1px solid black');
	}
};