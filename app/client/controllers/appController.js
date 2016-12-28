app.controller('appController', function($scope, $http) {
	console.log("Hello world from controller");
	
	$http.get('/contactlist').then(function(response){
		console.log("I got the data I requested");
		$scope.contactList = response.data;
	});
	
});
