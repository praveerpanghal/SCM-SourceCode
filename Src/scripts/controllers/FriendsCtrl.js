app.controller("FriendsCtrl", ['$scope', '$location', '$route', 'ServiceUrls', 'HttpService', 'LS', function($scope, $location, $route, ServiceUrls, HttpService, LS){
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

			$scope.action = function(username){
	            if(username){                
	                $location.path('/friends/'+username);
	            }
	        }

        	/* accept request code start */
            $scope.acceptRequest = function(accept){
            	var url = ServiceUrls.ResponseFriendRequest;
                var data = new Object();
                data.user_id = accept.user_id;
                data.action_user_id = profile.userId;      
                data.status = 1;
                console.log(data);
            	HttpService.ResponseFriendRequestService(url, data)
        			.then(function(response){        				
                        $route.reload();
        			}, function(error){
        				$log.info(error);
        			});
            }
            /* accept request code end */

            /* reject request code start */
            $scope.rejectRequest = function(reject){
                console.log(reject);
            	var url = ServiceUrls.ResponseFriendRequest;
            	var data = new Object();
            	data.user_id = reject.user_id;
            	data.action_user_id = profile.userId;
                data.status = 2;
            	console.log(data);
                
            	HttpService.ResponseFriendRequestService(url, data)
        			.then(function(response){
        				$route.reload();
        			}, function(error){
        				$log.info(error);
        			});                
            }
            /* reject request code end */
}]);