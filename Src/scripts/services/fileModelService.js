app.service('fupservice', ['$http', function ($http) {
	this.post = function(data,uploadUrl){				
	   var fd = new FormData();
	   console.log(uploadUrl);
	   //for(var key in data)
		 //  fd.append(key, data[key]);
		 fd.append('file', data);
	   $http.post(uploadUrl, fd, {
		  transformRequest: angular.identity,
		  headers: { 'Content-Type': undefined }
	   }).success(function(){
          console.log("success!!");
        })
        .error(function(){
          console.log("error!!");
        });
	}
 }]);	