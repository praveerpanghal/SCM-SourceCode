/* MainCtrl */
app.controller("HomeCtrl", function($scope, $window, $location, $http, $log, HttpService, ServiceUrls, LS){	
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
	console.log(profile.userId);
	if(profile.userId){
		//var encodedProfile = sessionStorage.token.split('.')[1];
		//var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		
		var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = profile.userId;

		HttpService.UserInfoService(url, data)
			.then(function(response){
				$scope.userInfo = JSON.parse(response.GetUserInfoResult);				
				$scope.text = "Hi "+$scope.userInfo[0].UserProfile[0].username+", Welcome to SchoolConnect";
				console.log($scope.userInfo[0].UserProfile[0].username);
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

	}else{
		$location.path('/');
	}

});
