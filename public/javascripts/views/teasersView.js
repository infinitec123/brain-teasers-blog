/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

app.TeasersView = Backbone.View.extend({

   // tagName: 'div',
    template:_.template($('#tpl-teaser-details').html()),
    
    initialize: function() {
        this.model.bind("change", this.render, this);
    },

    events:{
        'click button#toggleButton': 'toggleSolution',
        'click button#deleteButton': 'deleteModel'
    },

    toggleSolution: function(){
       // console.log("Request to toggle the solution");
        $( "#solutionDiv" ).toggle();
    },

    edit: function(){
        alert('edit request received');
    },

    deleteModel: function(){
        //alert('delete request received');
        self = this;
        this.model.destroy({
            success:function () {
                alert('Teaser deleted successfully');
                window.history.back();
                self.remove();
                self.unbind();
                //this.$el.empty();
                //this.unbind();
                //
                //$(this.el).unbind();
                //$(this.el).remove();
            }
        });
        return false;
    }, 

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

})(jQuery);