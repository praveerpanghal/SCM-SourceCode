/* MainCtrl */
app.controller("HomeCtrl", function($scope, $window, $location, $http, $log, HttpService, ServiceUrls, LS){	
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));

	if(profile.userId){		
		var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = profile.userId;
		console.log(data.user_id);
		HttpService.UserInfoService(url, data)
			.then(function(response){
				$scope.userInfo = JSON.parse(response.GetUserInfoResult);
				$scope.userProfile = $scope.userInfo[0].UserProfile[0];
				$scope.PeopleYouMayKnow = $scope.userInfo[0].PeopleYouMayKnow;
				console.log($scope.PeopleYouMayKnow);
				$scope.text = "Hi "+$scope.userProfile.username+", Welcome to SchoolConnect";				
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

            /* home page data from service start */

            /* home page data from service end */

	}else{
		$location.path('/');
	}
});
