/* API call methods(GET, POST) */
app.factory('HttpService',function($http, SuccessError){

	return {
		CountryListService: function(url){
			return $http.get(url)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		StateListService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		SchoolsListService: function(url){
			return $http.get(url)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		RegisterUserService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		LoginUserService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		UserInfoService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		ForgotPasswordService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		UserMeetService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		PostCommentService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		ChangePasswordService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		AcceptFriendRequestService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		RejectFriendRequestService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		},
		SearchUserService: function(url, data){
			return $http.post(url, data)
				.then(SuccessError.Successresult, SuccessError.Errorresult);
		}
	}

});