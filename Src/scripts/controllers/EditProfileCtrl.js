app.controller("EditProfileCtrl", ['$http', '$log', '$timeout', '$route', '$location', 'LS', 'HttpService', 'ServiceUrls', function($http, $log, $timeout, $route, $location, LS, HttpService, ServiceUrls){
	
	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));
  var vm = this;
	// userinfo service
	var url = ServiceUrls.GetUserInfo;
  var data = new Object();
  data.user_id = profile.userId;

  HttpService.PostMethod(url, data)
  .then(function(response){
      if(response.GetUserInfoResult!=''){                 
          vm.userInfo = JSON.parse(response.GetUserInfoResult);
          vm.userProfile = vm.userInfo[0].UserProfile[0];
          vm.DefaultStateName(vm.userProfile.country_id, vm.userProfile.state_id);
      }else{
          alert('Data Not Found');
          $location.path('/logout');
      }
  }, 
  function errorCallback(error){
      $log.info(error);       
  });

	// Country List start
	var url = ServiceUrls.GetCountrylist;
	HttpService.GetMethod(url)
    .then(function successCallback(response){
     if(response.GetCountryListResult!==''){
        vm.countryList = response.GetCountryListResult;
    }
    else{
        console.log(response);
    }

    }, function errorCallback(error){
         console.log(error);		
    });
	// Country List end

	vm.DefaultStateName = function(c, s){
		var url = ServiceUrls.GetStateList;
		var data = {"country_id"  : c};

		HttpService.PostMethod(url, data)
     .then(function successCallback(response){
        if(response.GetStateListResult !== ''){
            vm.stateList = response.GetStateListResult;
			var index = vm.stateList.map(function(e) { return e.state_id; }).indexOf(s);
            vm.state_id=vm.stateList[index].state_name;
        }
        else{
            $log.info(response);
        }
        }, function errorCallback(error){
            $log.info(error);		
        });
    }

	// State List start
	vm.StateName = function(countryId){

		var url = ServiceUrls.GetStateList;
		var data = {"country_id"  : countryId};

		HttpService.PostMethod(url, data)
     .then(function successCallback(response){
        if(response.GetStateListResult !== ''){
           vm.stateList = response.GetStateListResult;
       }
       else{
           $log.info(response);
       }
   }, function errorCallback(error){
    $log.info(error);		
});
 }
	// State List end
	
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


	//Edit Profile Details Starts

	vm.UpdateProfile =function(userData){
        var url = ServiceUrls.UpdateProfile;
        var data = new Object();
        data.user_id = profile.userId;
        data.user_fname = userData.user_fname;
        data.user_lname = userData.user_lname;
        data.user_email = userData.user_email;
        data.user_mob = userData.user_mob;
        data.country_id = userData.country_id;
        data.state_id = userData.state_id;
        data.school_id = userData.school_id;
        data.profile_picture = userData.profile_picture;
        data.cover_picture = userData.cover_picture;
        HttpService.PostMethod(url, data)
        .then(function(response){
            if(response!=0){
               $('#myModal').modal('show');
               vm.successMessage = "Profile updated sucessfully.";
               $timeout(function() {
                   $('#myModal').modal('hide');
                   $('.modal-backdrop').remove();
                   $route.reload();
               }, 3000);
           }else{
            vm.msg = 'Profile not updated.';
        }
    }, 
    function(error){
        $log.info(error);
    });
    }

    //Edit Profile Details Ends

    vm.uploadProfile = function(userProfile){
    	
       var file = userProfile.profile_picture; 
       var uploadUrl = "/multer";
       var fd = new FormData();
       fd.append('file', file);

		// to move profile picture into the profile folder
        $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        })
        .success(function(response){
            vm.res = response;
        })
        .error(function(){
         console.log("error!!");
     });

        //profile picture path
        vm.profile_picture = 'Src/images/profile/'+file.name;

	    //to update profile data in database
	    var url = ServiceUrls.UpdateProfile;
        var data = new Object();
        data.user_id = profile.userId;
        data.user_fname = userProfile.user_fname;
        data.user_lname = userProfile.user_lname;
        data.user_email = userProfile.user_email;
        data.user_mob = userProfile.user_mob;
        data.country_id = userProfile.country_id;
        data.state_id = userProfile.state_id;
        data.school_id = userProfile.school_id;
        data.profile_picture = vm.profile_picture;
        data.cover_picture = userProfile.cover_picture;

        HttpService.PostMethod(url, data)
        .then(function(response){
            if(response!=0){
               $('#myModal').modal('show');
               vm.successMessage = "Profile updated sucessfully.";
               $timeout(function() {
                   $('#myModal').modal('hide');
                   $('.modal-backdrop').remove();
                   $route.reload();
               }, 3000);
           }else{
            vm.msg = 'Profile not updated.';
        }
    }, 
    function(error){
        $log.info(error);
    });

    }

    vm.uploadCover = function(cover){
    	
    	var file = cover.cover_picture; 
        var uploadUrl = "/multerC";
        var fd = new FormData();
        fd.append('file', file);

		// to move profile picture into the profile folder
        $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        })
        .success(function(response){
	       	vm.res = response;
          })
        .error(function(){
         console.log("error!!");
     });

	    //cover picture path
        vm.cover_picture = 'Src/images/cover/'+file.name;

	    //to update cover data in database
	    var url = ServiceUrls.UpdateProfile;
        var data = new Object();
        data.user_id = profile.userId;
        data.user_fname = cover.user_fname;
        data.user_lname = cover.user_lname;
        data.user_email = cover.user_email;
        data.user_mob = cover.user_mob;
        data.country_id = cover.country_id;
        data.state_id = cover.state_id;
        data.school_id = cover.school_id;
        data.profile_picture = cover.profile_picture;
        data.cover_picture = vm.cover_picture;

        HttpService.PostMethod(url, data)
        .then(function(response){
            if(response!=0){
               $('#myModal').modal('show');
               vm.successMessage = "Profile updated sucessfully.";
               $timeout(function() {
                   $('#myModal').modal('hide');
                   $('.modal-backdrop').remove();
                   $route.reload();
               }, 3000);
           }else{
            vm.msg = 'Profile not updated.';
        }
    }, 
    function(error){
        $log.info(error);
    });
    }

    vm.changePassword = function(user){
    	var url = ServiceUrls.ChangePassword;
    	var data = new Object();
    	data.user_id = profile.userId;
    	data.old_password = user.old_password;
    	data.new_password = user.new_password;

    	HttpService.PostMethod(url, data)
        .then(function(response){
         if(response.ChangePasswordResult==1){
            $('#myModal').modal('show');
            vm.successMessage = 'Password changed sucessfully.'
            $timeout(function() {
               $('#myModal').modal('hide');
               $('.modal-backdrop').remove();
               $location.path('/logout');						
           }, 3000);
        }else{
            vm.errorMessage = 'Please enter correct old password.';
            $timeout(function() {
               vm.errorMessage = '';
           }, 3000);
        }
    });
  }

  $(document).ready(function() {
   $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
       e.preventDefault();
       $(this).siblings('a.active').removeClass("active");
       $(this).addClass("active");
       var index = $(this).index();
       $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
       $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
   });
});

}]);