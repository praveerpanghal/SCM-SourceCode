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
				//console.log($scope.commentsInfo);
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

            	HttpService.UserMeet(url, data)
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
            	HttpService.PostComment(url, data)
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

	}else{
		$location.path('/');
	}
});
