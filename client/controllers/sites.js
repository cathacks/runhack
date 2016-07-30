var sites = {
	init: function($div) {
		this.$div = $div;
		this.$div.append("<h3>Points of interest</h3>");
		this.$div.css('height', '400px').css('border', '1px solid black');

		var $tablist = $("<div class='panel-group' id='typelist' role='tablist'></div>");

		var pretend = ['Alpha', 'Beta', 'Gamma'];
		for (var i = 0; i < pretend.length; i++) {
			var p      = pretend[i];
			console.log(i, p);

			//TODO handlebars template would be cleaner?
			var $panel = $("<div class='panel panel-default'></div>");

			var heading = "<div class='panel-heading' role='tab' id='heading" + p + "'>" +
				"<h4 class='panel-title'>" +
				"<a role='button' data-toggle='collapse' data-parent='typelist' href='#section" + p + "' aria-controls='section" + p + "'>" + p + "</a>"
			"</h4>" +
			"</div>";

			var body = "<div class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + p + "'  id='section" + p + "'>" +
				"<div class='panel-body'>Lorem ipsum</div>"
			"</div>";

			$panel.append(heading);
			$panel.append(body);

			$panel.appendTo($tablist);
		}

		$tablist.appendTo(this.$div);
	}
};