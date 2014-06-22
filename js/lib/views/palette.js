var Palette = Backbone.View.extend({
	initialize: function(options) {
		this.app = options.app;
		this.colors = [];
	},
	push: function(hex) {
        var $swatch = $('<div class="swatch ' +hex+'_'+this.colors.length+'"><div class="label">' + '#'+hex + '</div></div>');
		this.$el.append($swatch);
        
        this.colors.push(new Color({app : this.app, el : '.'+Color.cleanHex(hex) + '_' + this.colors.length, hex : hex}));
        
		this.update();
	},
	update: function() {
        var width = (100 / this.colors.length) + '%';
        this.colors.forEach(function(color, index){
            color.update(width);
        });
	},
    reset: function(){
        this.colors = [];
        this.$el.empty();
    }
});