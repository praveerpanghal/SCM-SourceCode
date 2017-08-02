/* MainCtrl */
app.controller("MainCtrl", ['$scope', '$http', '$location', 'LS', 'ServiceUrls', 'HttpService', function($scope, $http, $location, LS, ServiceUrls, HttpService){
	// Checks User Details
	this.latestData = function(){
		// var encodedProfile = sessionStorage.token.split('.')[1];
		// var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		// return profile.userId;
		return LS.getData();
	} 

	if(this.latestData()!=null){
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

            /* post comment code start */
            $scope.postComments = function(postComment){
                var url = ServiceUrls.PostComment;
                var data = new Object();
                data.request_by_user = profile.userId;
                data.postComment = postComment;
            	HttpService.PostCommentService(url, data)
            		.then(function(response){
            			if(response==1){
            				$scope.postComment='';
            				$route.reload();
            			}else{
            				$scope.Error = 'Error Occured while posting your data.';
            			}
            		}, 
                    function(error){
            			$log.info(error);
            		});
            }
            /* post comment code end */

            /* accept request code start */
            $scope.acceptRequest = function(accept){
            	var url = ServiceUrls.ResponseFriendRequest;
                var data = new Object();
                data.user_id = accept.user_id;
                data.action_user_id = profile.userId;      
                data.status = 1;
                //console.log(data);
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
                //console.log(reject);
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