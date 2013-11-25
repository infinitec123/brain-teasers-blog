/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

app.TeasersView = Backbone.View.extend({

   // tagName: 'div',
    template:_.template($('#tpl-teaser-details').html()),
    
    initialize: function() {
        this.model.bind("change", this.render, this);
        this.listenTo( this.model, 'change', this.render );
    },

    events:{
        'click button#toggleButton': 'toggleSolution',
        'click button#deleteButton': 'deleteModel',
        'click button#scrollButton': 'scrollUp'
    },

    scrollUp: function(){
       // alert("Request for scrolling Up!");
       var $solutionDiv = $( "#solutionDiv" );
       console.log("Trying to scroll up 1");
       console.log(this.$('#solutionDiv'));
       console.log($('#solutionDiv'));
       $('#mainbar').scrollTop(0);
       console.log("Trying to scroll up 2");
       //$(window).scrollTop();
    },

    toggleSolution: function(event){
       // console.log("Request to toggle the solution");
        //$( "#solutionDiv" ).toggle();
        event.preventDefault();
        var $solutionDiv = $( "#solutionDiv" );
        var $diffDiv = $('#diffDiv');
        
        if ($solutionDiv.is(':hidden')) {
         $solutionDiv.fadeIn('slow');
         this.$('#toggleButton').text('Hide Solution')
         $diffDiv.hide();
         //alert(this.$('#toggleButton').text());
       } else {
         $solutionDiv.fadeOut('slow');
         this.$('#toggleButton').text('Show Solution')
         $diffDiv.show();
       }
       return false;
    },

    deleteModel: function(){
        //alert('delete request received');
        self = this;
        this.model.destroy({
            success:function () {
                alert('Teaser deleted successfully');
                window.history.back();
                self.unbind();
                self.remove();
            }
        });
        return false;
    }, 

    close: function(){
        console.log("Closing the teasersView!");
        this.unbind();
        this.remove();

    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

})(jQuery);