app.controller("FriendsCtrl", ['$location', '$route', 'ServiceUrls', 'HttpService', 'LS', function($location, $route, ServiceUrls, HttpService, LS){
	
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
	var vm = this;

	var url = ServiceUrls.GetUserInfo;
    var data = new Object();
    data.user_id = profile.userId;
    HttpService.PostMethod(url, data)
        .then(function(response){
            if(response.GetUserInfoResult!=''){                 
                vm.userInfo = JSON.parse(response.GetUserInfoResult);
                vm.userProfile = vm.userInfo[0].UserProfile[0];
                vm.friendRequests = vm.userInfo[0].FriendRequest;
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
	
		HttpService.PostMethod(url, data)
			.then(function(response){
				if(response!=''){
					vm.friendsData = response;
					///console.log(vm.friendsData);
				}else{
					vm.emptyList = 'Your Friends List is Empty!'
				}
			}, function(error){
					$log.info(error);
				});

			vm.action = function(username){
	            if(username){                
	                $location.path('/friends/'+username);
	            }
	        }

        	/* accept request code start */
            vm.acceptRequest = function(accept){
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
            vm.rejectRequest = function(reject){
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
            
            /* post comment code start */
            vm.postComments = function(postComment){
                var url = ServiceUrls.PostComment;
                var data = new Object();
                data.user_id = profile.userId;
                data.friend_id = profile.userId;
                data.comment = postComment;
                console.log(data);                
                HttpService.PostMethod(url, data)
                    .then(function(response){
                       // console.log(response);
                        if(response==2){
                            vm.postSuccess='Comment posted successfully.';
                            $route.reload();
                            //$location.path('/');
                        }else{
                            vm.Error = 'Error Occured while posting your data.';
                        }
                    }, 
                    function(error){
                        $log.info(error);
                    });
            }
            /* post comment code end */
}]);