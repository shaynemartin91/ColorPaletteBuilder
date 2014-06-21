var Toolbar = Backbone.View.extend({
	events: {
		'click .add': 'onAddClick',
        'click .reset': 'onResetClick',
	},
	initialize: function(options) {
		this.app = options.app;
	},
	onAddClick: function() {
		var value = $.trim(this.$('input').val());
        if( Color.validate(value) )
            this.app.palette.push( new Color({app : this.app, hex : value}) );
        else
            alert('"' + value + '" is an invalid hex code!');
	},
    onResetClick : function(){
        this.app.palette.reset();
    }
});