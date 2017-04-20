/* directive for password validation */
app.directive('confirmPassword', function(){
	return{
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl){
			ctrl.$parsers.unshift(function(viewValue, $scope){
				console.log(viewValue);
				console.log(scope.registerForm.password);
				var noMatch = viewValue != scope.registerForm.password.$viewValue;
				console.log(noMatch);
				ctrl.$setValidity('noMatch', !noMatch);
			});
		}
	}

});