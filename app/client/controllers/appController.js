app.controller('appController', function($scope, $http) {
	console.log("Hello world from controller");
	
	var refresh = function(){
		$http.get('/contactlist').then(function(response){
			console.log("I got the data I requested");
			$scope.contactList = response.data;
			$scope.contact = null;
		});
	};
	
	refresh();
	
	$scope.addContact = function(){
		console.log($scope.contact)
		$http.post('/contactList', $scope.contact).then(function(response){
			console.log(response.data);
			refresh();
		});
	};
	
});
