/* MainCtrl */
app.controller("UserAuthCtrl", ['$window', '$location', '$routeParams', '$rootScope','HttpService', 'ServiceUrls', 'LS', function($window, $location, $routeParams, $rootScope, HttpService, ServiceUrls, LS){	
    //var vm = this;
    $rootScope.testval=("/userauth/"+$routeParams.activationkey).toString();
    console.log($rootScope.testval)
}]);