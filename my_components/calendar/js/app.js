angular.module('app', ['responsiveCalendar']).controller('app-controller', ['$scope', function($scope) {
	$scope.eventResource = new MockEventResource();
}]);