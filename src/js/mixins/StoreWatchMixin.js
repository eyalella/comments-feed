var AppStore = require('../stores/app-store');

var StoreWatchMixin = function(cb) {
	return {
		getInitialState: function() {
			return cb(this);
		},

		componentWillMount: function() {
			AppStore.addChangeListener(this.onChange);
		},

		componentWillUnmount: function() {
			AppStore.removeChangeListener(this.onChange);
		},

		onChange: function() {
			this.setState(cb(this));
		}
	}
}

module.exports = StoreWatchMixin;