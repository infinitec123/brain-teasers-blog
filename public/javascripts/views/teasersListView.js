/*global Backbone */
var app = app || {};

(function () {
    'use strict';

app.TeasersListView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {

        this.model.bind("reset", this.render, this);
        //console.log('Inside initiallize of listview');
        var self = this;
        },

    render:function (eventName) {
        _.each(this.model.models, function (teaser) {
            //console.log('A teaser rendered');
            $(this.el).append(new app.TeaserListItemView({model:teaser}).render().el);
        }, this);
        return this;
    }

});


})();
