angular.module('quantion', [])
	.factory('socket', ['$rootScope', function ($rootScope) {

	  var socket = io.connect('http://192.168.1.45:8080', { 'forceNew': true });

	  return {
	    on: function (eventName, callback) {
	      function wrapper() {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      }

	      socket.on(eventName, wrapper);

	      return function () {
	        socket.removeListener(eventName, wrapper);
	      };
	    },

	    emit: function (eventName, data, callback) {
	      socket.emit(eventName, data, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          if(callback) {
	            callback.apply(socket, args);
	          }
	        });
	      });
	    }
	  };
	}])

	.controller('CajeroController', ['$scope', 'socket', function ($scope, socket) {
		$scope.monedas = 0;

		socket.on('recarga', function(data) {
			$scope.monedas = data.monedas;
		});

		socket.on('compra', function(data) {
			$scope.monedas = data.monedas;
		});

	}]);


