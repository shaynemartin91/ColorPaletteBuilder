var Color = Backbone.View.extend({
    events: {
		'click .swatch-remove': 'remove'
	},
    initialize : function(options){
        
        this.app = options.app;
        this.index = this.app.palette.colors.length;
        
        if( typeof options.hex === 'string' && Color.validate(options.hex) )
            this.hex = Color.cleanHex(options.hex);
        else
            this.hex = Color.randomHex();
        
        this.getName(function(data){
            app.palette.setColorNames(data);
        });
    },
    displayHexVal : function(){
        return '#' + this.hex;
    },
    getName : function(callback){
                
        if(callback && typeof callback === 'function'){
            window.cb || (window.cb = {});
            
            var cbName = App.genId();
            window.cb[cbName] = callback;
            
            $.ajax({
                type: 'GET',
                url : 'http://www.colourlovers.com/api/color/' + this.hex + '?format=json&jsonCallback=window.cb.' + cbName,
                dataType : 'jsonp'
            });    
        }    
    },
    update : function(width){
        if(width === undefined)
            width = (100 / this.app.palette.colors.length) + '%';
        
        this.$el.css({
            'width' : width,
            'background-color' : this.displayHexVal()
        });
        
        if(this.name !== undefined)
            this.$el.find('.name').text(this.name)
    },
    remove : function(){
        this.app.palette.colors.splice(this.index,1);
        
        var indexThreshold = this.index;
        this.app.palette.colors.forEach(function(color){
            if(color.index>indexThreshold)
                color.index = color.index-1;
        });
        this.$el.remove();
        this.app.palette.update();
    }
},{
    RawHexRegex : new RegExp('^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'),
    DisplayHexRegex : new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'),
    validate : function(hex){
        return Color.RawHexRegex.test(hex) || Color.DisplayHexRegex.test(hex);
    },
    randomHex : function(){
        var hexVals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
            randomHex = '';

        for(var i=5; i>=0; i--)
            randomHex += hexVals[ Math.floor(Math.random()*16) ];
    
        return randomHex;
    },
    cleanHex : function(hex){
        if( !Color.validate(hex) )
            throw new ArguementException('Could not clean hex value : '+hex+'. Supplied arguement is an invalid hex code.');
        
        return hex.indexOf('#')===0 ? hex.substr(1) : hex;
    }
});
