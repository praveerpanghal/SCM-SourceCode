/* MainCtrl */
app.controller("ForgotCtrl", ['$scope', '$window', '$location', 'HttpService', 'ServiceUrls', 'LS', function($scope, $window, $location, HttpService, ServiceUrls, LS){	
	$scope.forgotPassword = function(user){
		var url = ServiceUrls.ForgotPassword;
		var data = new Object();
		data.login_name = user.user_email;

		HttpService.PostMethod(url, data)
			.then(function successCallback(response){
				if(response.ForgotPasswordResult == 1){
					$scope.reset_message = "Thank you, your password has been sent to registered email id.";
					$scope.disabled_key=true;
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
}]);