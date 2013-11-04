/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var TeaserRouter = Backbone.Router.extend({

    initialize: function() {
        //console.log("initialize of router");   
        app.chosenFilter = "All";
    }, 
	
    routes: {

            "teasers/new": "addTeaser",
            "teasers/edit/:id":"editTeaserDetails",
			"teasers/:id":"teaserDetails",
            "filter/:id": "manageFilter",
            "": "initialLoad"
	},

    manageFilter: function(_filter){
        console.log("Received request to filter" + _filter);
        
        //console.log(result); 
        if(_filter == "All"){
            app.teasersList = app.masterList;
        } else {
            var result = app.masterList.where({category: _filter});
            app.teasersList = new app.Teasers(result); 
        }
        
        if(this.teasersView){
            this.teasersView.close();
        }
        if(this.teaserNewView){
           this.teaserNewView.close(); 
        }
        this.mainLoad(app.teasersList);
        // app.teasersList.trigger('filtered');
        //console.log(app.teasersList);
        //this.teasersListView = new app.TeasersListView({model:app.teasersList});
        //$('#sidebar').html(this.teasersListView.render().el);

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
        app.masterList = new app.Teasers();    
        //app.teasersList = new app.Teasers();
        var self = this;   
        app.masterList.fetch({
        success:function () {
                app.teasersList = app.masterList;
                self.mainLoad(app.teasersList);    
            }
        });
    }, 

    mainLoad: function(_collection){
        console.log('Inside main load'); 
                this.teasersListView = new app.TeasersListView({model:_collection}); 
                $('#sidebar').html(this.teasersListView.render().el);
                $("#filter").val(app.chosenFilter);

                if(!app.addTeaserRequest) { //main load first time with or without id.
                    //console.log("Should not have come here!" + !app.addTeaserRequest );
                    if(this.requestedId) {
                        this.teaserDetails(this.requestedId);
                    } else {
                        if(app.teasersList.length > 0)  this.teaserDetails(app.teasersList.at(0).get('_id'));     
                    }  
                } else { //Its main load for add
                        this.teaserNewView = new app.TeasersNewView({model: new app.Teaser()});
                        $('#mainbar').html(this.teaserNewView.render().el);
                        app.addTeaserRequest = false;
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
