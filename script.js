
app.config(config);
function config(tmhDynamicLocaleProvider) {
    console.log("tmhDynamicLocaleProvider")
    tmhDynamicLocaleProvider.localeLocationPattern('angular-locale_{{locale}}.js');
}

/*app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/en');
    $stateProvider
       	.state('en', {
            url: '/en',
            templateUrl: 'en_us/index.html',
            controller:'mainController',
            title : 'en'
        })
        .state('sp', {
            url: '/sp',
            templateUrl: 'it_sp/index.html',
            controller:'mainController',
            title : 'sp'
		});
		// $locationProvider.html5Mode(true);
	});*/


  app.controller("mainController",["$scope", "$locale", "tmhDynamicLocale", "$state", "$http" ,function ($scope, $locale, tmhDynamicLocale, $state, $http)
  {
    $scope.locale = 'en-us';
    $scope.xmlData;
    $scope.title = '';
    $scope.localstr = '';
    $scope.datestr = '';
    $scope.numberstr = '';
    $scope.changeLanguage = function(){
        console.log('change')
        $http({
        method: 'GET',
        url: 'xml/data_'+$scope.locale+'.xml'
        }).then(function (xml){
            console.log(xml)
            $scope.xmlData = xml.data.root;
            $scope.getReady($scope.xmlData);
        },function (error){
            console.log(error);
        });
        tmhDynamicLocale.set($scope.locale);

    }
    $scope.changeLanguage();

    

    $scope.getReady = function(xml){
        console.log(xml)
        $scope.title = xml.frontpage.heading;
        $scope.localstr = xml.frontpage.localId;
        $scope.datestr = xml.frontpage.date;
        $scope.numberstr = xml.frontpage.number;
    }        
    // Store the current date/time in a variable
    $scope.currentDate = new Date();
    console.log(JSON.stringify($state.current.title,null,2));
  }]);