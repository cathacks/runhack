var footer = {
	init: function($div){
		this.$div = $div;
		this.$div.append("<p>Footer</p>");
		this.$div.css('height', '100px').css('border', '1px solid black');
	}
};