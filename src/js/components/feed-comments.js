var React = require('react');
var Search = require('./feed-search');
var muiMixin = require('../mixins/muiMixin');
var md5 = require('./md5');
var Avatar = require('material-ui').Avatar;
var List = require('material-ui').List;
var ListItem = require('material-ui').ListItem;

var FeedResults = React.createClass({
	mixins: [muiMixin()],

	render: function() {
		var comments = [];

		this.props.feed.map(function(comment) {
			comments.push(<ListItem 
				secondaryTextLines="2"
				primaryText={comment.email} 
				secondaryText={comment.message} 
				leftAvatar={<Avatar 
					src={"http://www.gravatar.com/avatar/" + md5(comment.email)} />
				}/>);
		});
		
		return (
			<div>
				<div id="feedComments">
					<Search />
					<br />
					<List>
						{comments}
					</List>
				</div>
			</div>
		);
	}
});

module.exports = FeedResults;