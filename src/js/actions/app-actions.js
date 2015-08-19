var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
	addComment: function(state) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ADD_COMMENT,
			state: state
		});
	},

	filterResults: function(query) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.FILTER_RESULTS,
			query: query
		});
	}
}

module.exports = AppActions;