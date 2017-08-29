/* MainCtrl */
app.controller("LoginCtrl", ['$location', '$log', '$http', '$window', 'HttpService', 'ServiceUrls', 'LS', function($location, $log, $http, $window, HttpService, ServiceUrls, LS){	
	
	var user = LS.getData();
	var vm = this;
	if(user){
		$location.path('/home');
	}else{
		$location.path('/');
	}

	vm.loginUser = function(user){		
		$http
	      .post('/authenticate', user)
	      .success(function (data, status, headers, config) {      	
	      	if(data.err_status==0){
	      		vm.err_message = data.token;      		
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