var React = require('react');
var AppActions = require('../actions/app-actions');
var muiMixin = require('../mixins/muiMixin');
var TextField = require('material-ui').TextField;
var FlatButton = require('material-ui').FlatButton;

var inputOptions = {
	type: 'text',
	rows: 1,
	fullWidth: true
}

var emailOptions = {
	hintText: 'Your Email Address',
	floatingLabelText: 'Email'
}

var messageOptions = {
	hintText: 'Express yourself...',
	floatingLabelText: 'Message'
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

	showEmailValidation: function() {
		this.refs.emailInput.setErrorText('Please enter a valid email address');
	},

	showMessageValidation: function() {
		this.refs.messageInput.setErrorText('Please enter a message');
	},

	handleSubmit: function(e) {		
		var valid = true;

		if(e) { e.preventDefault(); }
		
		if(!this.state) {
			this.showEmailValidation();
			this.showMessageValidation();
			valid = false;
		} else {
			if (!this.state.email || !/^.+@.+\..+$/.test(this.state.email)) {
				this.showEmailValidation();
				valid = false;
			}
			if(!this.state.message || this.state.message.length < 1) {
				this.showMessageValidation();
				valid = false;
			}
		}

		if(valid) {
			AppActions.addComment(this.state);
			this.clearMessageInput();
		}
	},

	render: function() {

		return (
			<div>
				<div id="addCommentForm">
					<TextField 
						className="icon icon-envelop" 
						ref="emailInput" 
						onChange={this.handleEmailChange} 
						onEnterKeyDown={this.handleSubmit} 
						{...inputOptions} 
						{...emailOptions} />
					<TextField 
						className="icon icon-bubble" 
						ref="messageInput" 
						onChange={this.handleMessageChange} 
						onEnterKeyDown={this.handleSubmit} 
						{...inputOptions} 
						{...messageOptions} />
					
					<div className="submit">
						<FlatButton onClick={this.handleSubmit} label="Submit" secondary={true} />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = AddComent;