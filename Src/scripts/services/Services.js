/* API call methods(GET, POST) */
app.factory('HttpService',function($http, $q, SuccessError){

	return {
			PostMethod: function(url,data) { 
             	var deferred = $q.defer();
                return $http.post(url,data)
                    .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
                 }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            	})
            },
     		GetMethod: function(url) { 
              	var deferred = $q.defer();
                return $http.get(url)
                    .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
                 }, function (response) {
                // the following line rejects the promise
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            	})
            }
	}

});