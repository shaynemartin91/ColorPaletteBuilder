var Palette = Backbone.View.extend({
	initialize: function(options) {
		this.app = options.app;
		this.colors = [];
	},
	push: function(color) {
		this.colors.push(color);

		var $column = $('<div>');
		var $swatch = $('<div class="swatch"><div class="label">' + color.displayHexVal() + '</div></div>');
		$swatch.css({background: color.displayHexVal()}).appendTo($column);

		this.$el.append($column);
		this.update();
	},
	update: function() {
		var $children = this.$el.children();
		for (var i = 0, n = $children.length; i < n; i++) {
			$children.eq(i).css({
				left: (i / n * 100) + '%',
				width: (100 / this.colors.length) + '%'
			});
		}
	}
});