app.controller("ViewProfileCtrl", function($scope, $routeParams, ServiceUrls, HttpService) {
	$scope.username = $routeParams.username;
	var url = ServiceUrls.SearchUser;
	var data = new Object();
	data.username  = $scope.username;
	console.log(data);
	HttpService.SearchUserService(url, data)
			.then(function(response){
				if(response!=''){
					$scope.usersList = response;
					console.log(response);					
				}
				else{
					$scope.emptyList = "We couldn't find anything for "+$scope.username;
				}
			}, function(error){
				$log.info(error);
			});
});