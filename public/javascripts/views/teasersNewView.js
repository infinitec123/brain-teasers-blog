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
        alert("Will try to add!");
        event.preventDefault();

        //this.newTeaser = new app.Teaser();

        this.model .set({
            title:$('#titleAddinput').val(),
            question:$('#questionAddinput').val(),
            solution:$('#solutionAddinput').val(),
            image_name:$('#image_name_add').val(),
            category:$('#category_add').val(),
            difficulty:$('#difficulty_add').val()
        });

        console.log(this.model);
        var self = this;
        
        app.Teasers.create(this.model, {
                success:function () {
                    console.log("Saved successfully!");
                    app.TeaserRouter('teasers/' + self.model.id, false);
                }
        }); 

       /* this.model.save(); 
        $(this.el).unbind();
        this.remove();
        //window.history.back();
        app.TeaserRouter.navigate('teasers/' + this.model.get('_id'), { trigger: true }); */
        return false;
    },

    render:function (eventName) {
        //console.log("Edit " + this.model.get('title'));
        $(this.el).html(this.template);
        return this;
    }

});

})(jQuery);