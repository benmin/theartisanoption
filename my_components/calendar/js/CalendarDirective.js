angular.module('responsiveCalendar', ['CalendarApi','ui.bootstrap']).directive('rcCalendar', function() {
	return {
		restrict: 'E',
    scope: {
      eventResource: '='
    },
    transclude: true,
		templateUrl: 'calendar/html/CalendarTemplate.html',
		controller: function($scope, $uibModal, CalendarApi) {

      $scope.currentMonth = 11;
      $scope.currentYear = 2015;

			$scope.calendar = CalendarApi.createCalendar('calendar', $scope.eventResource);

      $scope.updateDate = function() {
        $scope.calendar.loadEventsForMonth($scope.currentMonth, $scope.currentYear);

			  $scope.days = $scope.calendar.getDaysForMonth($scope.currentMonth-1, $scope.currentYear);

        $scope.events = $scope.calendar.calendarData.days;
      };

      $scope.updateDate();

			$scope.getDayClass = function(day, index) {
				var cls = 'rc-calendar-day-filler';
				if(day instanceof Date) {
					cls = 'rc-calendar-day';

					if(day.getDate() <= 7) {
						cls += ' rc-calendar-day-top';
					}

					if(day.getDay() === 0 || day.getDate() === 1) {
						cls += ' rc-calendar-day-left';
					}
				}
				return cls;
			};

			$scope.isValidDay = function(day) {
				return day instanceof Date;
			};

			$scope.expandDay = function(day) {
				// popup an overlay that contains details for the day
			};

			$scope.onClickDay = function(day) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'calendar/html/DayViewTemplate.html',
          controller: 'DayViewController',
//           size: size,
          resolve: {
            events: function() { return $scope.events[day].events },
            day: day
          }
        });

      };
		}
	};
});

angular.module('responsiveCalendar').controller('DayViewController', function ($scope, $uibModalInstance, day, events) {

  $scope.day = day;
  $scope.events = events;
  console.log(events);

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
