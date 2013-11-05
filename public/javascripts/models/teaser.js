var app = app || {};

(function () {
	'use strict';

app.Teaser = Backbone.Model.extend({

    urlRoot: "/teasers",

    defaults: {
    	title: 'No title',
    	question: 'No question',
    	solution: 'No solution',
    	image_name: 'logo.png',
    	difficulty: 'Medium',
    	category:'Logical'
    },

	idAttribute: '_id',

    initialize: function () {
        this.validators = {};

        this.validators.title = function (value) {
            return value.length > 5 ? {isValid: true} : {isValid: false, message: "You must enter a valid title"};
        };

        this.validators.question = function (value) {
            return value.length > 5 ? {isValid: true} : {isValid: false, message: "You must enter a valid question"};
        };

        this.validators.solution = function (value) {
            return value.length > 5 ? {isValid: true} : {isValid: false, message: "You must enter a valid solution"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    }

});

})();