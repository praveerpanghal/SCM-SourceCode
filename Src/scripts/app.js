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

