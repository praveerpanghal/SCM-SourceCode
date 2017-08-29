app.controller("PeopleYouMayKnowCtrl", ['$scope', '$location', '$routeParams', '$route', 'ServiceUrls', 'HttpService', 'LS', function($scope, $location, $routeParams, $route, ServiceUrls, HttpService, LS) {
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
	var url = ServiceUrls.GetUserInfo;
	var data = new Object();
	data.user_id = profile.userId;
	var vm = this;
	HttpService.PostMethod(url, data)
	.then(function(response){
		if(response.GetUserInfoResult!=''){
			vm.userInfo = JSON.parse(response.GetUserInfoResult);	
			vm.userProfile = vm.userInfo[0].UserProfile[0];			
			vm.PeopleYouMayKnow = vm.userInfo[0].PeopleYouMayKnow;
			vm.friendRequests = vm.userInfo[0].FriendRequest;
			console.log(vm.PeopleYouMayKnow);
			if(vm.PeopleYouMayKnow.length=='0'){						
				vm.emptyList = 'Your List is Empty.'
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
		
		HttpService.PostMethod(url, data)
		.then(function(response){
			$route.reload();
		}, function(error){
			$log.info(error);
		});                
	}
	/* reject request code end */

	/* send request code start */
	vm.frdRequest = function(toUserId){
		var url = ServiceUrls.SendFriendRequest;
		var data = new Object();
		data.user_id = profile.userId;
		data.friend_id = toUserId;		
		data.action_user_id = profile.userId;

		HttpService.PostMethod(url, data)
		.then(function(response){
			console.log(response);
			if(response==1){
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
                console.log(response);
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