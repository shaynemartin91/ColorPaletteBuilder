var Color = function(hex){
    if( typeof hex === 'string' && Color.validate(hex) )
        this.hex = hex;
    else
        this.hex = Color.randomHex();
    
    this.init();
};

Color.prototype = {
    init : function(){
        var self = this;
        this.getName(function(name){
            self.name = name;
        });
    },
    displayHexVal : function(){
        return '#' + this.hex;
    },
    getName : function(callback){
        var name = '';
        callback(name);
    }    
};


Color.HexRegex = new RegExp('^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
Color.DisplayHexRegex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');

Color.validate = function(hex){
    return Color.HexRegex.test(hex) || Color.DisplayHexRegex.test(hex);
};
Color.randomHex = function(){
    var hexVals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
        randomHex = '';
    
    for(var i=5; i>=0; i--)
        randomHex += hexVals[ Math.floor(Math.random()*16) ];
    
    return randomHex;
};