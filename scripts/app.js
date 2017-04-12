/* app configuration */
'use strict'
var app = angular.module("scm", ['ngRoute']);

/* Service URL's */

var BaseUrl = 'http://162.17.231.114:1212/ServiceSCM.svc/';

app.value('ServiceUrls', {
    GetCountrylist: BaseUrl + 'GetCountrylist',
    GetStateList: BaseUrl + 'GetStateList',
    GetSchoolList: BaseUrl + 'GetSchoolList',
    UserRegistrationForm: BaseUrl + 'UserRegistrationForm'
});

app.config(function($routeProvider) {
    $routeProvider   
    .when("/", {
        templateUrl : "views/Login.html",
		controller : "LoginCtrl"
    }).when("/register", {
        templateUrl : "views/Register.html",
		controller : "RegisterCtrl"
    })
	.otherwise({
		redirectTo: "/"
	});
});

