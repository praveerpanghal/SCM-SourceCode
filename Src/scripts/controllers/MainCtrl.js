/* MainCtrl */
app.controller("MainCtrl", function($scope, LS){
	$scope.user = LS.getData();	
	//console.log($scope.user);
	$scope.text = "sample text";
});