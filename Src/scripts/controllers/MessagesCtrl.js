app.controller("MessagesCtrl", ['$location', '$route', 'ServiceUrls', 'HttpService', 'LS', function($location, $route, ServiceUrls, HttpService, LS){
	
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
	var vm = this;

	var url = ServiceUrls.GetUserInfo;
    var data = new Object();
    data.user_id = profile.userId;
    HttpService.PostMethod(url, data)
        .then(function(response){
            if(response.GetUserInfoResult!=''){                 
                vm.userInfo = JSON.parse(response.GetUserInfoResult);
                vm.userProfile = vm.userInfo[0].UserProfile[0];
                vm.friendRequests = vm.userInfo[0].FriendRequest;
            }else{
                alert('Data Not Found');
                $location.path('/logout');
            }
        }, 
        function errorCallback(error){
            $log.info(error);       
        });

        // Schools List start
        var url = ServiceUrls.GetSchoolList;
        HttpService.GetMethod(url)
          .then(function successCallback(response){
             if(response.GetSchoolListResult!==''){
                vm.schoolsList = response.GetSchoolListResult;
            }
            else{
                $log.info(response);
            }

        }, function errorCallback(error){
           $log.info(error);        
        });
        // Schools List end
        
        vm.trial ="Dummy text";
}]);