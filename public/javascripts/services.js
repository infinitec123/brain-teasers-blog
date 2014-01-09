'use strict';

/* Services */

var TeasersAppServices = angular.module('TeasersAppServices', ['ngResource']);

TeasersAppServices.factory('Teaser', ['$resource', 
	function($resource){
		return $resource('/teasers/:id', {}, { update: {method:'PUT'}, 'query': {method: 'GET', isArray: true}});
	}]);