/* MainCtrl */
app.controller("MainCtrl", ['$scope', '$http', 'LS', 'ServiceUrls', 'HttpService', function($scope, $http, LS, ServiceUrls, HttpService){
	// Checks User Details
	this.latestData = function(){
		// var encodedProfile = sessionStorage.token.split('.')[1];
		// var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		// return profile.userId;
		return LS.getData();
	} 

	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
console.log(profile);
	if(profile.userId){
		var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = profile.userId;
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
				}else{
					alert('Data Not Found');
					$location.path('/logout');
				}
			}, 
            function errorCallback(error){
				$log.info(error);		
			});
		

            /* home page data from json start */
            $http.get("Src/jsondata/PostedData.json")
                .success(function(response){
                    $scope.postedData=response.UserData;
            });
            /* home page data from json end */

            /* friend request sent code start */

            $scope.frdRequest = function(userId){
            	var url = ServiceUrls.UserMeet;
            	var data = new Object();
				data.request_by_user = profile.userId;
				data.request_to_user = userId;
                /*
            	HttpService.UserMeetService(url, data)
            		.then(function(response){
            			if(response==1){
            				console.log('sending request to user from meet me'+response);
            				$route.reload();            				
            			}else{
            				alret('some thing went wrong, please try again.');
            			}
            	}, 
            	function errorCallback(error){
					$log.info(error);		
				});
                */
            }
            /* friend request sent code end */
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

            $scope.action = function(username){
                if(username){                
                    $location.path('/friends/'+username);
                }
            }

	}else{
		$location.path('/');
	}
}]);