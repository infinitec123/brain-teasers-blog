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
        console.log(Backbone.history.fragment);
        app.TeaserRouter.navigate('teasers/page/1', {trigger: true});
    },

    render:function (eventName) {
         
        //var teasers = this.model.models;
        var len = this.model.models.length;
        //console.log(this.page);
        var startPos = (parseInt(this.options.page) - 1) * 4;
        var endPos = Math.min(startPos + 4, len);
        //console.log("startPos" + startPos + "length" + len + "endPos" + endPos);

         $(this.el).html(this.template);
         $(this.el).append("<ul>");

         for (var i = startPos; i < endPos; i++) {
            $(this.el).append(new app.TeaserListItemView({model:this.model.models[i]}).render().el);
         } 

        $(this.el).append("</ul>");
        $(this.el).append(new app.Paginator({model: this.model, page: this.page}).render().el);
        return this;

       // _.each(this.model.models, function (teaser) {
            //$(this.el).append(new app.TeaserListItemView({model:teaser}).render().el);
       // }, this);



    },

    renderTeaser: function(item){
        $(this.el).append(new app.TeaserListItemView({model:item}).render().el);
    },

    close: function(){
        console.log("Closing the teasers listView!");
        this.unbind();
        this.remove();
    },

});


})();
