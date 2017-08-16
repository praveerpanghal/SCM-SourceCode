app.controller("HeaderCtrl" ,function($scope, $location){
	$scope.$on('$routeChangeStart', function() { 
		$scope.path = $location.path();   		
 	});
 	// search functionality
 	$scope.action = function(username){
        if(username){                
            $location.path('/friends/'+username);
        }
    }
});