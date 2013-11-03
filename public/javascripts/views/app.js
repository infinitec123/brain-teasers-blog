var app = app || {};

(function () {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '#content',
		initialize: function () {

			this.teasersList = new app.Teasers();
			var self = this;
			this.teasersList.fetch({
            success:function () {
            	//console.log(self.teasersList);
                self.teasersListView = new app.TeasersListView({model:self.teasersList});
                //console.log(self.teasersListView.render().el);
                $('#sidebar').html(self.teasersListView.render().el);

            }
        });
		
		},

		render: function () {
			console.log('Inside render of app view')
		}
	});

})();
