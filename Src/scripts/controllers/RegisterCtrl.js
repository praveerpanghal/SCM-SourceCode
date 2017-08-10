/* MainCtrl */
app.controller("RegisterCtrl", ['$scope', '$http', '$window', '$log', '$location', '$timeout', '$route', 'HttpService', 'ServiceUrls', function($scope, $http, $window, $log, $location, $timeout, $route, HttpService, ServiceUrls){	
	//$scope.text = "Register Ctrl.";
	$scope.emailValid=true;
	$scope.resetted=false;
	// Path of the current page
	$scope.currentPath = $location.path();
	//console.log($scope.currentPath);
	
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

		HttpService.RegisterUserService(url, data)
			.then(function successCallback(response){
				if(response==1){
					$scope.resetted = true;			
					$timeout(function() {
						$scope.resetted = false;
						$route.reload();
					}, 3000);
				}
				else if(response==-4){
					$scope.errorMsg = 'Either Email or Mobile already exists. Please try again!';
				}
				else if(response==-3){
					$scope.errorMsg = 'Mobile number already exists. Please try again!';
				}
				else if(response==-2){
					$scope.errorMsg = 'Email already exists. Please try again!';
					
				}
				
			}, function errorCallback(error){
				$log.info(error);		 
			});
	}
}]);