var App = Backbone.View.extend({
	initialize: function() {
		this.palette = new Palette({app: this, el: '#palette'});
        this.toolbar = new Toolbar({app: this, el: '#toolbar'});
		
		this.palette.push('ffffff');
	}
},{
    genId : function () {
        //https://gist.github.com/gordonbrander/2230317
        //Simple unique name gen - used so callbackss to colourlovers don't collide
        return '_' + Math.random().toString(36).substr(2, 9);
    }
});