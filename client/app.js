$(document).ready(function(){
	app.init();
});

var app = {
	init: function(){
		$('.controller').each(function(i,e){
			var $el = $(e);
			var id = $el.attr('id');
			app.loadController(id, $el);
		})
	},
	loadController: function(id, $el){
		var controller = window[id];
		if (controller){
			controller.init($el);
		} else {
			console.log("Unable to load controller " + id);
		}
	}
}