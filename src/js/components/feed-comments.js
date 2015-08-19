var React = require('react');
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
				primaryText={comment.email} 
				secondaryText={comment.message} 
				leftAvatar={<Avatar 
					src={"http://www.gravatar.com/avatar/" + md5(comment.email)} />
				}/>);
		});
		
		return (
			<div id="feedComments">
				<br />
				<List>
					{comments}
				</List>
			</div>
		);
	}
});

module.exports = FeedResults;