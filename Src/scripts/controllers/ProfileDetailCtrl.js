app.controller("ProfileDetail", function($scope, $routeParams, ServiceUrls, HttpService, LS) {
	$scope.test = "Test";
	var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = profile.userId;
		//console.log(data.user_id);
		HttpService.UserInfoService(url, data)
			.then(function(response){
				if(response.GetUserInfoResult!=''){					
				$scope.userInfo = JSON.parse(response.GetUserInfoResult);
				$scope.userProfile = $scope.userInfo[0].UserProfile[0];
				$scope.PeopleYouMayKnow = $scope.userInfo[0].PeopleYouMayKnow;
				$scope.commentsInfo = $scope.userInfo[0].CommentImagePost;
				$scope.friendRequests = $scope.userInfo[0].FriendRequest;
				//console.log($scope.userInfo);
				//console.log($scope.userInfo[0].FriendRequest);
				//console.log($scope.userInfo[0].PeopleYouMayKnow);
				//$scope.text = "Hi "+$scope.userProfile.username+", Welcome to SchoolConnect";				
				}else{
					alert('Data Not Found');
					$location.path('/logout');
				}
			}, function errorCallback(error){
				$log.info(error);		
			});

			$scope.action = function(userId){
	            if(userId){                
	                $location.path('/friends/'+userId);
	            }
        	}

});