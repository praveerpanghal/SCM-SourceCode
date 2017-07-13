app.controller("ViewProfileCtrl", function($scope, $routeParams, ServiceUrls, HttpService, LS) {
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
	//console.log(profile);
	$scope.username = $routeParams.username;
	var url = ServiceUrls.SearchUser;
	var data = new Object();
	data.username  = $scope.username;
	data.user_id = profile.userId;
	//console.log(data);
	HttpService.SearchUserService(url, data)
			.then(function(response){
				if(response!=''){
					$scope.usersList = response;
					//console.log(response);					
				}
				else{
					$scope.emptyList = "We couldn't find anything for "+$scope.username;
				}
			}, function(error){
				$log.info(error);
			});
});