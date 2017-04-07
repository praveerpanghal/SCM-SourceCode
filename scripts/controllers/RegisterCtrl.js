/* MainCtrl */
app.controller("RegisterCtrl", function($scope,$http){	
	//$scope.text = "Register Ctrl.";
	$http({
		url: 'http://162.17.231.114:1212/ServiceSCM.svc/GetCountrylist',
		method: 'GET'
	}).then(function successCallback(response){
		$scope.countryList = response.data.GetCountryListResult;
	}, function errorCallback(response){
		$log.info(response.statusText);		
	});
	$scope.StateName = function(countryId){
		var data = {"country_id" : countryId};
		console.log(data);
		$http({
			url: 'http://162.17.231.114:1212//ServiceSCM.svc/GetStateList',
			method: 'POST',
			data : data
		}).then(function successCallback(response){
			$scope.stateList = response.data.GetStateListResult;			
		}, function errorCallback(response){
			$log.info(response.statusText);		
		});
	}
});