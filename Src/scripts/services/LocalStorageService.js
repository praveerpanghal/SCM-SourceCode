app.factory("LS", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'my-storage') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(val) {
      $window.sessionStorage && $window.sessionStorage.setItem('token', val);
      //return this;
    },
    getData: function() {
      return $window.sessionStorage && $window.sessionStorage.getItem('token');
    },
    clearData: function() {
      return $window.sessionStorage && $window.sessionStorage.clear();
    },
    url_base64_decode: function(str){
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }
  };
});