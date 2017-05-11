/* MainCtrl */
app.controller("MainCtrl", function($scope, LS){
	// Checks User Details
	this.latestData = function(){
		var encodedProfile = sessionStorage.token.split('.')[1];
		var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
		return profile.userId;
	} 
});