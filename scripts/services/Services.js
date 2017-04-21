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
		}
	}

});