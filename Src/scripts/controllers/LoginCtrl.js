/* MainCtrl */
app.controller("LoginCtrl", ['$scope', '$location', '$log', '$http', '$window', 'HttpService', 'ServiceUrls', 'LS', function($scope, $location, $log, $http, $window, HttpService, ServiceUrls, LS){	
	
	var user = LS.getData();
	
	if(user){
		$location.path('/home');
	}else{
		$location.path('/');
	}

	$scope.loginUser = function(user){		
		$http
	      .post('/authenticate', $scope.user)
	      .success(function (data, status, headers, config) {      	
	      	if(data.err_status==0){
	      		$scope.err_message = data.token;      		
	      	}else{
	      		LS.setData(data.token);
	      		$location.path('/home');
	      	}
    	})
		.error(function (data, status, headers, config) {
			// Erase the token if the user fails to log in
			delete $window.sessionStorage.token;			
		});
	}
}]);