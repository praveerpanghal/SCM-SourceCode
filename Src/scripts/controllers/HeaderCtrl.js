app.controller("HeaderCtrl" ,function($scope, $location){
	$scope.$on('$routeChangeStart', function() { 
		$scope.path = $location.path();   		
 	});
});