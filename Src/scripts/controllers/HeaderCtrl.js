app.controller("HeaderCtrl" ,function($scope, $location, LS){
	$scope.keySearch = true;
	var user = LS.getData();
		
	$scope.$on('$routeChangeStart', function() { 
		$scope.path = $location.path();   
		$scope.manageKey = sessionStorage.getItem('loginKey');
 	});
 	// search functionality
 	$scope.action = function(username){
        if(username){                
            $location.path('/friends/'+username);
        }
	}	
});