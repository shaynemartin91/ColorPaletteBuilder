var Toolbar = Backbone.View.extend({
	events: {
		'click .add': 'onAddClick',
        'click .reset': 'onResetClick',
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
	},
    onResetClick : function(){
        this.app.palette.reset();
    }
});