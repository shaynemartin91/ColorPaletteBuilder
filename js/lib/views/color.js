var Color = Backbone.View.extend({
    initialize : function(options){
        
        this.app = options.app;
        this.index = this.app.palette.colors.length;
        
        if( typeof options.hex === 'string' && Color.validate(options.hex) )
            this.hex = Color.cleanHex(options.hex);
        else
            this.hex = Color.randomHex();
        
        this.getName(function(name){
            self.name = name;
        });
    },
    displayHexVal : function(){
        return '#' + this.hex;
    },
    getName : function(callback){
        var name = '';
        
        if(callback && typeof callback === 'function')
            callback(name);
    },
    update : function(width){
        if(width === undefined)
            width = (100 / this.app.palette.colors.length) + '%';
        
        this.$el.css({
            'width' : width,
            'background-color' : this.displayHexVal()
        });
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
