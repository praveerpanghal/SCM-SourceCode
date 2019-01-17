app.controller("ImagesCtrl", ['$location', '$route', 'ServiceUrls', 'HttpService', 'LS', function($location, $route, ServiceUrls, HttpService, LS){
    
    var user = LS.getData();
    // var encodedProfile = user.split('.')[1];
    // var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
    var vm = this;

    var url = ServiceUrls.GetUserInfo;
    var data = new Object();
    data.user_id = user;
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

        
        vm.trial ="Dummy text";
        /*$(document).ready(function(){
            alert("123");
            $('.grid').masonry({
              itemSelector: '.grid-item'
              //columnWidth: 60
            });
        });*/

}]);