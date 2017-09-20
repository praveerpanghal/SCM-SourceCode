/* MainCtrl */
app.controller("LogoutCtrl", ['$scope', '$location', '$window', 'HttpService', 'ServiceUrls', 'LS', function($scope, $location, $window, HttpService, ServiceUrls, LS){
	LS.clearData();	
	sessionStorage.clear();		/* clearing session key value */
	$location.path('/');
}]);