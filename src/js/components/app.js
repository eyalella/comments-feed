require('./app.scss');

var React = require('react');
var AddComment = require('./feed-addcomment');
var FeedComments = require('./feed-comments');
var FeedStore = require('../stores/feed-store');
var storeWatchMixin = require('../mixins/StoreWatchMixin');
var injectTapEventPlugin = require('react-tap-event-plugin');

//Needed for onTouchTap 
//Can go away when react 1.0 release 
//Check this repo: 
//https://github.com/zilverline/react-tap-event-plugin 
injectTapEventPlugin();

function getComments() {
	return {feed: FeedStore.getFeed()};
}

var App = React.createClass({
	mixins: [storeWatchMixin(getComments)],

	render: function() {
		return (
			<div>
				<AddComment />
				<FeedComments feed={this.state.feed} />
			</div>
		);
	}
});

module.exports = App;