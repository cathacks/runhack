var sites = {
	init:     function($div) {
		this.$div = $div;
		this.$div.append("<h3>Points of interest</h3>");
		this.$div.css('height', '400px').css('border', '1px solid black');

		this.$tablist = $("<div class='panel-group' id='typelist' role='tablist'></div>");

		var pretend = ['Alpha', 'Beta', 'Gamma'];
		for (var i = 0; i < pretend.length; i++) {

		}

		this.$tablist.appendTo(this.$div);

		this.loadData();
	},
	loadData: function() {
		var pubArt = 'https://www.data.act.gov.au/resource/s538-zqvb.json?$$app_token=vY4SluUWF98mpICqPqqkhBxGE';

		var self = this;

		$.get(pubArt, function(data, status, xhr) {
			data = data.map(function(art) {
				art.location = art.longitude.coordinates;
				var lat      = art.location[1];
				var lng      = art.location[0];
				console.log(art.title, art.suburb, lat, lng);

				//interface
				art.label = art.title;
				art.lat   = art.location[1];
				art.lng   = art.location[0];

				return art;
			});

			self.addPanel('Public Art', data);
		}, 'json');
	},

	addPanel: function(title, data) {
		console.log('add panel', title, data);
		var key = title.toLowerCase().replace(/ /g, '_'); //lowercase and underscore all spaces

		//TODO handlebars template would be cleaner?
		var $panel = $("<div class='panel panel-default'></div>");

		var heading = "<div class='panel-heading' role='tab' id='heading" + key + "'>" +
			"<h4 class='panel-title'>" +
			"<a role='button' data-toggle='collapse' data-parent='typelist' href='#section" + key + "' aria-controls='section" + key + "'>" + title + "</a>"
		"</h4>" +
		"</div>";

		var $body = $("<div class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + key + "'  id='section" + key + "'>" +
					  "<div class='panel-body'><ul class='list-group'></ul></div>" +
					  "</div>");

		var $list = $body.find('ul');

		data.map(function(item) {
			var li = "<li class='list-group-item' data-lat='" + item.lat + "' data-lng='" + item.lng + "'>" + item.label + '</li>';
			$list.append(li);

			return item;
		});

		$panel.append(heading);
		$panel.append($body);

		$panel.appendTo(this.$tablist);
	}
};