var Palette = Backbone.View.extend({
	initialize: function(options) {
		this.app = options.app;
		this.colors = [];
	},
	push: function(hex) {
        var $swatch = $('<div class="swatch ' +hex+'_'+this.colors.length+'"><div class="swatch-remove">X</div><div class="label">' + '#'+hex + '<div class="name"></div></div></div>');
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
        this.name = undefined;
        this.$el.empty();
    },
    savePalette : function(name){
        var colorData = this.colors.map(function(color){
            return color.hex;
        });
        var savedPalettes = JSON.parse(localStorage.getItem('paletteCache'))|| {};
        
        savedPalettes[name] = colorData;
        localStorage.setItem('paletteCache', JSON.stringify(savedPalettes));
        
        this.name = name;
    },
    saveCurrentPalette : function(){
        this.savePalette(this.name);
    },
    loadPalette : function(name){
        
        var savedPalettes = JSON.parse(localStorage.getItem('paletteCache')) || {},
            colorData = savedPalettes[name];
        
        if(colorData === null || colorData === undefined)
            alert("Could not find palette " + name + ".");
        else{
            this.colors = [];
            
            var palette = this;
            colorData.forEach(function(color){
                palette.push(color);
            });
            
            this.name = name;
        }
    },
    getSavedPalettes : function(){
        var savedPalettes = JSON.parse(localStorage.getItem('paletteCache')) || {},
            paletteNames = [];
        
        for(var paletteName in savedPalettes)
            paletteNames.push(paletteName);
        
        return paletteNames;
    }
});