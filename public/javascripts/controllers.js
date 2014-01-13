'use strict';

/* Controllers */

var TeasersAppControllers = angular.module('TeasersAppControllers', []);

TeasersAppControllers.controller('main_controller', ['$scope', 'Teaser', 
	function($scope, Teaser){
		$scope.teasers = Teaser.query();
		//$scope.teasers = teasers;
		$scope.category = '';
		//$scope.teaser = $scope.teasers[0];
	}]); 

TeasersAppControllers.controller('login_controller', ['$scope', '$http', function($scope, $http){
	$scope.LogMeIn = function(){
		alert('here');
		var request = $http.get('/auth/facebook');
	}
}]);



TeasersAppControllers.controller('add_controller', ['$scope', '$location', 'Teaser', 
	function($scope, $location, Teaser){
		
		$scope.teaser = new Teaser({});

		//Setting some default values;
		$scope.teaser.category = 'Logical';
		$scope.teaser.difficulty = 'Medium';
		$scope.teaser.image_name = 'how.jpg';

		$scope.addNewTeaser = function(){

	      $scope.teaser.$save(function () {
          $scope.teasers.push($scope.teaser);
          $location.path('/teasers/' + $scope.teaser._id);
      	});
		};

		$scope.getCssClasses = function(ngModelController){
			return {
				error: ngModelController.$invalid && ngModelController.$dirty, 
				success: ngModelController.$valid && ngModelController.$dirty
			}
		};

		$scope.showError = function(ngModelController, error){
			return ngModelController.$error[error];
		};

		$scope.canSave = function(){
			return $scope.TeaserEntryForm.$dirty && $scope.TeaserEntryForm.$valid;
		}
		
	}]);






TeasersAppControllers.controller('edit_controller', ['$scope', '$location', 'Teaser', '$routeParams',
	function($scope, $location, Teaser, $routeParams){

		$scope.teaser = Teaser.get({id: $routeParams.teaserid}, function(teaser){});

		$scope.addNewTeaser = function(){

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

		$scope.getCssClasses = function(ngModelController){
			return {
				error: ngModelController.$invalid && ngModelController.$dirty, 
				success: ngModelController.$valid && ngModelController.$dirty
			}
		};

		$scope.showError = function(ngModelController, error){
			return ngModelController.$error[error];
		};

		$scope.canSave = function(){
			//console.log('called2');
			//return true;
			return $scope.TeaserEntryForm.$dirty && $scope.TeaserEntryForm.$valid;
		};



	}]);








TeasersAppControllers.controller('single_controller', ['$scope', '$routeParams', 'Teaser', '$location', 
	function($scope, $routeParams, Teaser, $location){

		$scope.category = '';
		$scope.isDivHidden = true;
		$scope.buttonText = 'Show Solution';

		$scope.teaser = Teaser.get({id: $routeParams.teaserid}, function(teaser){
			$scope.image_path = '/images/' + teaser.image_name;
		});
		
		//console.log($scope.teasers);
		$scope.scrollUp = function(){
			$('#mainbar').scrollTop(0);
		};

		$scope.deleteTeaser = function(){
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
			$location.path('/').replace();
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
		};

	}]);