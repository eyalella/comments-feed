var FeedStore = require('../stores/feed-store');

var StoreWatchMixin = function(cb) {
	return {
		getInitialState: function() {
			return cb && cb() || null;
		},

		componentWillMount: function() {
			FeedStore.addChangeListener(this.onChange);
		},

		componentWillUnmount: function() {
			FeedStore.removeChangeListener(this.onChange);
		},

		onChange: function() {
			this.setState(cb && cb() || null);
		}
	}
}

module.exports = StoreWatchMixin;