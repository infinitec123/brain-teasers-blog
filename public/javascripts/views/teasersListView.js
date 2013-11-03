/*global Backbone */
var app = app || {};

(function () {
    'use strict';

app.TeasersListView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {


        var self = this;
        this.listenTo( app.teasersList, 'add', this.renderTeaser );
        this.listenTo( app.teasersList, 'reset', this.render);
        //this.model.bind("reset", this.render, this);
        },

    render:function (eventName) {
        _.each(this.model.models, function (teaser) {
            $(this.el).append(new app.TeaserListItemView({model:teaser}).render().el);
        }, this);
        return this;
    },

    renderTeaser: function(item){
        console.log("Will add new teaser to the list");
        console.log(item.get('_id'));
        //$(this.el).append(new app.TeaserListItemView({model:teaser}).render().el);
        //this.$el.append( new app.TeaserListItemView({model:item}).render().el );
        //$(this.el).append(new app.TeaserListItemView({model:item}).render().el);
        //$('#sidebar').html($(this.el));
        //console.log($(this.el));
        //return this;
    }

});


})();
