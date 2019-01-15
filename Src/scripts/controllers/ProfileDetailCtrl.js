app.controller("ProfileDetailCtrl", ['$scope', '$routeParams', '$log', 'ServiceUrls', 'HttpService', 'LS', function($scope, $routeParams, $log, ServiceUrls, HttpService, LS) {	
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
console.log(profile);
	var url = ServiceUrls.GetUserInfo;
	var data = new Object();
	data.user_id = $routeParams.userId;
	console.log(data.user_id);
	HttpService.PostMethod(url, data)
		.then(function(response){
			console.log(response);
			if(response.GetUserInfoResult!=''){					
			$scope.userInfo = JSON.parse(response.GetUserInfoResult);
			$scope.userProfile = $scope.userInfo[0].UserProfile[0];
			$scope.PeopleYouMayKnow = $scope.userInfo[0].PeopleYouMayKnow;
			$scope.commentsInfo = $scope.userInfo[0].CommentImagePost;
				
			//console.log($scope.userInfo);
			}else{
				alert('Data Not Found');
				$location.path('/logout');
			}
		}, function errorCallback(error){
			$log.info(error);		
		});
}]);