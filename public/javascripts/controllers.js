'use strict';

/* Controllers */

var TeasersAppControllers = angular.module('TeasersAppControllers', []);

TeasersAppControllers.controller('main_controller', ['$scope', 'Teaser', 
	function($scope, Teaser){
		$scope.teasers = Teaser.query();
		$scope.category = '';
		$scope.temp = 'Sharath\nPandeshwar';
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

	      var _pos_in_array = -1;
		  $scope.teasers.forEach(function(_t, index){
			if(_t._id === $routeParams.teaserid){
				_pos_in_array = index;
			}
		  });

	      $scope.teaser.$update({id: $routeParams.teaserid}, function (doc) {
            $scope.teasers.splice(_pos_in_array, 1, doc);
            $location.path('/teasers/' + $routeParams.teaserid);
      	   });
		};
	}]);

TeasersAppControllers.controller('single_controller', ['$scope', '$routeParams', 'Teaser', '$location', 
	function($scope, $routeParams, Teaser, $location){
		//$scope.teasers = Teaser.query();

		$scope.category = '';
		$scope.isDivHidden = true;
		$scope.buttonText = 'Show Solution';

		$scope.teaser = Teaser.get({id: $routeParams.teaserid}, function(teaser){
			$scope.image_path = 'images/' + teaser.image_name;
		});

		//console.log($scope.teasers);
		$scope.scrollUp = function(){
			//Bad code. 
			$('#mainbar').scrollTop(0);
		};

		$scope.deleteTeaser = function(){
			
			//var index= $scope.teasers.indexOf($scope.teaser);
			//alert(index);
			var _pos_in_array = -1;
			$scope.teasers.forEach(function(_t, index){
				if(_t._id === $routeParams.teaserid){
					_pos_in_array = index;
				}
			});
			$scope.teaser.$delete({id: $routeParams.teaserid}, function(){
			  alert('Successfully deleted!');
			  $scope.teasers.splice(_pos_in_array, 1);
			});
			$location.path('/');
		};

		$scope.toggleSolutionDiv = function(){
			$scope.isDivHidden = !$scope.isDivHidden;
			if($scope.isDivHidden) {
				$scope.buttonText = 'Show Solution';
			} else {
				$scope.buttonText = 'Hide Solution';
			}
		};

		$scope.returnDivHideStatus = function(){
			return $scope.isDivHidden;
		}

	}]);