app.controller("PeopleYouMayKnowCtrl", ['$scope', '$location', '$routeParams', '$route', 'ServiceUrls', 'HttpService', 'LS', function($scope, $location, $routeParams, $route, ServiceUrls, HttpService, LS) {
		var user = LS.getData();
		var encodedProfile = user.split('.')[1];
		var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = profile.userId;
		console.log(data);
		HttpService.UserInfoService(url, data)
			.then(function(response){
				if(response.GetUserInfoResult!=''){
					$scope.userInfo = JSON.parse(response.GetUserInfoResult);	
					$scope.userProfile = $scope.userInfo[0].UserProfile[0];			
					$scope.PeopleYouMayKnow = $scope.userInfo[0].PeopleYouMayKnow;
					$scope.friendRequests = $scope.userInfo[0].FriendRequest;
					console.log($scope.PeopleYouMayKnow);
					if($scope.PeopleYouMayKnow.length=='0'){						
					$scope.emptyList = 'Your List is Empty.'
					}
				}else{
				}
			}, 
            function errorCallback(error){
				$log.info(error);		
			});

			$scope.action = function(username){
                if(username){                
                    $location.path('/friends/'+username);
                }
            }
}]);