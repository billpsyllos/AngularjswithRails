var myApp = angular.module('kifinas', ['ngRoute', 'ngResource']); 

myApp.factory('Chats', ['$resource',function($resource){
  return $resource('/chats.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);


myApp.controller('AddController' , ['$scope', 'Chats', '$resource','$http' ,'$location', function($scope, Chats,$resource,$http,$location) {
	$scope.chats = Chats.query();

	 $scope.save = function () {
	    if ($scope.commentForm.$valid){
	      Chats.create({chat: $scope.chat}, function(responce){
	      	 $scope.chats.push(responce);	        
	      }, function(error){
	        console.log(error)
	      });
	    }
  }

}])

myApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/',{ controller:'AddController',  templateUrl: '/templates/chats/index.html'
     
    });
  }
]);
