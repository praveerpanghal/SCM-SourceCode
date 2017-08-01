app.controller("PeopleYouMayKnowCtrl", ['$scope', '$routeParams', '$route', 'ServiceUrls', 'HttpService', 'LS', function($scope, $routeParams, $route, ServiceUrls, HttpService, LS) {
		var user = LS.getData();
		var encodedProfile = user.split('.')[1];
		var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = profile.userId;
		HttpService.UserInfoService(url, data)
			.then(function(response){
				if(response.GetUserInfoResult!=''){
					$scope.userInfo = JSON.parse(response.GetUserInfoResult);
				
					$scope.PeopleYouMayKnow = $scope.userInfo[0].PeopleYouMayKnow;
					if($scope.PeopleYouMayKnow.length=='0'){						
					$scope.emptyList = 'Your List is Empty.'
					}
				}else{
				}
			}, 
            function errorCallback(error){
				$log.info(error);		
			});
}]);