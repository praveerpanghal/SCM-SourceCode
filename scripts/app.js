/* app configuration */
'use strict'
var app = angular.module("scm", ['ngRoute']);

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

