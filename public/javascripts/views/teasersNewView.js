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
        console.log("TeasersNewView:: Will try to add");
        event.preventDefault();

        //this.newTeaser = new app.Teaser();
        var temp = {};
        temp['title'] =  $('#titleAddinput').val();
        temp['solution'] =  $('#solutionAddinput').val();
        temp['question'] = $('#questionAddinput').val();
        temp['image_name'] = $('#image_name_add').val();
        temp['category'] = $('#category_add').val();
        temp['difficulty'] = $('#difficulty_add').val();
        var self = this;
        app.teasersList.create(temp, {
                success:function (_teaser) {
                    console.log("successfully saved and returned");
                    $(self.el).unbind();
                    self.remove();
                    console.log("Printing from teasersNewView");
                    console.log(_teaser);
                    app.TeaserRouter.navigate('teasers/' + _teaser.get('_id'), { trigger: true });
                }
        });


        //app.teasersList.create( temp );
        //$(this.el).unbind();
        //this.remove();
        //app.TeaserRouter.navigate('teasers/' + self.model.id, { trigger: true });

      /*  this.model.set({
            title:$('#titleAddinput').val(),
            question:$('#questionAddinput').val(),
            solution:$('#solutionAddinput').val(),
            image_name:$('#image_name_add').val(),
            category:$('#category_add').val(),
            difficulty:$('#difficulty_add').val()
        });

        var self = this;
        app.teasersList.create(this.model, {
                success:function () {
                    console.log("successfully saved and returned" + self.model.id);
                    $(self.el).unbind();
                    self.remove();
                    app.TeaserRouter.navigate('teasers/' + self.model.id, { trigger: true });
                }
        }); */

    /*   this.model.save(); 
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