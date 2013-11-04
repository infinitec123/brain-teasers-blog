/*global Backbone */
var app = app || {};

(function () {
    'use strict';

app.TeasersListView = Backbone.View.extend({
    //tagName: 'ul',
    template:_.template($('#sidebar-template').html()),

    initialize: function() {

        var self = this;
        this.listenTo( app.teasersList, 'add', this.renderTeaser );
        this.listenTo( app.teasersList, 'reset', this.render);
        this.listenTo( app.teasersList, 'filtered', this.render2);
        //this.listenTo( app.teasersList, 'sync', this.renderOnSync);
    /*    this.model.bind("add", function(item){
                    console.log(item.toJSON());
                    console.log(item.get('_id'));
        }); */
        },

    events:{
        'change select#filter': 'triggerFilter'
    },

    triggerFilter: function(e){
        app.chosenFilter = $(e.currentTarget).val();
        app.TeaserRouter.navigate('filter/' + app.chosenFilter, {trigger: true});
    },

    render2: function(){
        console.log("filtered received");
        console.log(this.teasersList);
    },

    render:function (eventName) {
         
         $(this.el).html(this.template);
         $(this.el).append("<ul>");

        _.each(this.model.models, function (teaser) {
            $(this.el).append(new app.TeaserListItemView({model:teaser}).render().el);
        }, this);

        $(this.el).append("</ul>");
        return this;
        //$('#sidebar').html($(this.el));
    },

    renderOnSync:function (_collection, _resp, _options) {
        console.log("Sync detected");
        _.each(_collection, function (teaser) {
            $(this.el).append(new app.TeaserListItemView({model:teaser}).render().el);
        }, this);
        return this;
    },

    renderTeaser: function(item){
        //console.log("Will add new teaser to the list");
        //console.log(item.toJSON());
        //console.log(item.get('_id'));
        //console.log(item.get('id'));
        $(this.el).append(new app.TeaserListItemView({model:item}).render().el);
        //this.$el.append( new app.TeaserListItemView({model:item}).render().el );
        //$(this.el).append(new app.TeaserListItemView({model:item}).render().el);
        //$('#sidebar').html($(this.el));
        //console.log($(this.el));
        //return this;
    },

    close: function(){
        console.log("Closing the teasers listView!");
        this.unbind();
        this.remove();
    },

});


})();
