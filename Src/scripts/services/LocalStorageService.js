app.factory("LS", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'my-storage') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-storage', val);
      //return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-storage');
    },
    clearData: function() {
      return $window.localStorage && $window.localStorage.clear();
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