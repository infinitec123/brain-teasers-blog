/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

app.TeaserListItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'listItem',
    template: _.template( $( '#tpl-teaser-list-item' ).html() ),

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function() {
           // $(this.el).html(this.template(this.model.toJSON()));
            //console.log(this.model.get('title'));
            this.$el.html(this.template(this.model.toJSON()));
            return this;
    },

    close:function () {
        //console.log('Cleaning Up!');
        $(this.el).unbind();
        $(this.el).remove();
    }
});

})(jQuery);