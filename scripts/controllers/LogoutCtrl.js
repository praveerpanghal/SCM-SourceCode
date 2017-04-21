/* MainCtrl */
app.controller("LogoutCtrl", function($scope, $location, HttpService, ServiceUrls, LS){
	LS.clearData();
	$location.path('/');
});