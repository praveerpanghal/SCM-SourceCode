/* app configuration */
'use strict'
var app = angular.module("scm", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/main.html"
    })
    .when("/red", {
        templateUrl : "views/red.html",
		controller : "scripts/controllers/redCtrl.js"
    })
    .when("/green", {
        templateUrl : "views/green.html",
		controller : "scripts/controllers/greenCtrl.js"
    })
    .when("/blue", {
        templateUrl : "views/blue.html",
		controller : "scripts/controllers/blueCtrl.js"
    });
});


app.controller("scmCtrl",function($scope){
	
	$scope.msg="welcome to scm";
	
});