var app = app || {};

(function () {
	'use strict';

app.Teaser = Backbone.Model.extend({
    defaults: {
    	title: 'No title',
    	question: 'No question',
    	solution: 'No solution',
    	image_name: 'logo.png',
    	difficulty: 'Medium',
    	category:'Logical'
    },

		idAttribute: '_id',

});

})();