var sites = {
	init:     function($div) {
		this.$div = $div;
		this.$div.append("<h3>Points of interest</h3>");
		this.$div.css('min-height', '400px').css('border', '1px solid black');

		this.$tablist = $("<div class='panel-group' id='typelist' role='tablist'></div>");
		this.$tablist.appendTo(this.$div);

		this.loadData();

		theSilentCartographer.change(this.refreshPanels.bind(this));
	},
	loadData: function() {
		var tokenQ = '?$$app_token=vY4SluUWF98mpICqPqqkhBxGE';
		var pubArt = 'https://www.data.act.gov.au/resource/s538-zqvb.json';
		var graffiti = 'https://www.data.act.gov.au/resource/ppyi-zp42.json';

		//each item needs to have the following keys : label, lat and lng
		$.get(pubArt + tokenQ, function(data, status, xhr) {
			this.addPanel('Public Art', data.map(function(item) {
				item.label = item.title;
				item.lat   = -item.longitude.coordinates[1];
				item.lng   = item.longitude.coordinates[0];
				return item;
			}));
		}.bind(this), 'json');

		$.get(graffiti + tokenQ, function(data, status, xhr) {
			this.addPanel('Graffiti Sites', data.map(function(item) {
				item.label = item.location;
				item.lat   = parseFloat(item.latitude);
				item.lng   = parseFloat(item.longitude);
				return item;
			}));
		}.bind(this), 'json');
	},

	addPanel: function(title, data) {
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
			var li = "<li class='list-group-item site' data-lat='" + item.lat + "' data-lng='" + item.lng + "'>" + item.label + "<span class='distance badge'></span></li>";
			$list.append(li);

			theSilentCartographer.addMarker(item.lat, item.lng, item.label);

			return item;
		});

		$panel.append(heading);
		$panel.append($body);

		$panel.appendTo(this.$tablist);

		this.refreshPanels();
	},

	refreshPanels: function(){
		this.$tablist.find('li.site').each(function(i,e){
			var $e = $(e);

			var lat = $e.data('lat');
			var lng = $e.data('lng');

			var dist = theSilentCartographer.calculateDistance(lat, lng);
			$e.find('.badge.distance').text(dist + " m").data('distance', dist);
		});

		this.$tablist.find('ul').each(function(i,e){
			var $ul = $(e);
			var $li = $ul.children("li");

			$li.detach().sort(function(a, b){
				a = $(a).find('.badge.distance').data('distance');
				b = $(b).find('.badge.distance').data('distance');

				if (a > b) return 1;
				if (b > a) return -1;
				return 0;
			});
			$ul.append($li);
		});
	}
};