/* MainCtrl */
app.controller("ForgotCtrl", function($scope, $window, $location, HttpService, ServiceUrls, LS){	
	$scope.forgotPassword = function(user){
		var url = ServiceUrls.ForgotPassword;
		var data = new Object();
		data.login_name = user.user_email;

		HttpService.ForgotPasswordService(url, data)
			.then(function successCallback(response){
				if(response.ForgotPasswordResult == 1){
					$scope.reset_message = "Your new passwrod sent to your mailid.";
				}
				else if(response.ForgotPasswordResult == -1){
					$scope.message = "User does not exist";
				}
				else{
					$log.info(response);
				}
			}, function errorCallback(error){
				$log.info(error);		
			});
	}
});