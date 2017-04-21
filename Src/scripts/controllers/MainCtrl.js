/* MainCtrl */
app.controller("MainCtrl", function($scope, LS){
	this.latestData = function(){
		return LS.getData();
	} 
});