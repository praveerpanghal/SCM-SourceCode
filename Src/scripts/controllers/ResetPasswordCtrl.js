app.controller('ResetPasswordCtrl', ['$scope', '$log', '$location', 'ServiceUrls', 'HttpService', 'LS', function($scope, $log, $location, ServiceUrls, HttpService, LS) {
	/* to get useid from local storage service */
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));

	$scope.resetPassword = function(reset){
		var url = ServiceUrls.ChangePassword;
		var data = new Object();
		data.user_id = profile.userId;
		data.old_password = reset.oldPassword;
		data.new_password = reset.confirmPassword;
		console.log(data);
		HttpService.ChangePasswordService(url, data)
			.then(function(response){
				if(response.ChangePasswordResult == 1){
					alert('Your password has been changed successfully.');
					$location.path('/logout');
				}else if(response.ChangePasswordResult == -1){
					$scope.errorMessage = 'Your old password is wrong. Please try again.';
				}
				console.log(response);
			}, function errorCallback(error){
				$log.info(error);		
			});
	}
}]);