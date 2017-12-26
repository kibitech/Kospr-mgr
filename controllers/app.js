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

			.when('/segments', {
				templateUrl : 'views/segments/segments.html',
				controller  : 'segmentsCtrl'
			})

			.when('/nodes', {
				templateUrl : 'views/nodes/nodes.html',
				controller  : 'nodesCtrl'
			})

			.when('/node/:nodeId', {
				templateUrl : 'views/nodes/node/node.html',
				controller  : 'nodeCtrl'
			})
		
			.otherwise({ redirectTo: '/' });
	}]);
