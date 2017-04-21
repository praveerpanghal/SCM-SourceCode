/* MainCtrl */
app.controller("HomeCtrl", function($scope, $window, $location, HttpService, ServiceUrls, LS){	
	$scope.user = LS.getData();
	if($scope.user){
		$scope.text = "Welcome to SchoolConnect";
	}else{
		$location.path('/');
	}

});