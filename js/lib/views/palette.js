var Palette = Backbone.View.extend({
	initialize: function(options) {
		this.app = options.app;
		this.colors = [];
	},
	push: function(hex) {
        var $swatch = $('<div class="swatch ' +hex+'_'+this.colors.length+'"><div class="label">' + '#'+hex + '<div class="name"></div></div></div>');
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
    setColorNames : function(data){
        var palette = this;
        data.forEach(function( searchResult ){
            palette.colors.forEach(function(color){
                if( color.name === undefined && color.hex.toLowerCase() === searchResult.hex.toLowerCase()){
                    color.name = searchResult.title;
                    color.update();
                }
            });
        });
    },
    reset: function(){
        this.colors = [];
        this.$el.empty();
    }
});