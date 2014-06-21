var Toolbar = Backbone.View.extend({
	events: {
		'click .add': 'onAddClick'
	},
	initialize: function(options) {
		this.app = options.app;
	},
	onAddClick: function() {
		var value = $.trim(this.$('input').val());
		this.app.palette.push( new Color(value) );
	}
});