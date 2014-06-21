var App = Backbone.View.extend({
	initialize: function() {
		this.toolbar = new Toolbar({app: this, el: '#toolbar'});
		this.palette = new Palette({app: this, el: '#palette'});

		this.palette.push('#ffffff');
	}
});