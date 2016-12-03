var MockEventResource = function() {

	var nextId = 6;
	var getNextId = function() {
		nextId++;
		return nextId;
	};

	var events = [{
		id: 1,
		name: 'Event 1',
		description: 'Event 1 description',
		startTime: new Date('11/5/15'),
		endTime: new Date('11/5/15'),
    color: 'red'
	},{
		id: 2,
		name: 'Event 2',
		description: 'Event 2 description',
		startTime: new Date('11/7/15'),
		endTime: new Date('11/9/15'),
    color: 'purple'
	},{
		id: 3,
		name: 'Event 3',
		description: 'Event 3 description',
		startTime: new Date('11/3/15'),
		endTime: new Date('11/22/15'),
    color: 'blue'
	},{
		id: 4,
		name: 'Event 4',
		description: 'Event 4 description',
		startTime: new Date('11/4/15'),
		endTime: new Date('11/5/15'),
    color: 'green'
	},{
		id: 5,
		name: 'Event 5',
		description: 'Event 5 description',
		startTime: new Date('11/15/15'),
		endTime: new Date('11/15/15'),
    color: 'yellow'
	},{
		id: 6,
		name: 'Event 6',
		description: 'Event 6 description',
		startTime: new Date('11/14/15'),
		endTime: new Date('11/19/15'),
    color: 'orange'
	}];

	this.query = function(startDate, endDate, callback) {
		endDate = new Date(endDate);
		endDate.setDate(endDate.getDate() + 1);

		var i, event, eventsToReturn = [];
		for(i = 0; i < events.length; i++) {
			event = events[i];
			if(event.startTime >= startDate && event.startTime < endDate) {
				eventsToReturn.push(event);
			}
		}

		callback(eventsToReturn);
	};

	this.create = function(event, callback) {
		event.id = getNextId();
		events.push(event);

		callback(true);
	};

	this.update = function(id, event, callback) {
		var i,
			found = false;
		for(i = 0; i < events.length; i++) {
			if(events[i].id === id) {
				events[i] = event;
				found = true;
				break;
			}
		}

		callback(found);
	};

	this.delete = function(id, callback) {
		var found = false, i;
		for(i = 0; i < events.lenth; i++) {
			if(events[i].id === id) {
				events.splice(i, 1);
				found = true;
				break;
			}
		}

		callback(found);
	};
};
