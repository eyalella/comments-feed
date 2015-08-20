var React = require('react');
var AddComment = require('./feed-addcomment');
var FeedComments = require('./feed-comments');
var FeedStore = require('../stores/feed-store');
var storeWatchMixin = require('../mixins/StoreWatchMixin');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Search = require('./feed-search');

//Needed for onTouchTap 
//Can go away when react 1.0 release 
//Check this repo: 
//https://github.com/zilverline/react-tap-event-plugin 
injectTapEventPlugin();

function getComments() {
	return {
		feed: FeedStore.getFeed(),
		feedAll: FeedStore.getFeedAll()
	};
}

var App = React.createClass({
	mixins: [storeWatchMixin(getComments)],

	render: function() {
		var hasComments = this.state.feedAll.length > 0;
		var result;

		if(hasComments) {
			result = (
				<div>
					<Search />
					<FeedComments feed={this.state.feed} />
				</div>
			)
		} else {
			result = (
				<div>
					<h3>No posts yet...</h3>
					<p>Go ahead and try the form to leave a comment!</p>
				</div>
			)
		}

		return (
			<div className="app-position">
				<AddComment />
				<div className="results-bg">
					{result}
				</div>
			</div>
		);
	}
});

module.exports = App;