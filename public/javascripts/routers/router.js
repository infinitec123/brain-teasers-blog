/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var TeaserRouter = Backbone.Router.extend({

    initialize: function() {
        //console.log("initialize of router");   
    }, 
	
    routes: {

            "teasers/new": "addTeaser",
            "": "initialLoad",
			"teasers/:id":"teaserDetails",
            "teasers/edit/:id":"editTeaserDetails"
	},

    addTeaser: function(){
        //console.log("Will add a new teaser!");
        if(this.teasersView){
            console.log('zombie found! Will kill it!');
            this.teasersView.close();
        }
        if (!this.teasersList){
            this.initialLoad();
        }
        this.teaserNewView = new app.TeasersNewView({model: new Teaser()});
        $('#mainbar').html(this.teaserNewView.render().el);
    },

    changeView: function(view) {
             if (this.currentView) {
               if (this.currentView == view) {
                 return;
            }
               this.currentView.remove();
             }
             $('#mainbar').html(view.render().el);
             this.currentView = view;
    },

    initialLoad: function(){
        //console.log('Inside router for intial load');
        var self = this;   
        this.teasersList = new app.Teasers();
        this.teasersList.fetch({
        success:function () {
                self.teasersListView = new app.TeasersListView({model:self.teasersList});
                $('#sidebar').html(self.teasersListView.render().el);
                if(self.requestedId) self.teaserDetails(self.requestedId);
            }
        });
        //new app.AppView();
    },  

    teaserDetails: function(id){
        if(this.teasersList){
            this.teaser = this.teasersList.get(id);
            if(this.teasersView) {
                this.teasersView.remove();
            }
            this.teasersView = new app.TeasersView({model: this.teaser});
            $('#mainbar').html(this.teasersView.render().el);
        } else {
            this.requestedId = id;
            this.initialLoad();
        }

    },

    editTeaserDetails: function(id){
            this.changeView(new app.TeasersEditView({model: this.teasersList.get(id)}));
    }    

	});

	app.TeaserRouter  = new TeaserRouter();
	Backbone.history.start();
})();
