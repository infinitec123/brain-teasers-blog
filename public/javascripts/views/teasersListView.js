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
        //alert($(e.currentTarget).val());
        console.log($(e.currentTarget).val());
        app.chosenFilter = $(e.currentTarget).val();
       // app.teasersList('filter');
       //var result = app.teasersList.where({category: app.chosenFilter});
       //console.log(result);
       //console.log(result.length);
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
    }

});


})();
