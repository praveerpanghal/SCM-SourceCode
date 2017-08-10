/* MainCtrl */
app.controller("MainCtrl", ['$scope', '$http', '$location', 'LS', 'ServiceUrls', 'HttpService', function($scope, $http, $location, LS, ServiceUrls, HttpService){
	// Checks User Details
	this.latestData = function(){
		// var encodedProfile = sessionStorage.token.split('.')[1];
		// var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		// return profile.userId;
		return LS.getData();
	} 	
}]);