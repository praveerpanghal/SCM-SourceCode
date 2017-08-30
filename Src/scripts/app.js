/* app configuration */
'use strict'
var app = angular.module("scm", ['ngStorage', 'ngRoute', 'ngFileUpload']).run(function($rootScope, $location){
    $rootScope.location = $location;
});

/* Service URL's */
var BaseUrl = 'http://162.17.231.114:1212/ServiceSCM.svc/';

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
            controllerAs : "vm"
        }).when("/logout", {
            templateUrl : "views/Logout.html",
            controller : "LogoutCtrl"
        }).when("/forgot", {
            templateUrl : "views/Forgot.html",
            controller : "ForgotCtrl"
        }).when("/profile", {
            templateUrl : "views/Profile.html",
            controller : "ProfileCtrl"
        }).when("/reset", {
            templateUrl : "views/ResetPassword.html",
            controller : "ResetPasswordCtrl"
        }).when("/changeprofile", {
            templateUrl : "views/ChangeProfile.html",
            controller : "ChangeProfileCtrl"
        }).when("/friends/:username", {
            templateUrl : "views/ViewProfile.html",
            controller : "ViewProfileCtrl"
        }).when("/profiledetail/:userId", {
            templateUrl : "views/ProfileDetail.html",
            controller : "ProfileDetailCtrl"
        }).when("/friendslist", {
            templateUrl : "views/Friends.html",
            controller : "FriendsCtrl",
            controllerAs : "vm"
        }).when("/peopleyoumayknow", {
            templateUrl : "views/PeopleYouMayKnow.html",
            controller : "PeopleYouMayKnowCtrl",
            controllerAs : "vm"
        }).when("/editprofile", {
            templateUrl : "views/EditProfile.html",
            controller : "EditProfileCtrl",
            controllerAs : "vm"
        })
    	.otherwise({
    		redirectTo: "/"
    	});
        $routeProvider.caseInsensitiveMatch = true;
        $locationProvider.html5Mode(true);
    }
]);