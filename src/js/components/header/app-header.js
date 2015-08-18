var React = require('react');
var CartSummery = require('./app-cartsummery');

var Header = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-sm-6">
					<h1>Lets Shop</h1>
				</div>
				<div className="col-sm-3 col-sm-push-3">
					<br />
					<CartSummery />
				</div>
			</div>
		);
	}
});

module.exports = Header;