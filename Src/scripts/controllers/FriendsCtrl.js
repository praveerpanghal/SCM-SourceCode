app.controller("FriendsCtrl", ['$scope', 'ServiceUrls', 'HttpService', 'LS', function($scope, ServiceUrls, HttpService, LS){
	$scope.data = 'friends page comming soon!';
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
	
	var url = ServiceUrls.GetFriendsList;
	var data = new Object();
	data.user_id = profile.userId;
	
	HttpService.GetFriendsListService(url, data)
		.then(function(response){
			if(response!=''){
				$scope.friendsData = response;
				console.log($scope.friendsData);
			}else{
				$scope.emptyList = 'Your Friends List is Empty!'
			}
		}, function(error){
				$log.info(error);
			});
}]);