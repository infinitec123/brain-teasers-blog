'use strict';

/* App Module */

var TeasersApp = angular.module('TeasersApp', [
	'ngRoute',
	'TeasersAppServices',
	'TeasersAppControllers'
	]);

TeasersApp.config(['$routeProvider',  
	function($routeProvider){
	  $routeProvider.
		when('/teasers/new', {
			controller: 'add_controller',
			templateUrl: 'partials/add-teaser.html'
		}).
		when('/teasers/edit/:teaserid', {
			controller: 'edit_controller',
			templateUrl: 'partials/add-teaser.html'
		}).
		when('/teasers/:teaserid', {
			controller: 'single_controller',
			templateUrl: 'partials/single-teaser.html'
		});
	}]);

TeasersApp.config(['$locationProvider', function($locationProvider){
	console.log('Here');
	//$locationProvider.html5Mode(true);
}]);