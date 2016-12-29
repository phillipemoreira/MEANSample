app.controller('appController', function($scope, $http) {
	
	var refresh = function(){
		$http.get('/contactlist').then(function(response){
			console.log("The server sent refreshed data.");
			$scope.contactList = response.data;
			$scope.contact = null;
		});
	};
	
	refresh();
	
	$scope.addContact = function(){
		console.log("I will try to add the following contact");
		console.log($scope.contact);
		$http.post('/contactList', $scope.contact).then(function(response){
			console.log("the server sent back the followingg info:");
			console.log(response.data);
			refresh();
		});
	};
	
	$scope.remove = function(id){
		console.log("I will try to remove contact of id: "+ id);
		$http.delete('/contactList/' + id).then(function(response){
			console.log("the server sent back the followingg info:")
			console.log(response.data);
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log("I am requesting the contact data of id: " + id);
		$http.get('/contactlist/' + id).then(function(response){
			console.log("the server sent back the followingg info:")
			console.log(response.data);
			$scope.contact = response.data;
		});
	};

	$scope.update = function(){
		console.log("I will try to update: " + $scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){
			console.log("the server sent back the followingg info:");
			console.log(response.data);
			refresh();
		});
	};
});
