app.controller("PagesCtrl", ['$location', '$route', 'ServiceUrls', 'HttpService', 'LS', function($location, $route, ServiceUrls, HttpService, LS){
	
	
	var vm = this;
    vm.test = "test";
    $(document).ready(function() {
       $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
           e.preventDefault();
           $(this).siblings('a.active').removeClass("active");
           $(this).addClass("active");
           var index = $(this).index();
           $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
           $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
       });
    });
	
}]);