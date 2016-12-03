/**
 * CalendarApi
 */
angular.module('CalendarApi', [])
    .factory('CalendarApi', [function CalendarApi() {

//    	var log = $log;

    	/**
    	 * @private
    	 *
    	 * Stores references to all the calendars that have been created.
    	 */
    	var calendars = {};

    	var CalendarData = function(newDataResource) {

    		/*******
    		 * private variables
    		 *******/
    		var dataResource = newDataResource,
    			startDate, endDate, events;

    		/*******
    		 * public variables
    		 *******/
    		this.days = {};
    		this.events;

    		/*******
    		 * private classes
    		 *******/
    		var Day = function(date) {

        		this.date = date;
    			this.events = [];

        		var sortEvents = function() {
        			// TODO sort events by start time
        		};

        		var indexOfEvent = function(eventId, events) {
    				var i;
	    			for(i = 0; i < events.length; i++) {
	    				if(events[i].id === eventId) {
	    					return i;
	    				}
	    			}

	    			return -1;
        		};

        		this.addEvent = function(event) {
    				this.events.push(event);
        			sortEvents();
        		};

        		this.updateEvent = function(event) {
        			var i = indexOfEvent(event.id, this.events);

        			if(i >= 0) {
        				this.events[i] = event;
        				sortEvents();
        			}
        		};

        		this.deleteEvent = function(event) {
        			var i = indexOfEvent(event.id, this.events);

        			if(i >= 0) {
        				this.events.splice(i,1);
        			}
        		};

        		this.eventExists = function(event) {
        			return indexOfEvent(event.id, this.events) >= 0;
        		};
        	};

    		/*******
    		 * private functions
    		 *******/

    		/**
    		 * @private
    		 *
    		 * Generates a unique key for the given date.
    		 * The keys are in the format: day-month-year
    		 *
    		 * @param date	The date object.
    		 *
    		 * @return The key for the given date.
    		 */
    		var getDayKey = function(date) {
    			return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    		};

    		/**
    		 * @private
    		 *
    		 * Zeroes out all the time fields of a Date object
    		 *
    		 * @param date	The date object.
    		 *
    		 * @return The date object, with zeroed time fields.
    		 */
    		var clearTime = function(date) {
    			date.setHours(0);
    			date.setMinutes(0);
    			date.setSeconds(0);
    			date.setMilliseconds(0);

    			return date;
    		};

    		/**
    		 * @private
    		 *
    		 * Clears any existing days, and populates the new map and list with the days between the start and end dates, inclusive.
    		 */
    		var initDays = angular.bind(this, function() {
//    			log.trace('begin initDays...');
    			this.days = {};

    			// populate the days object for the given range of dates, denoted by the start and end dates
        		var iDate;
        		startDate = clearTime(startDate);
        		endDate = clearTime(endDate);
        		for(iDate = new Date(startDate); iDate <= endDate; iDate.setDate(iDate.getDate()+1)) {
        			var day = new Day(new Date(iDate));
        			this.days[day.date] = day;
        		}
//        		log.trace('end initDays');
    		});

    		/**
    		 * Adds the events to the appropriate days.
    		 */
    		var setEvents = angular.bind(this, function(events) {
    			initDays();

    			this.events = {};

        		var i, event;
        		for(i = 0; i < events.length; i++) {
        			event = events[i];
        			addEventToUI(event);
        		}
    		});

        var addEventToUI = angular.bind(this, function(event) {
          var iDate, day;
          var startDate = clearTime(new Date(event.startTime));
          var endDate = clearTime(new Date(event.endTime));
          for(iDate = new Date(startDate); iDate <= endDate; iDate.setDate(iDate.getDate()+1)) {
            day = this.days[iDate];
            if(!day.eventExists(event)) {
              day.addEvent(event);
              this.events[event.id] = event;
            } else {
              throw new Error('ERROR: Attempted to add event (id = ' + event.id + ') that already exists.');
            }
          }
        });

    		this.setDateRange = function(newStartDate, newEndDate) {
    			var me = this;

    			startDate = newStartDate;
    			endDate = newEndDate;

    			dataResource.query(startDate, endDate, function(events) {
    				setEvents(events);
    			});
    		};

    		/*******
    		 * public functions
    		 *******/

    		/**
    		 * Adds an event to the appropriate days.
    		 *
    		 * @param event		The event being added.
    		 */
    		this.addEvent = function(event) {
//    			log.trace('begin CalendarData.addEvent...');

    			var me = this;

    			dataResource.create(event, function(newEvent) {
            if(!!newEvent) {
              addEventToUI(newEvent);
            }
          });
    		};

    		/**
    		 * Updates the event, and adds it to all appropriate days.
    		 *
    		 * @param event		The event being updated.
    		 */
    		this.updateEvent = function(event) {
    			var me = this;

				dataResource.update(event.id, event, function(success) {
					if(success) {
						var iDate, day;
						var startDate = clearTime(new Date(event.startTime));
						var endDate = clearTime(new Date(event.endTime));
		    			for(iDate = new Date(startDate); iDate <= endDate; iDate.setDate(iDate.getDate()+1)) {
		    				day = me.days[iDate];
		    				if(day.eventExists(event)) {
		    					day.updateEvent(event);
		    				} else {
		    					day.addEvent(event);
		    				}
		    			}
					}
				});

    		};

    		/**
    		 * Deletes the event from all days it appears in.
    		 *
    		 * @param event		The event being deleted.
    		 */
    		this.deleteEvent = function(event) {
    			var me = this;

				dataResource.delete(event.id, function(success) {
					if(success) {
						var iDate, day;
						var startDate = clearTime(new Date(event.startTime));
						var endDate = clearTime(new Date(event.endTime));
		    			for(iDate = new Date(startDate); iDate <= endDate; iDate.setDate(iDate.getDate()+1)) {
		    				day = me.days[iDate];
							day.deleteEvent(event);
		    			}
					}
				});
    		};
    	};

    	/**
    	 * Constructor for the Calendar class.
    	 *
    	 * @param name			A unique identifier for the calendar.
    	 * @param dataResource	A $resource object that allows the Calendar object to pull event data from the database.
    	 * 						This $resource must contain the following methods:
    	 * 							query(startDate, endDate)
    	 * 							create(event)
    	 * 							update({id: id}, event)
    	 * 							delete({id: id})
    	 * 						Sample resource definition:
    	 * 							$resource('url/', {}, {
    	 * 								query: { method: 'GET', isArray: true },
    	 * 								create: { method: 'POST' },
    	 * 								update: { method: 'PUT', url: 'url/:id' },
    	 * 								delete: { method: 'DELETE', url: 'url/:id' }
    	 * 							});
    	 */
    	var Calendar = function(name, dataResource) {

    		this.name = name;
    		this.calendarData = new CalendarData(dataResource);

    		this.getDaysForMonth = function(month, year) {
    			var startDate = new Date(year, month, 1),
    				nextDate = startDate,
    				daysList = [],
    				weeksList = [],
    				i;

//    			// pad the start of the month to start on Sunday
    			for(i = 0; i < startDate.getDay(); i++) {
    				daysList.push('start'+i);
    			}

    			// fill in the actual days of the month
    			while(nextDate.getMonth() == month) {
    				while(daysList.length < 7 && nextDate.getMonth() == month) {
    					daysList.push(nextDate);
    					nextDate = new Date(nextDate);
    					nextDate.setDate(nextDate.getDate() + 1);
    				}

    				weeksList.push(daysList);
    				daysList = [];
    			}
//    			for(i = 0; i < days.length; i++) {
//    				while(daysList.length < 7) {
//    					daysList.push(days[i]);
//    					i++;
//    				}
//
//    				weeksList.push(daysList);
//    				daysList = [];
//    			}

    			// pad the end of the month to end on Saturday
    			var lastWeek = weeksList[weeksList.length - 1];
    			for(i = lastWeek.length; lastWeek.length < 7; i++) {
    				lastWeek.push('end'+i);
    			}

    			return weeksList;
    		};

    		this.addEvent = function(name, description, startTime, endTime) {
				var event = new Event(name, description, startTime, endTime);
				this.calendarData.addEvent(event);
			};

			this.updateEvent = function(event) {
				this.calendarData.updateEvent(event);
			};

			this.deleteEvent = function(event) {
				this.calendarData.deleteEvent(event);
			};

			this.loadEventsForDay = function(date) {
				this.calendarData.setDateRange(date, date);
			};

			this.loadEventsForWeek = function(sundayDate) {
				var saturdayDate = new Date(sundayDate);
				saturdayDate.setDate(saturdayDate.getDate() + 6);

				this.calendarData.setDateRange(sundayDate, saturdayDate);
			};

			this.loadEventsForMonth = function(month, year) {
				var startDate = new Date(month + '/1/' + year);

				var endDate = new Date(startDate);
				endDate.setMonth(endDate.getMonth() + 1);
				endDate.setDate(0);

				this.calendarData.setDateRange(startDate, endDate);
			};

			this.loadEventsInDateRange = function(startDate, endDate) {
				this.calendarData.setDateRange(startDate, endDate);
			};

    	};

    	var Event = function(name, description, startTime, endTime) {
    		this.id = '';
    		this.name = name;
    		this.description = description;
    		this.startTime = startTime;
    		this.endTime = endTime;
    	};

        return {
        	/**
    		 * Creates a new calendar object, stores a reference to it, and returns it.
    		 *
    		 * @param name		A unique identifier for the calendar. This must be unique from all other calendar names.
    		 * @param dataSrc	The $resource representing the source of the calendar data.
    		 * 					This must provide methods to retrieve/update the data.
    		 */
    		createCalendar: function(name, dataSrc) {
    			var calendar = new Calendar(name, dataSrc);

    			// TODO check if name already exists
    			calendars[name] = calendar;

    			return calendar;
    		},

    		getCalendar: function(name) {
    			// TODO add error checking
    			return calendars[name];
    		},

    		deleteCalendar: function(name) {
    			if(calendars[name] !== undefined) {
    				delete calendars[name];
    				return true;
    			}

    			return false;
    		},

    		deleteAllCalendars: function() {
    			calendars = {};
    		}
        };
    }]);
