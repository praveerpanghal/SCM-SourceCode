/* MainCtrl */
app.controller("LoginCtrl", function($scope, $location, HttpService, ServiceUrls, LS){	
	
	var user = LS.getData();
	if(user){
		$location.path('/home');
	}else{
		$location.path('/');
	}
	$scope.loginUser = function(user){
		
		var url = ServiceUrls.LoginDetails;
		var data = new Object();
			data.user_email = user.user_email;
		  	data.password = user.password;

		HttpService.LoginUserService(url, data)
			.then(function (response){
				if(response[0].ReturnVal==1){
					LS.setData(user.user_email);
					$location.path('/home');
				}
			}, function errorCallback(error){
				$log.info(error);		
			}); 
	}
});