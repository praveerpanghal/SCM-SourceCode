/* MainCtrl */
app.controller("HomeCtrl", function($scope, $window, $location, $http, $log, $route, HttpService, ServiceUrls, LS){	
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));

	if(profile.userId){
		var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = profile.userId;
		//console.log(data.user_id);
		HttpService.UserInfoService(url, data)
			.then(function(response){
				if(response.GetUserInfoResult!=''){					
				$scope.userInfo = JSON.parse(response.GetUserInfoResult);
				$scope.userProfile = $scope.userInfo[0].UserProfile[0];
				$scope.PeopleYouMayKnow = $scope.userInfo[0].PeopleYouMayKnow;
				$scope.commentsInfo = $scope.userInfo[0].CommentImagePost;
				$scope.friendRequests = $scope.userInfo[0].FriendRequest;
				//console.log($scope.userInfo);
				console.log($scope.userInfo[0].FriendRequest);
				//console.log($scope.userInfo[0].PeopleYouMayKnow);
				//$scope.text = "Hi "+$scope.userProfile.username+", Welcome to SchoolConnect";				
				}else{
					alert('Data Not Found');
					$location.path('/logout');
				}
			}, function errorCallback(error){
				$log.info(error);		
			});

			/* upload file code start */
			$scope.uploadFile = function(){
				/*
               var uploadUrl = "/multer";
			   console.log(uploadUrl);
			   var data = $scope.myfile;
               fupservice.post(data, uploadUrl);
			   */
			   
				var file = $scope.myfile; 
		        var uploadUrl = "/multer";
		        var fd = new FormData();
		        fd.append('file', file);

		        $http.post(uploadUrl,fd, {
		            transformRequest: angular.identity,
		            headers: {'Content-Type': undefined}
		        })
		        .success(function(response){
		        	//console.log(response);
		        	//console.log("success!!");
		        	$scope.res = response;
		        })
		        .error(function(){
		          console.log("error!!");
		        });
		
            };
            /* upload file code end */

            /* home page data from json start */

            $http.get("Src/jsondata/PostedData.json").success(function(response){$scope.postedData=response.UserData});

            /* home page data from json end */

            /* friend request sent code start */

            $scope.frdRequest = function(userId){
            	var url = ServiceUrls.UserMeet;
            	var data = new Object();
				data.request_by_user = profile.userId;
				data.request_to_user = userId;

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
					})
            }
            /* friend request sent code end */

            /* post comment code start */
            $scope.postComments = function(postComment){
            	var url = ServiceUrls.PostComment;
            	var data = new Object();
            	data.request_by_user = profile.userId;
            	data.postComment = postComment;
            	//console.log(url);
            	//console.log(data);
            	HttpService.PostCommentService(url, data)
            		.then(function(response){
            			if(response==1){
            				$scope.postComment='';
            				//console.log('your comment is posted.');
            				$route.reload();
            			}else{
            				alert('Error Occured while posting your data.');
            			}
            		}, function(error){
            			$log.info(error);
            		});
            }
            /* post comment code end */

            /* accept request code start */
            $scope.acceptRequest = function(accept){
            	var url = ServiceUrls.AcceptFriendRequest;
            	var data = new Object();
            	data.request_by_user = accept.user_id;
            	data.request_to_user = profile.userId;
            	console.log(data);
            	HttpService.AcceptFriendRequestService(url, data)
            			.then(function(response){
            				console.log(response);
            			}, function(error){
            				$log.info(error);
            			});
            }
            /* accept request code end */

            /* reject request code start */
            $scope.rejectRequest = function(accept){
            	var url = ServiceUrls.RejectFriendRequest;
            	var data = new Object();
            	//data.request_by_user = accept.user_id;
            	data.mapp_id = profile.userId;
            	console.log(data);
            	HttpService.RejectFriendRequestService(url, data)
            			.then(function(response){
            				console.log(response);
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
}).directive("fileinput", [function() {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
        });
      }
    }
  }]);
