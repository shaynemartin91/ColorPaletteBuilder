var Toolbar = Backbone.View.extend({
	events: {
		'click .add': 'onAddClick',
        'click .reset': 'onResetClick',
        'click .save' : 'onSaveClick',
        'click .load' : 'onLoadClick'
	},
	initialize: function(options) {
		this.app = options.app;
        this.updateSavedPalettesList();
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
        if(this.app.palette.name === undefined){
            var name = prompt("What's this palette's name?")
        
            if(name === null)
                name = (new Date()).toString();
        
            this.app.palette.savePalette(name);
            
            this.updateSavedPalettesList();
        } 
        else 
            this.app.palette.saveCurrentPalette();
    },
    onLoadClick : function(){
        //var names = this.app.palette.getSavedPalettes().join('\n');
        //var name = prompt("What's this palette's name?\n\nThese are you current saved palettes:\n"+names)
        
        //if(name !== null)
        
        var name = this.$el.find('#saved-pallete-list option:selected').text();
        if(name !== null && name !== undefined)
            this.app.palette.loadPalette(name);
    },
    updateSavedPalettesList : function(){
        var savedPalleteNames = this.app.palette.getSavedPalettes(),
            $palleteList = this.$el.find('#saved-pallete-list');
        
        $palleteList.empty();
        savedPalleteNames.forEach(function(palette){
            $palleteList.append( $('<option data-name=' + palette + '>' + palette + '</option>') );
        });
    }
});