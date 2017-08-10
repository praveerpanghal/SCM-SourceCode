app.controller("EditProfileCtrl", ['$scope', 'LS', 'HttpService', 'ServiceUrls', function($scope, LS, HttpService, ServiceUrls){
	$scope.cp = 'Edit Profile';
	
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

	var user = LS.getData();
	var encodedProfile = user.split('.')[1];
	var profile = JSON.parse(LS.url_base64_decode(encodedProfile));

	var url = ServiceUrls.GetUserInfo;
    var data = new Object();
    data.user_id = profile.userId;
    HttpService.UserInfoService(url, data)
        .then(function(response){
            if(response.GetUserInfoResult!=''){                 
                $scope.userInfo = JSON.parse(response.GetUserInfoResult);
                $scope.userProfile = $scope.userInfo[0].UserProfile[0];
                console.log($scope.userProfile);
				$scope.DefaultStateName($scope.userProfile.country_id, $scope.userProfile.state_id);
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
	HttpService.CountryListService(url)
		.then(function successCallback(response){
			if(response.GetCountryListResult!==''){
				$scope.countryList = response.GetCountryListResult;
			}
			else{
				console.log(response);
			}
			
		}, function errorCallback(error){
			console.log(error);		
		});
	// Country List end

	$scope.DefaultStateName = function(c, s){
		var url = ServiceUrls.GetStateList;
		var data = {"country_id"  : c};

		HttpService.StateListService(url, data)
			.then(function successCallback(response){
				if(response.GetStateListResult !== ''){
					$scope.stateList = response.GetStateListResult;
					//console.log($scope.stateList);
					var index =$scope.stateList.map(function(e) { return e.state_id; }).indexOf(s);
					//console.log(index);
    				$scope.state_id=$scope.stateList[index].state_name;
    				//console.log($scope.state_id);
				}
				else{
					$log.info(response);
				}
			}, function errorCallback(error){
				$log.info(error);		
			});
	}

	// State List start
	$scope.StateName = function(countryId){

		var url = ServiceUrls.GetStateList;
		var data = {"country_id"  : countryId};

		HttpService.StateListService(url, data)
			.then(function successCallback(response){
				if(response.GetStateListResult !== ''){
					$scope.stateList = response.GetStateListResult;
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
	HttpService.SchoolsListService(url)
		.then(function successCallback(response){
			if(response.GetSchoolListResult!==''){
				$scope.schoolsList = response.GetSchoolListResult;
			}
			else{
				$log.info(response);
			}
			
		}, function errorCallback(error){
			$log.info(error);		
		});
	// Schools List end
}]);