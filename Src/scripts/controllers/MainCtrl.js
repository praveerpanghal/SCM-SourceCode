/* MainCtrl */
app.controller("MainCtrl", function($scope, LS){
	// Checks User Details
	this.latestData = function(){
		return LS.getData();
	} 
});