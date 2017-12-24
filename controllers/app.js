	// create the module and name it woonked
	var app = angular.module('app', ['ngRoute','ngSanitize',"checklist-model"]);
	// configure our routes
	app.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider) {		
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
			temp = 'views/home.html'; //'<br><br><br><br><br><h1>HOLA</h1>';
			ctrl = 'mainController';
		}
		
		//$locationProvider.html5Mode(true);				
		$locationProvider.hashPrefix('');
		console.log($routeProvider)
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
