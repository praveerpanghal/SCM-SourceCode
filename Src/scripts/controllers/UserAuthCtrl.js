/* MainCtrl */
app.controller("UserAuthCtrl", ['$window', '$location', '$routeParams', '$rootScope','HttpService', 'ServiceUrls', 'LS', function($window, $location, $routeParams, $rootScope, HttpService, ServiceUrls, LS){	
    //var vm = this;
    $rootScope.testvalpath=("/userauth/"+$routeParams.activationkey).toString();
    $rootScope.testval=$routeParams.activationkey;
    console.log($rootScope.testval)
}]);