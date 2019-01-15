app.controller("ViewProfileCtrl", function($scope, $routeParams, $route, ServiceUrls, HttpService, LS) {
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

	$scope.frdRequest = function(toUserId){
		var url = ServiceUrls.SendFriendRequest;
        var data = new Object();
		data.user_id = profile.userId;
		data.friend_id = toUserId;
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
});