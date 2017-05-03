/* MainCtrl */
app.controller("HomeCtrl", function($scope, $window, $location, $http, HttpService, ServiceUrls, LS){	
	$scope.user = LS.getData();
	if($scope.user){
		var url = ServiceUrls.GetUserInfo;
		var data = new Object();
		data.user_id = $scope.user;

		HttpService.UserInfoService(url, data)
			.then(function(response){
				$scope.userInfo = JSON.parse(response.GetUserInfoResult);				
				$scope.text = "Hi "+$scope.userInfo[0].UserProfile[0].username+", Welcome to SchoolConnect";
				console.log($scope.userInfo[0].UserProfile[0].username);
			}, function errorCallback(error){
				$log.info(error);		
			});
			$scope.uploadFile = function(){
				/*
               var uploadUrl = "/multer";
			   console.log(uploadUrl);
			   var data = $scope.myfile;
               fupservice.post(data, uploadUrl);
			   */
			   
		var file = $scope.myfile;
		console.log(file);
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

	}else{
		$location.path('/');
	}

});
