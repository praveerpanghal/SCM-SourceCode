/* MainCtrl */
app.controller("LoginCtrl", function($scope, $location, $log, HttpService, ServiceUrls, LS){	
	$scope.text = "Login Ctrl.";
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
					LS.setData(response[0].UserId);					
					$location.path('/home');
				}else{
					$scope.message = response[0].ReturnVal;
				}
			}, function errorCallback(error){
				$log.info(error);		
			}); 
	}
});