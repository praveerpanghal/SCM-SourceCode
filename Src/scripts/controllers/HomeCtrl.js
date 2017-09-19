/* MainCtrl */
app.controller("HomeCtrl", ['$scope', '$filter', '$window', '$location', '$http', '$log', '$route', 'HttpService', 'ServiceUrls', 'LS', function($scope, $filter, $window, $location, $http, $log, $route, HttpService, ServiceUrls, LS){	
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
    var vm = this;

    if(profile.userId){

        var url = ServiceUrls.GetUserInfo;
        var data = new Object();
        data.user_id = profile.userId;
        HttpService.PostMethod(url, data)
            .then(function(response){
                if(response.GetUserInfoResult!=''){                 
                    vm.userInfo = JSON.parse(response.GetUserInfoResult);
                    vm.userProfile = vm.userInfo[0].UserProfile[0];
                    vm.PeopleYouMayKnow = vm.userInfo[0].PeopleYouMayKnow;
                    vm.commentsInfo = vm.userInfo[0].CommentImagePost;
                    vm.friendRequests = vm.userInfo[0].FriendRequest;
                   // console.log(vm.userInfo);
                }else{
                    console.log(response);
                    alert('Data Not Found');
                    $location.path('/logout');
                }
            }, 
            function(error) { 
              console.log(error.statusText);
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
		
		/* upload file code start */
		$scope.uploadFile = function(){
			var file = $scope.myfile; 
            var uploadUrl = "/multer";
            var fd = new FormData();
            fd.append('file', file);

            $http.post(uploadUrl,fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
		    })
            .success(function(response){
		       	$scope.res = response;
		    })
		    .error(function(){
		      console.log("error!!");
            });		
            };
            /* upload file code end */

            /* home page data from json start */
            $http.get("Src/jsondata/PostedData.json")
                .success(function(response){
                    $scope.postedData=response.UserData;
            });
            /* home page data from json end */

            /* friend request sent code start */

            /* post comment code start */
            $scope.postComments = function(postComment){
                var url = ServiceUrls.PostComment;
                var data = new Object();
                data.user_id = profile.userId;
                data.friend_id = profile.userId;
                data.comment = postComment;                
            	HttpService.PostMethod(url, data)
            		.then(function(response){
                        console.log(response);
            			if(response==2){
            				vm.postSuccess='Comment posted successfully.';
            				//$route.reload();
                            $location.path('/');
            			}else{
            				vm.Error = 'Error Occured while posting your data.';
            			}
            		}, 
                    function(error){
            			$log.info(error);
            		});
            }
            /* post comment code end */

            /* accept request code start */
            $scope.acceptRequest = function(accept){
            	var url = ServiceUrls.ResponseFriendRequest;
                var data = new Object();
                data.user_id = accept.user_id;
                data.action_user_id = profile.userId;      
                data.status = 1;
                console.log(data);
            	HttpService.PostMethod(url, data)
        			.then(function(response){        				
                        $route.reload();
        			}, function(error){
        				$log.info(error);
        			});
            }
            /* accept request code end */

            /* reject request code start */
            $scope.rejectRequest = function(reject){
                console.log(reject);
            	var url = ServiceUrls.ResponseFriendRequest;
            	var data = new Object();
            	data.user_id = reject.user_id;
            	data.action_user_id = profile.userId;
                data.status = 2;
            	console.log(data);
                
            	HttpService.PostMethod(url, data)
        			.then(function(response){
        				$route.reload();
        			}, function(error){
        				$log.info(error);
        			});                
            }
            /* reject request code end */

            $scope.action = function(username){
                if(username){                
                    $location.path('/friends/'+username);
                }
            }

	}else{
		$location.path('/');
	}
}]).directive("fileinput", [function() {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
        });
      }
    }
  }]);