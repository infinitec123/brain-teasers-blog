/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

app.TeasersNewView = Backbone.View.extend({

   // tagName: 'div',
    template:_.template($('#tpl-teaser-add-item').html()),
    
    initialize: function() {
       // Backbone.Validation.bind(this);       
    },

    events:{
        'click button#addChanges': 'addChanges'
    },

    addChanges: function(event){
        //alert("Will try to add!");
        //console.log("TeasersNewView:: Will try to add");
        event.preventDefault();
        var self = this;

        this.model.set({
            title:$('#titleAddinput').val(),
            question:$('#questionAddinput').val(),
            solution:$('#solutionAddinput').val(),
            image_name:$('#image_name_add').val(),
            category:$('#category_add').val(),
            difficulty:$('#difficulty_add').val()
        });

        this.model.save(null, {
            success: function (model) {
               // self.render();
                console.log("Model Saved!");
                $(self.el).unbind();
                self.remove();
                app.reload = true;
                app.TeaserRouter.navigate('teasers/' + self.model.id, { trigger: true });
                utils.showAlert('Success!', 'Teaser saved successfully', 'alert-success');
            },
            error: function () {
                console.log("Model Save Failed!");
                utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');
            }
        });
    },

    render:function (eventName) {
        //console.log("Edit " + this.model.get('title'));
        $(this.el).html(this.template);
        return this;
    }

});

})(jQuery);