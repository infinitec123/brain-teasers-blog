var app = app || {};

(function () {
	'use strict';

_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

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

        validation: {
         title: {
           required: true
        }, 
        question: {
            required: true,
            minLength: 8
        },
        solution:{
            required: true,
            minLength: 8
        }
        }
});

})();