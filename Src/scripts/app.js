/* app configuration */
'use strict'
var app = angular.module("scm", ['ngStorage', 'ngRoute', 'ngFileUpload', 'ngImgCrop']).run(function($rootScope, $location){
    $rootScope.location = $location;
    $rootScope.keygen=$rootScope.location.path().split("/")[1];
});

/* Service URL's 
var BaseUrl = 'http://162.17.231.114:1212/ServiceSCM.svc/';
*/
app.value('ServiceUrls', {
    GetCountrylist: BaseUrl + 'GetCountrylist',
    GetStateList: BaseUrl + 'GetStateList',
    GetSchoolList: BaseUrl + 'GetSchoolList',
    UserRegistrationForm: BaseUrl + 'UserRegistrationForm',
    LoginDetails: BaseUrl + 'LoginDetails',
    GetUserInfo: BaseUrl + 'GetUserInfo',
    ForgotPassword: BaseUrl + 'ForgotPassword',
    UserMeet: BaseUrl + 'UserMeet',
    PostComment: BaseUrl + 'PostComment',
    ChangePassword: BaseUrl + 'ChangePassword',
    AcceptFriendRequest: BaseUrl + 'AcceptFriendRequest',
    RejectFriendRequest: BaseUrl + 'RejectFriendRequest',
    SearchUser: BaseUrl + 'SearchUser',
    SendFriendRequest: BaseUrl + 'SendFriendRequest',
    ResponseFriendRequest: BaseUrl + 'ResponseFriendRequest',
    GetFriendsList: BaseUrl + 'GetFriendsList',
    UpdateProfile: BaseUrl + 'UpdateProfile',
});

/* Password Comapre Code */
app.directive('nxEqual', function() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.nxEqual) {
                console.error('nxEqual expects a model as an argument!');
                return;
            }
            scope.$watch(attrs.nxEqual, function (value) {
                model.$setValidity('nxEqual', value === model.$viewValue);
            });
            model.$parsers.push(function (value) {
                var isValid = value === scope.$eval(attrs.nxEqual);
                model.$setValidity('nxEqual', isValid);
                return isValid ? value : undefined;
            });
        }
    };
});

var onlyLoggedIn = function($location,$q,LS){
    var deferred = $q.defer();

    if (LS.getData()) {
        deferred.resolve();
    } else {
        deferred.reject();
        $location.url('/login');
    }
    return deferred.promise;
}

/* Routing Pages */
app.config(['$routeProvider', '$httpProvider', '$locationProvider', 
    function($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider   
        .when("/", {
            templateUrl : "views/Login.html",
    		controller : "LoginCtrl",
            controllerAs : "vm"
        }).when("/home", {
            templateUrl : "views/Home.html",
            controller : "HomeCtrl",
            controllerAs : "vm",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/logout", {
            templateUrl : "views/Logout.html",
            controller : "LogoutCtrl"
        }).when("/forgot", {
            templateUrl : "views/Forgot.html",
            controller : "ForgotCtrl"
        }).when("/profile", {
            templateUrl : "views/Profile.html",
            controller : "ProfileCtrl",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/reset", {
            templateUrl : "views/ResetPassword.html",
            controller : "ResetPasswordCtrl",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/friends/:username", {
            templateUrl : "views/ViewProfile.html",
            controller : "ViewProfileCtrl",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/profiledetail/:userId", {
            templateUrl : "views/ProfileDetail.html",
            controller : "ProfileDetailCtrl",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/friendslist", {
            templateUrl : "views/Friends.html",
            controller : "FriendsCtrl",
            controllerAs : "vm",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/peopleyoumayknow", {
            templateUrl : "views/PeopleYouMayKnow.html",
            controller : "PeopleYouMayKnowCtrl",
            controllerAs : "vm",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/editprofile", {
            templateUrl : "views/EditProfile.html",
            controller : "EditProfileCtrl",
            controllerAs : "vm",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/US-Institute-of-Technology-Healthcare", {
            templateUrl : "views/US-Institute-of-Technology-Healthcare.html",
            controller : "PagesCtrl",
            controllerAs : "vm"
        }).when("/school-connect-me", {
            templateUrl : "views/school-connect-me.html",
            controller : "PagesCtrl",
            controllerAs : "vm"
        }).when("/spinotuts", {
            templateUrl : "views/spinotuts.html",
            controller : "PagesCtrl",
            controllerAs : "vm"
        }).when("/messages", {
            templateUrl : "views/Messages.html",
            controller : "MessagesCtrl",
            controllerAs : "vm",
            resolve:{
                loggedIn:onlyLoggedIn
            }
        }).when("/userauth/:activationkey", {
            templateUrl : "views/UserAuth.html",
            controller : "UserAuthCtrl",
            controllerAs : "vm"
        }).when("/images", {
            templateUrl : "views/Images.html",
            controller : "ImagesCtrl",
            controllerAs : "vm"
        }).when("/videos", {
            templateUrl : "views/Videos.html",
            controller : "VideosCtrl",
            controllerAs : "vm"
        })
        .otherwise({
    		redirectTo: "/"
    	});
        $routeProvider.caseInsensitiveMatch = true;
        $locationProvider.html5Mode(true);
    }
]);