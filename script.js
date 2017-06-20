var app = angular.module("mainModule", ["ngLocale","ui.router",'tmh.dynamicLocale']);



app.config(config);
function config(tmhDynamicLocaleProvider) {
    console.log("tmhDynamicLocaleProvider")
    tmhDynamicLocaleProvider.localeLocationPattern('angular-locale_{{locale}}.js');
}



app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	 // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/en');
    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
       	.state('en', {
            url: '/en',
            templateUrl: 'en_us/index.html',
            controller:'mainController',
            title : 'en'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('sp', {
            url: '/sp',
            templateUrl: 'it_sp/index.html',
            controller:'mainController',
            title : 'sp'
		});
		// $locationProvider.html5Mode(true);
	});


  app.controller("mainController", function ($scope, $locale, tmhDynamicLocale, $state)
  {
    // Store the current locale ID in a variable
    if($state.current.title == "en"){
        $scope.locale = 'en-us';
    }else{
        $scope.locale = 'es-es';
    }
    tmhDynamicLocale.set($scope.locale);

    $scope.localeId = $locale.id;
        
    // Store the current date/time in a variable
    $scope.currentDate = new Date();
    console.log(JSON.stringify($state.current.title,null,2));
  });