var React = require('react');
var storeWatchMixin = require('../mixins/StoreWatchMixin');
var AppActions = require('../actions/app-actions');
var muiMixin = require('../mixins/muiMixin');
var TextField = require('material-ui').TextField;

var inputOptions = {
	hintText: 'Search Email or Message...',
	floatingLabelText: 'Search',
	type: 'search',
	rows: 1,
	fullWidth: true
}

var FeedSearch = React.createClass({
	mixins: [storeWatchMixin(), muiMixin()],

	handleSearch: function(e) {
		AppActions.filterResults(e.target.value);
	},

	render: function() {
		return (
			<div id="feedSearch">
				<TextField type="search" {...inputOptions} onChange={this.handleSearch} />
			</div>
		);
	}
});

module.exports = FeedSearch;