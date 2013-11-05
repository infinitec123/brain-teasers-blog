/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var TeaserRouter = Backbone.Router.extend({

    initialize: function() {
        //console.log("initialize of router");   
        app.chosenFilter = "All";
        app.docsPerPage = 4;
    }, 
	
    routes: {

            "teasers/new": "addTeaser",
            "teasers/edit/:id":"editTeaserDetails",
			"teasers/:id":"teaserDetails",
            //"filter/:id": "manageFilter",
            "teasers/page/:page": "initialLoad",
            "": "initialLoad"
	},


    manageFilter: function(_filter){ //
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
    },

    addTeaser: function(){
        console.log("Will add a new teaser!");
        app.addTeaserRequest = true;
        app.chosenFilter = "All";

        if(this.teasersView)    this.teasersView.close();
        this.initialLoad();


    /*    if (!app.teasersList){
            this.initialLoad(); //If it's direct link initial load will load add form as well. Sync problem other wise.
        } else{ // else u have to take care of populating side view.
                this.teaserNewView = new app.TeasersNewView({model: new app.Teaser()});
                $('#mainbar').html(this.teaserNewView.render().el);
                app.addTeaserRequest = false;
        }
        console.log("Finished addteaser"); */
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

    initialLoad: function(page){
        this.p = page ? parseInt(page, 10) : 1;
        console.log('Inside router for intial load for page: ' + this.p + ' With filter:: ' + app.chosenFilter);  

        if(!app.masterList){
            app.masterList = new app.Teasers();    
            //app.teasersList = new app.Teasers();
            var self = this;   
            app.masterList.fetch({
                success:function () {
                console.log("Fetched data from server!"); 
                if(app.chosenFilter =="All") {
                    app.teasersList = app.masterList;
                } else {
                    var result = app.masterList.where({category: _filter});
                    app.teasersList = new app.Teasers(result); 
                }
                self.mainLoad(app.teasersList);             
            }
            });
        } else {

                if(app.chosenFilter =="All") {
                    app.teasersList = app.masterList;
                } else {
                    var result = app.masterList.where({category: app.chosenFilter});
                    app.teasersList = new app.Teasers(result); 
                }
                this.mainLoad(app.teasersList);   
        }
    }, 

    mainLoad: function(_collection){
        //console.log('Inside main load'); 

        this.teasersListView = new app.TeasersListView({page:this.p, model:_collection}); 
        $('#sidebar').html(this.teasersListView.render().el);
        $("#filter").val(app.chosenFilter);

            if(!app.addTeaserRequest) { //main load first time with or without id.
                //console.log("This is not an add request");
                if(this.requestedId) {
                        this.teaserDetails(this.requestedId);
                } else {
                        if(app.teasersList.length > 0) {
                            //var Pos = Math.min(startPos + 4, len);
                            this.teaserDetails(app.teasersList.at((this.p-1)*app.docsPerPage).get('_id')); 
                        }     
                    }  
            } else { //Its main load for add
                    this.teaserNewView = new app.TeasersNewView({model: new app.Teaser()});
                    $('#mainbar').html(this.teaserNewView.render().el);
                    app.addTeaserRequest = false;
            }
        }, 

    teaserDetails: function(id){

        if(this.teaserNewView){
            this.teaserNewView.close();
        }

         if(app.teasersList){
                this.teaser = app.teasersList.get(id);
                if(this.teasersView)  this.teasersView.close();                
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
