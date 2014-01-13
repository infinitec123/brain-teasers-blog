'use strict';

/* App Module */

var TeasersApp = angular.module('TeasersApp', [
	'ngRoute',
	'ngSanitize',
	'TeasersAppServices',
	'TeasersAppControllers'
	]);

TeasersApp.config(['$routeProvider',  
	function($routeProvider){
	  $routeProvider.
		when('/teasers/new', {
			controller: 'add_controller',
			templateUrl: '/partials/add-teaser.html'
		}).
		when('/teasers/edit/:teaserid', {
			controller: 'edit_controller',
			templateUrl: '/partials/add-teaser.html'
		}).
		when('/teasers/:teaserid', {
			controller: 'single_controller',
			templateUrl: '/partials/single-teaser.html'
		}).
		when('/', {
			controller: 'main_controller',
			templateUrl: '/partials/landing-page.html'
		}).
		when('/login', {
			controller: 'login_controller',
			templateUrl: '/partials/login-page.html'
		}).
		otherwise({redirectTo: '/'});
	}]);

TeasersApp.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode(true);
}]);

TeasersApp.config(['$httpProvider', function($httpProvider){
	$httpProvider.interceptors.push(function($q, $location){
		return {
			'response': function(response){
				//console.log(response);
				return response;
			},
			'responseError': function(rejection){
				if(rejection.status === 401){
					console.log('401 received');
					$location.path('/login');
					//location.reload();
				}
				return $q.reject(rejection);
			}
		};
	}); // End of push
}]);