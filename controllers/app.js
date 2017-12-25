	// create the module and name it woonked
	var app = angular.module('app', ['ngRoute','ngSanitize']);
	// configure our routes
	app.config(["$routeProvider","$locationProvider","$httpProvider",function($routeProvider,$locationProvider,$httpProvider) {		
		var signed = localStorage.getItem("signed_in");
		var temp;
		var ctrl;		
		if(signed)
		{
			temp = 'views/dashboard.html';
			ctrl = 'dashboardCtrl';
		}
		else
		{
			temp = 'views/home.html';
			ctrl = 'mainController';
		}
		
		//$locationProvider.html5Mode(true);				
		var apikey        = localStorage.getItem("apikey");
		$httpProvider.defaults.headers.common['Authorization'] = 'Bearer '+apikey;
		$locationProvider.hashPrefix('');	
		$routeProvider

			.when('/', {
				templateUrl : temp,
				controller  : ctrl
			})

			.when('/dashboard', {
				templateUrl : 'views/dashboard.html',
				controller  : 'dashboardCtrl'
			})	
			
			.when('/security', {
				templateUrl : 'views/security/security.html',
				controller  : 'securityCtrl'
			})

			.when('/branches', {
				templateUrl : 'views/branches/branches.html',
				controller  : 'branchesCtrl'
			})

			/*
			.when('/branch/:deviceId', {
				templateUrl : 'views/branches/branch/branch.html',
				controller  : 'branchCtrl'
			})
			*/
		
			.otherwise({ redirectTo: '/' });
	}]);
