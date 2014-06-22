var Toolbar = Backbone.View.extend({
	events: {
		'click .add': 'onAddClick',
        'click .reset': 'onResetClick',
        'click .save' : 'onSaveClick',
        'click .load' : 'onLoadClick'
	},
	initialize: function(options) {
		this.app = options.app;
	},
	onAddClick: function() {
		var value = Color.cleanHex($.trim(this.$('input').val()));
        if( Color.validate(value) )
            this.app.palette.push(value);
        else
            alert('"' + value + '" is an invalid hex code!');
        
        this.$('input').val('#'+Color.randomHex());
	},
    onResetClick : function(){
        this.app.palette.reset();
    },
    onSaveClick : function(){
        var name = prompt("What's this palette's name?")
        
        if(name === null)
            name = (new Date()).toString();
        
        this.app.palette.savePalette(name);
    },
    onLoadClick : function(){
        var names = this.app.palette.getSavedPalettes().join('\n');
        var name = prompt("What's this palette's name?\n\nThese are you current saved palettes:\n"+names)
        
        if(name !== null)
            this.app.palette.loadPalette(name);
    }
});