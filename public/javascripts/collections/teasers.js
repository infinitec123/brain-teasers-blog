/*global Backbone */
var app = app || {};

(function () {
	'use strict';

app.Teasers = Backbone.Collection.extend({
    model: app.Teaser,
    url: '/teasers'
});

})();