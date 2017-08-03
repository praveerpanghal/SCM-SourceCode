app.controller("FriendsCtrl", ['$scope', 'ServiceUrls', 'HttpService', 'LS', function($scope, ServiceUrls, HttpService, LS){
	$scope.data = 'friends page comming soon!';
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
                    $scope.userProfile = $scope.userInfo[0].UserProfile[0];
                    //$scope.PeopleYouMayKnow = $scope.userInfo[0].PeopleYouMayKnow;
                    //$scope.commentsInfo = $scope.userInfo[0].CommentImagePost;
                    $scope.friendRequests = $scope.userInfo[0].FriendRequest;
                    //console.log($scope.userInfo);
                    //console.log($scope.userInfo[0].FriendRequest);
                    //console.log($scope.userInfo[0].PeopleYouMayKnow);
                }else{
                    alert('Data Not Found');
                    $location.path('/logout');
                }
            }, 
            function errorCallback(error){
                $log.info(error);       
            });

	var url = ServiceUrls.GetFriendsList;
	var data = new Object();
	data.user_id = profile.userId;
	
	HttpService.GetFriendsListService(url, data)
		.then(function(response){
			if(response!=''){
				$scope.friendsData = response;
				console.log($scope.friendsData);
			}else{
				$scope.emptyList = 'Your Friends List is Empty!'
			}
		}, function(error){
				$log.info(error);
			});
}]);