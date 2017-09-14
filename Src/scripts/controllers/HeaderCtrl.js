app.controller("HeaderCtrl" ,function($scope, $location, LS){
	$scope.keySearch = true;
	var user = LS.getData();
		
	$scope.$on('$routeChangeStart', function() { 
		$scope.path = $location.path();   		
 	});
 	// search functionality
 	$scope.action = function(username){
        if(username){                
            $location.path('/friends/'+username);
        }
	}
	
	if(user == null && $location.path() == '/pages'){
		$scope.keySearch = false;
		console.log($scope.keySearch);
	}
});