app.controller("PeopleYouMayKnowCtrl", ['$scope', '$location', '$routeParams', '$route', 'ServiceUrls', 'HttpService', 'LS', function($scope, $location, $routeParams, $route, ServiceUrls, HttpService, LS) {
		var user = LS.getData();
		var encodedProfile = user.split('.')[1];
		var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = profile.userId;
		//console.log(data);
		HttpService.PostMethod(url, data)
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
        /* accept request code start */
            $scope.acceptRequest = function(accept){
            	var url = ServiceUrls.ResponseFriendRequest;
                var data = new Object();
                data.user_id = accept.user_id;
                data.action_user_id = profile.userId;      
                data.status = 1;
                console.log(data);
            	HttpService.PostMethod(url, data)
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
                
            	HttpService.PostMethod(url, data)
        			.then(function(response){
        				$route.reload();
        			}, function(error){
        				$log.info(error);
        			});                
            }
            /* reject request code end */

            /* send request code start */
			$scope.frdRequest = function(toUserId){
				var url = ServiceUrls.SendFriendRequest;
		        var data = new Object();
				data.user_id = profile.userId;
				data.friend_id = toUserId;		
				data.action_user_id = profile.userId;
				console.log(data);
		    	HttpService.PostMethod(url, data)
		    		.then(function(response){
		    			console.log(response);
		    			if(response==1){
		    				//console.log('sending request to user from meet me'+response);
		    				$route.reload();            				
		    			}else{
		    				alert('some thing went wrong, please try again.');
		    			}
		    		}, 
		    		function errorCallback(error){
						$log.info(error);		
					});
			}
			/* send request code end */
}]);