var React = require('react');
var AppActions = require('../actions/app-actions');
var muiMixin = require('../mixins/muiMixin');
var TextField = require('material-ui').TextField;
var FlatButton = require('material-ui').FlatButton;

var inputOptions = {
	hintText: 'Your Email Address',
	floatingLabelText: 'Email',
	type: 'text',
	rows: 1,
	fullWidth: true
}

var textareaOptions = {
	hintText: 'Express yourself...',
	floatingLabelText: 'Message',
	type: 'text',
	rows: 1,
	fullWidth: true,
	multiLine: true
}

var AddComent = React.createClass({
	mixins: [muiMixin()],

	handleMessageChange: function(e) {
		this.setState({message: e.target.value});
	},

	handleEmailChange: function(e) {
		this.setState({email: e.target.value});
	},

	handleSubmit: function(e) {		
		e.preventDefault();
		AppActions.addComment(this.state);
	},

	render: function() {
		return (
			<div id="addCommentForm">
				<TextField onChange={this.handleEmailChange} {...inputOptions} required="true" />
				<TextField onChange={this.handleMessageChange} {...textareaOptions} />
				
				<div className="submit">
					<FlatButton onClick={this.handleSubmit} label="Submit" secondary={true} />
				</div>
			</div>
		);
	}
});

module.exports = AddComent;