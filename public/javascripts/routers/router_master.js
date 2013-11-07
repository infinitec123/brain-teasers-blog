/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var vent = {};

	var TeaserRouter = Backbone.Router.extend({

    initialize: function() {
        //console.log("initialize of router");   
        app.chosenFilter = "All";
        app.docsPerPage = 4;
        _.extend(vent, Backbone.Events);
        //console.log(vent);
        _.bindAll(this, "mF");
        vent.bind("filterrequest", this.mF);

    }, 
	
    routes: {

            "teasers/new": "addTeaser",
            "teasers/edit/:id":"editTeaserDetails",
			"teasers/:id":"teaserDetails",
            //"filter/:id": "manageFilter",
            "teasers/page/:page": "initialLoad",
            "": "initialLoad"
	},



    mF: function(_f){
        //console.log("Heard an event from ListView!");
        //console.log(_f);

        this.initialLoad();
    },

    addTeaser: function(){
        console.log("Will add a new teaser!");
        app.addTeaserRequest = true;
        app.chosenFilter = "All";

        if(this.teasersView)    this.teasersView.close();
        this.initialLoad();
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
        //console.log(vent); 


        this.teasersListView = new app.TeasersListView({page:this.p, model:_collection, vent:vent}); 
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

        if(this.teaserNewView != null){
            this.teaserNewView.close(); //not working correctly
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
