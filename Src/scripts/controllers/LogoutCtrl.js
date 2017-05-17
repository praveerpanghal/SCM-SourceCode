/* MainCtrl */
app.controller("LogoutCtrl", function($scope, $location, $window, HttpService, ServiceUrls, LS){
	LS.clearData();
	$location.path('/');
});