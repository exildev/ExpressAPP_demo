var controllers = angular.module('controllers', []);

controllers.controller('lectorController', function($scope, $http, $cordovaBarcodeScanner, $cordovaGeolocation, $ionicPlatform){
	var socket = io('http://104.236.33.228:3000');
	socket.emit('i-am', 'CELL');
    $scope.leerCodigo = function() {
        $cordovaBarcodeScanner.scan().then(function(imagenEscaneada) {
					window.plugins.imeiplugin.getImei(function(imei){
						socket.emit('ionic-qr', {'web_id': imagenEscaneada.text, 'cell_id': imei});
					});
        }, function(error){
            alert('Ha ocurrido un error ' + error);
        });
    };
    $scope.get_gps = function (){
    	var posOptions = {timeout: 10000, enableHighAccuracy: true};
    	$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
	      var lat  = position.coords.latitude;
	      var long = position.coords.longitude;
	      socket.emit('send-gps', {'lat': lat, 'long': long});
	    }, function(err) {
	      socket.emit('send-gps', {'error': err});
	    });
    };

    window.setInterval($scope.get_gps, 5000);
})

.controller('login-controller', function($scope, $http){
	
});
