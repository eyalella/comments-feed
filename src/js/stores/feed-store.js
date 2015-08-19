var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var comments = [];
var visibleComments = [];
var filterd = false;

function addComment(state) {
	comments.push(state);
}

function filterResults(query) {
	var emailMatch, messageMatch;

	visibleComments = [];
	
	if(!query) {
		filterd = false;
		visibleComments = [...comments];
	} else {
		filterd = true;
		comments.forEach(function(comment) {
			emailMatch = comment.email && comment.email.indexOf(query) > -1;
			messageMatch = comment.message && comment.message.indexOf(query) > -1;

			if(emailMatch || messageMatch) {
				visibleComments.push(comment);
			}
		});
	}

	return visibleComments;
}

function getFilterdResults() {
	return filterd ? visibleComments : comments;
}

var FeedStore = assign(EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getFeed: function() {
		return getFilterdResults();
	},

	dispatcherIndex: AppDispatcher.register(function(payload){
		var action = payload.action;
		
		switch(action.actionType) {
			case AppConstants.ADD_COMMENT:
				addComment(payload.action.state);
				break;

			case AppConstants.FILTER_RESULTS:
				filterResults(payload.action.query);
				break;
		}

		FeedStore.emitChange();

		return true;
	})
});

module.exports = FeedStore;