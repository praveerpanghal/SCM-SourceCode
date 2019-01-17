/* Login & Register controller */
app.controller("LoginCtrl", ['$location', '$log', '$http', '$window', '$timeout', '$route', 'HttpService', 'ServiceUrls', 'LS', function($location, $log, $http, $window, $timeout, $route, HttpService, ServiceUrls, LS){	
	
	var user = LS.getData();
	var vm = this;
	if(user){
		$location.path('/home');
	}else{
		$location.path('/');
	}

	vm.loginUser = function(user){		
		// $http
	    //   .post('/authenticate', user)
	    //   .success(function (data, status, headers, config) {      console.log(data);	
	    //   	if(data.err_status==0){
	    //   		vm.err_message = data.token;      		
	    //   	}else{
		// 		LS.setData(data.token);
		// 		sessionStorage.setItem('loginKey', 'show and hide items'); /* creating session key value */
	    //   		$location.path('/home');
	    //   	}
    	// })
		// .error(function (data, status, headers, config) {
		// 	// Erase the token if the user fails to log in
		// 	delete $window.sessionStorage.token;			
		// });

		var url = ServiceUrls.LoginDetails;
		var data = new Object();

		data.user_email = user.user_email;
		data.password = user.password;

		HttpService.PostMethod(url, data)
			.then(function successCallback(response){
				var res = response[0].ReturnVal;
				// console.log(response);
				if(res != 1){
					vm.err_message = res;
				}else{
					console.log(response[0].UserId);
					LS.setData(response[0].UserId);
					sessionStorage.setItem('loginKey', 'show and hide items');
					$location.path('/home');
				}
				
			}, function errorCallback(error){
				$log.info(error);		 
			});
	}


	//Registration code start
	vm.emailValid=true;
	vm.resetted=false;

	// Path of the current page
	vm.currentPath = $location.path();
	//console.log($scope.currentPath);
	
	// Country List
	var url = ServiceUrls.GetCountrylist;

	HttpService.GetMethod(url)
		.then(function successCallback(response){
			if(response.GetCountryListResult!==''){
				vm.countryList = response.GetCountryListResult;
			}
			else{
				console.log(response);
			}
			
		}, function errorCallback(error){
			console.log(error);		
		});
	
	// State List
	vm.StateName = function(countryId){

		var url = ServiceUrls.GetStateList;
		var data = {"country_id"  : countryId};

		HttpService.PostMethod(url, data)
			.then(function successCallback(response){
				if(response.GetStateListResult !== ''){
					vm.stateList = response.GetStateListResult;
				}
				else{
					$log.info(response);
				}
			}, function errorCallback(error){
				$log.info(error);		
			});
	}
	
	// Schools List
	var url = ServiceUrls.GetSchoolList;
	HttpService.GetMethod(url)
		.then(function successCallback(response){
			if(response.GetSchoolListResult!==''){
				vm.schoolsList = response.GetSchoolListResult;
			}
			else{
				$log.info(response);
			}
			
		}, function errorCallback(error){
			$log.info(error);		
		});
	
	// Register User
	vm.registerUser = function(person){
		
		var url = ServiceUrls.UserRegistrationForm;
		var data = new Object();
			data.user_fname = person.user_fname;
			data.user_lname = person.user_lname;
		  	data.password = person.passwrd;
			data.school_id = person.school_id;
			data.user_email = person.email;
			data.user_mob = person.user_mob||"";
			data.country_id = person.country_id;
			data.state_id = person.state_id;
			data.city_name = "";
			data.user_dateofbirth = "";
			data.user_gender = "";

		HttpService.PostMethod(url, data)
			.then(function successCallback(response){
				console.log(response);
				if(response==1){
					vm.resetted = true;			
					$timeout(function() {
						vm.resetted = false;
						$route.reload();
					}, 3000);
				}
				else if(response==-4){
					vm.errorMsg = 'Either Email or Mobile already exists. Please try again!';
				}
				else if(response==-3){
					vm.errorMsg = 'Mobile number already exists. Please try again!';
				}
				else if(response==-2){
					vm.errorMsg = 'Email already exists. Please try again!';					
				}
				
			}, function errorCallback(error){
				$log.info(error);		 
			});
	}
	//Registration code end
}]);