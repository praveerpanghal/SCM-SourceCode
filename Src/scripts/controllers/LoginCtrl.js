/* MainCtrl */
app.controller("LoginCtrl", function($scope, $location, $log, $http, $window, HttpService, ServiceUrls, LS){	
	$scope.text = "Login Ctrl.";
	/*
	var user = LS.getData();
	if(user){
		$location.path('/home');
	}else{
		$location.path('/');
	}
	*/

	//this is used to parse the profile
	function url_base64_decode(str) {
	  var output = str.replace('-', '+').replace('_', '/');
	  switch (output.length % 4) {
	    case 0:
	      break;
	    case 2:
	      output += '==';
	      break;
	    case 3:
	      output += '=';
	      break;
	    default:
	      throw 'Illegal base64url string!';
	  }
	  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
	}

	$scope.loginUser = function(user){
		/*
		var url = ServiceUrls.LoginDetails;
		var data = new Object();
			data.user_email = user.user_email;
		  	data.password = user.password;

		HttpService.LoginUserService(url, data)
			.then(function (response){
				if(response[0].ReturnVal==1){
					LS.setData(response[0].UserId);					
					$location.path('/home');
				}else{
					$scope.message = response[0].ReturnVal;
				}
			}, function errorCallback(error){
				$log.info(error);		
			}); 
		*/
		$scope.isAuthenticated = false;
		$scope.welcome = '';
		$scope.message = '';
		 $http
      .post('/authenticate', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        LS.setData(data.token);
        $scope.isAuthenticated = true;
        var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        $scope.welcome = 'Welcome ' + profile.returnVal + ' ' + profile.userId;
        console.log($scope.welcome);
        $location.path('/home');
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        $scope.isAuthenticated = false;

        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        $scope.welcome = '';
      });

	}

});


