/* MainCtrl */
app.controller("MainCtrl", ['$scope', '$http', '$location', '$rootScope', 'LS', 'ServiceUrls', 'HttpService', function($scope, $http, $location, $rootScope, LS, ServiceUrls, HttpService){
	// Checks User Details
	this.latestData = function(){
		// var encodedProfile = sessionStorage.token.split('.')[1];
		// var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		// return profile.userId;
		return LS.getData();
	} 	
	//alert($location.path());
	// if(!this.latestData()){
	// 	if($location.path()=='/US-Institute-of-Technology-Healthcare'){
	// 		$location.path('/US-Institute-of-Technology-Healthcare');
	// 	}else{
	// 	$location.path('/');}
	// }
	
}]);