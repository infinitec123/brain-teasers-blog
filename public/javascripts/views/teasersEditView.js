/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

app.TeasersEditView = Backbone.View.extend({

   // tagName: 'div',
    template:_.template($('#tpl-teaser-edit-item').html()),
    
    initialize: function() {
        Backbone.Validation.bind(this);       
    },

    events:{
        'click button#saveEditChanges': 'saveEditChanges'
    },

    saveEditChanges: function(){
        //alert("Will try to save back!");

        this.model.set({
            title:$('#titleEditinput').val(),
            question:$('#questionEditinput').val(),
            solution:$('#solutionEditinput').val(),
            image_name:$('#image_name_edit').val(),
            category:$('#category_edit').val(),
            difficulty:$('#difficulty_edit').val()
        });
        this.model.save(); 
        $(this.el).unbind();
        this.remove();
        //window.history.back();
        app.TeaserRouter.navigate('teasers/' + this.model.get('_id'), { trigger: true });
        return false;
    },

    render:function (eventName) {
        //console.log("Edit " + this.model.get('title'));
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

})(jQuery);