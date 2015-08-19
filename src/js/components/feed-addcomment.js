var React = require('react');
var AppActions = require('../actions/app-actions');
var muiMixin = require('../mixins/muiMixin');
var TextField = require('material-ui').TextField;
var FlatButton = require('material-ui').FlatButton;
var FontIcon = require('material-ui').FontIcon;

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

	clearMessageInput: function() {
		this.refs.messageInput.clearValue()
		this.setState({message: ''});
	},

	handleSubmit: function(e) {		
		e.preventDefault();
		
		if(!this.state || !this.state.email || !this.state.message) {
			return;
		}

		var validateEmail = /^.+@.+\..+$/.test(this.state.email);
		var validateMessage = this.state.message.length > 0;

		if(validateEmail && validateMessage) {
			AppActions.addComment(this.state);
			this.clearMessageInput();
		}
	},

	render: function() {
		return (
			<div id="addCommentForm">
				<TextField className="" onChange={this.handleEmailChange} {...inputOptions} required="true" />
				<TextField ref="messageInput" onChange={this.handleMessageChange} {...textareaOptions} />
				
				<div className="submit">
					<FlatButton onClick={this.handleSubmit} label="Submit" secondary={true} />
				</div>
			</div>
		);
	}
});

module.exports = AddComent;