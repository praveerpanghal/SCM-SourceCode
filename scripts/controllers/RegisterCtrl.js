/* MainCtrl */
app.controller("RegisterCtrl", function($scope, $http, $window, HttpService, ServiceUrls){	
	//$scope.text = "Register Ctrl.";
	
	// Country List
	var url = ServiceUrls.GetCountrylist;

	HttpService.CountryListService(url)
		.then(function successCallback(response){
			if(response.GetCountryListResult!==''){
				$scope.countryList = response.GetCountryListResult;
			}
			else{
				console.log(response);
			}
			
		}, function errorCallback(error){
			console.log(error);		
		});
	
	// State List
	$scope.StateName = function(countryId){

		var url = ServiceUrls.GetStateList;
		var data = {"country_id"  : countryId};

		HttpService.StateListService(url, data)
			.then(function successCallback(response){
				if(response.GetStateListResult !== ''){
					$scope.stateList = response.GetStateListResult;
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
	HttpService.SchoolsListService(url)
		.then(function successCallback(response){
			if(response.GetSchoolListResult!==''){
				$scope.schoolsList = response.GetSchoolListResult;
			}
			else{
				$log.info(response);
			}
			
		}, function errorCallback(error){
			$log.info(error);		
		});
	
	// Register User
	$scope.registerUser = function(person){
		
		var url = ServiceUrls.GetStateList;
		var data = new Object();
			data.user_fname = person.user_fname;
			data.user_mname = person.user_mname||""; 
			data.user_lname = person.user_lname;
		  	data.password = person.password; 
		  	data.re_password = person.re_password;
			data.school_id = person.school_id;
			data.user_email = person.email;
			data.user_mob = person.user_mob;
			data.country_id = person.country_id;
			data.state_id = person.state_id;
			data.city_name = person.city_name;
			data.user_dateofbirth = person.user_dateofbirth;
			data.user_gender = person.user_gender;
		
		HttpService.RegisterUserService(url, data)
			.then(function successCallback(response){
				console.log(response);
				//$window.location='/';
			}, function errorCallback(error){
				$log.info(error);		
			}); 
	}
});