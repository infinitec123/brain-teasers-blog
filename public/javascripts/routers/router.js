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
            "teasers/edit/:id":"editTeaserDetails",
			"teasers/:id":"teaserDetails",
            "filter/:id": "manageFilter",
            "": "initialLoad"
	},

    manageFilter: function(){

    },

    addTeaser: function(){
        console.log("Will add a new teaser!");
        app.addTeaserRequest = true;
        if(this.teasersView){
            //console.log('zombie found! Will kill it!');
            this.teasersView.close();
        }
        if (!app.teasersList){
            this.initialLoad(); //If it's direct link initial load will load add form as well. Sync problem other wise.
        } else{ // else u have to take care of populating side view.
                this.teaserNewView = new app.TeasersNewView({model: new app.Teaser()});
                $('#mainbar').html(this.teaserNewView.render().el);
                app.addTeaserRequest = false;
        }
        console.log("Finished addteaser");
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
        console.log('Inside router for intial load');      
        app.teasersList = new app.Teasers();
        var self = this;   
        app.teasersList.fetch({
        success:function () {
                self.mainLoad(app.teasersList, "All");    
            }
        });
    }, 

    mainLoad: function(_collection, _filter){
        console.log('Inside main load'); 
        if(_filter == "All"){
                this.teasersListView = new app.TeasersListView({model:app.teasersList});
                $('#sidebar').html(this.teasersListView.render().el);

                if(!app.addTeaserRequest) { //main load first time with or without id.
                    console.log("Should not have come here!" + !app.addTeaserRequest );
                    if(this.requestedId) {
                        this.teaserDetails(this.requestedId);
                    } else {
                        this.teaserDetails(app.teasersList.at(0).get('_id'));
                    }  
                } else { //Its main load for add
                        this.teaserNewView = new app.TeasersNewView({model: new app.Teaser()});
                        $('#mainbar').html(this.teaserNewView.render().el);
                        app.addTeaserRequest = false;
                }
        } else {
            console.log("Will have to filter");
        }
    }, 

/*    teaserDetails: function(id){
        if(app.reload){
            //console.log("Reload request;");
            app.reload = false;
            this.requestedId = id;
            this.initialLoad();
            utils.showAlert('Success!', 'Teaser saved successfully', 'alert-success');

        } else {
            if(app.teasersList){
                this.teaser = app.teasersList.get(id);
                if(this.teasersView)  this.teasersView.remove();                
                this.teasersView = new app.TeasersView({model: this.teaser});
                $('#mainbar').html(this.teasersView.render().el);
        } else {
                this.requestedId = id;
                this.initialLoad();
                }
        }
    }, */

    teaserDetails: function(id){

        if(this.teaserNewView){
            this.teaserNewView.close();
        }

         if(app.teasersList){
                this.teaser = app.teasersList.get(id);
                if(this.teasersView)  this.teasersView.remove();                
                this.teasersView = new app.TeasersView({model: this.teaser});
                $('#mainbar').html(this.teasersView.render().el);
        } else {
                this.requestedId = id;
                this.initialLoad();
                }
    },

    editTeaserDetails: function(id){
            this.changeView(new app.TeasersEditView({model: app.teasersList.get(id)}));
    }    

	});

	app.TeaserRouter  = new TeaserRouter();
	Backbone.history.start();
})();
