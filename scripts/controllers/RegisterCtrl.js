/* MainCtrl */
app.controller("RegisterCtrl", function($scope, $http, HttpService, ServiceUrls){	
	//$scope.text = "Register Ctrl.";
	
	// Country List
	var url = ServiceUrls.GetCountrylist;

	HttpService.CountryListService(url)
		.then(function successCallback(response){
			if(response.GetCountryListResult!==''){
				$scope.countryList = response.GetCountryListResult;	
			}
			else{
				$log.info(response);
			}
			
		}, function errorCallback(error){
			$log.info(error);		
		});
	
	// State List
	$scope.StateName = function(countryId){

		var url = ServiceUrls.GetStateList;
		var data = {"country_id" : countryId};

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
		console.log(person);
		
	}
});