/*global Backbone */
var app = app || {};

(function () {
    'use strict';

app.TeasersListView = Backbone.View.extend({
    //tagName: 'ul',
    template:_.template($('#sidebar-template').html()),

    initialize: function(attrs) {

        var self = this;
        this.listenTo( app.teasersList, 'add', this.renderTeaser );
        this.listenTo( app.teasersList, 'reset', this.render);
        this.options = attrs;

    },

    events:{
        'change select#filter': 'triggerFilter'
    },

    triggerFilter: function(e){
        app.chosenFilter = $(e.currentTarget).val();
        console.log("ListView: Filtering request for " + app.chosenFilter );
        var curr_url = Backbone.history.fragment;
        var new_url = "teasers/page/1"; 

        this.options.vent.trigger("filterrequest", app.chosenFilter);

        //if (curr_url == new_url){ //small hack to prevent problem of router not triggering the route on same url.
          //  new_url = "";
        //}
        app.TeaserRouter.navigate("", {trigger: false});
    },

    render:function (eventName) {
         
        //var teasers = this.model.models;
        var len = this.model.models.length;
        //console.log(this.page);
        var startPos = (parseInt(this.options.page) - 1) * app.docsPerPage;
        var endPos = Math.min(startPos + app.docsPerPage, len);
        //console.log("startPos" + startPos + "length" + len + "endPos" + endPos);

         $(this.el).html(this.template);
         $(this.el).append("<ul>");

         for (var i = startPos; i < endPos; i++) {
            $(this.el).append(new app.TeaserListItemView({model:this.model.models[i]}).render().el);
         } 

        $(this.el).append("</ul>");
        this.PagerView = new app.Paginator({model: this.model, page: this.options.page});
        $(this.el).append(this.PagerView.render().el);
        return this;
    },

    renderTeaser: function(item){
        if(this.PagerView) this.PagerView.close();
        $(this.el).append(new app.TeaserListItemView({model:item}).render().el);
        this.PagerView = new app.Paginator({model: this.model, page: this.options.page});
        console.log(this.PagerView.render().el);
        $(this.el).append(this.PagerView.render().el);
    },

    close: function(){
        console.log("Closing the teasers listView!");
        if(this.PagerView) this.PagerView.close();
        this.remove();
        this.unbind();
    },

});


})();
