/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';


app.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function (attrs) {
        this.model.bind("reset", this.render, this);
        this.options = attrs;
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 4);

        $(this.el).html('<ul />');

        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#teasers/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});


})(jQuery);