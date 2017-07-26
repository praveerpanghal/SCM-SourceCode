app.controller("ViewProfileCtrl", ['$scope', '$routeParams', '$route', 'ServiceUrls', 'HttpService', 'LS', function($scope, $routeParams, $route, ServiceUrls, HttpService, LS) {
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
	//console.log(profile);
	$scope.username = $routeParams.username;
	var url = ServiceUrls.SearchUser;
	var data = new Object();
	data.username  = $scope.username;
	data.user_id = profile.userId;
	//console.log(data);
	HttpService.SearchUserService(url, data)
			.then(function(response){
				if(response!=''){
					$scope.usersList = response;
					console.log(response);					
				}
				else{
					$scope.emptyList = "We couldn't find anything for "+$scope.username;
				}
			}, function(error){
				$log.info(error);
			});

	/* send request code start */
	$scope.frdRequest = function(toUserId){
		var url = ServiceUrls.SendFriendRequest;
        var data = new Object();
		data.user_id = profile.userId;
		data.friend_id = toUserId;		
		data.action_user_id = profile.userId;
		console.log(data);
    	HttpService.SendFriendRequestService(url, data)
    		.then(function(response){
    			console.log(response);
    			if(response==1){
    				console.log('sending request to user from meet me'+response);
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
				console.log(response);
			}, function(error){
				$log.info(error);
			});
		
    }
    /* accept request code end */

    /* reject request code start */
    $scope.rejectRequest = function(accept){
    	console.log(accept);
    	var url = ServiceUrls.ResponseFriendRequest;
    	var data = new Object();
    	data.user_id = accept.user_id;
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