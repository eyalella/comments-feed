var React = require('react');
var Link = require('react-router-component').Link;
var AppStore = require('../../stores/app-store');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');

function cartTotals() {
	return AppStore.getCartTotals();
}

var CartSummery = React.createClass({
	mixins: [StoreWatchMixin(cartTotals)],

	render: function() {
		return (
			<div className="pull-right">
				<Link href="/cart" className="btn btn-success">
					Cart Items: {this.state.qty} / ${this.state.total}
				</Link>
			</div>
		);
	}
});

module.exports = CartSummery;