'use strict';

/* Controllers */

var TeasersAppControllers = angular.module('TeasersAppControllers', []);

TeasersAppControllers.controller('main_controller', ['$scope', 'Teaser', 
	function($scope, Teaser){
		$scope.teasers = Teaser.query();
		$scope.category = '';
	}]);

TeasersAppControllers.controller('add_controller', ['$scope', '$location', 'Teaser', 
	function($scope, $location, Teaser){
		$scope.teaser = new Teaser({});

		//Setting some default values;
		$scope.teaser.category = 'Logical';
		$scope.teaser.difficulty = 'Medium'

		$scope.addNewTeaser = function(){
	 		//Skiping Validation for now
	      $scope.teaser.$save(function () {
          $location.path('/');
          $scope.teasers.push($scope.teaser);
      	});
		};
		
	}]);

TeasersAppControllers.controller('edit_controller', ['$scope', '$location', 'Teaser', '$routeParams',
	function($scope, $location, Teaser, $routeParams){

		$scope.teaser = Teaser.get({id: $routeParams.teaserid}, function(teaser){});

		$scope.addNewTeaser = function(){
	 		//Skiping Validation for now
	      $scope.teaser.$update({id: $routeParams.teaserid}, function () {
            $location.path('/teasers/' + $routeParams.teaserid);
            //$scope.teasers.push($scope.teaser);
      	   });
		};


	}]);

TeasersAppControllers.controller('single_controller', ['$scope', '$routeParams', 'Teaser', '$location', 
	function($scope, $routeParams, Teaser, $location){
		//$scope.teasers = Teaser.query();

		$scope.category = '';
		$scope.teaser = Teaser.get({id: $routeParams.teaserid}, function(teaser){
			$scope.image_path = 'images/' + teaser.image_name;
		});

		//console.log($scope.teasers);
		$scope.scrollUp = function(){
			$('#mainbar').scrollTop(0);
		};

		$scope.deleteTeaser = function(){
			$scope.teaser.$delete({id: $routeParams.teaserid}, function(){
				alert('Successfully deleted!');
			});
			$location.path('/');
		};

		$scope.toggleSolutionDiv = function(){
          
          if ($( "#solutionDiv" ).is(':hidden')) {
           $( "#solutionDiv" ).fadeIn('slow');
           $('#toggleButton').text('Hide Solution')
           $('#diffDiv').hide();
           //alert(this.$('#toggleButton').text());
          } else {
           $( "#solutionDiv" ).fadeOut('slow');
           $('#toggleButton').text('Show Solution')
           $('#diffDiv').show();
          }
		};

	}]);