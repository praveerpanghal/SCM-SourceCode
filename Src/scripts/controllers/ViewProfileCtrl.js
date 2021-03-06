app.controller("ViewProfileCtrl", ['$scope', '$routeParams', '$route', 'ServiceUrls', 'HttpService', 'LS', function($scope, $routeParams, $route, ServiceUrls, HttpService, LS) {
	var user = LS.getData();
	// var encodedProfile = user.split('.')[1];
	// var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
	$scope.username = $routeParams.username;
	var url = ServiceUrls.SearchUser;
	var data = new Object();
	data.username  = $scope.username;
	data.user_id = user;
    
	HttpService.PostMethod(url, data)
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

	// userinfo service
	var url = ServiceUrls.GetUserInfo;
    var data = new Object();
    data.user_id = user;
    HttpService.PostMethod(url, data)
        .then(function(response){
            if(response.GetUserInfoResult!=''){                 
                $scope.userInfo = JSON.parse(response.GetUserInfoResult);
                $scope.userProfile = $scope.userInfo[0].UserProfile[0];
                console.log($scope.userProfile);
				$scope.DefaultStateName($scope.userProfile.country_id, $scope.userProfile.state_id);
            }else{
                alert('Data Not Found');
                $location.path('/logout');
            }
        }, 
        function errorCallback(error){
            $log.info(error);       
        });
        
	/* send request code start */
	$scope.frdRequest = function(toUserId){
		var url = ServiceUrls.SendFriendRequest;
        var data = new Object();
		data.user_id = user;
		data.friend_id = toUserId;		
		data.action_user_id = user;
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

	/* accept request code start */
    $scope.acceptRequest = function(accept){
    	var url = ServiceUrls.ResponseFriendRequest;
    	var data = new Object();
    	data.user_id = accept.user_id;
    	data.action_user_id = user;
    	data.status = 1;        
    	console.log(data);
    	
    	HttpService.PostMethod(url, data)
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
    	data.action_user_id = user;
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

    $scope.DefaultStateName = function(c, s){
        var url = ServiceUrls.GetStateList;
        var data = {"country_id"  : c};

        HttpService.PostMethod(url, data)
            .then(function successCallback(response){
                if(response.GetStateListResult !== ''){
                    $scope.stateList = response.GetStateListResult;
                    //console.log($scope.stateList);
                    var index =$scope.stateList.map(function(e) { return e.state_id; }).indexOf(s);
                    //console.log(index);
                    $scope.state_id=$scope.stateList[index].state_name;
                    //console.log($scope.state_id);
                }
                else{
                    $log.info(response);
                }
            }, function errorCallback(error){
                $log.info(error);       
            });
    }
}]);