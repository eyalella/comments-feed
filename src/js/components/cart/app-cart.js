var React = require('react');
var AppStore = require('../../stores/app-store');
var RemoveFromCart = require('./app-removefromcart');
var Increace = require('./app-increaceitem');
var Decreace = require('./app-decreaceitem');
var storeWatchMixin = require('../../mixins/StoreWatchMixin');
var Link = require('react-router-component').Link;

function getCart() {
	return {
		items: AppStore.getCart()
	}
}

var Cart = React.createClass({
	mixins: [storeWatchMixin(getCart)],

	render: function() {
		var total = 0;
		var items = this.state.items.map(function(item, i){
			var subtotal = item.cost * item.qty;

			total += subtotal;
			return (
				<tr key={i}>
					<td><RemoveFromCart index={i} /></td>
					<td>{item.title}</td>
					<td>{item.qty}</td>
					<td>
						<Increace index={i} />
						<Decreace index={i} />
					</td>
					<td>${subtotal}</td>
				</tr>	
			);
		});
		return (
			<div>
				<table className="table table-hover">
					<thead>
						<tr>
							<th></th>
							<th>Item</th>
							<th>Qty</th>
							<th></th>
							<th>Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="4" className="text-right">Total</td>
							<td>{total}</td>
						</tr>
					</tfoot>
				</table>
				<Link href="/">Continue Shopping</Link>
			</div>
		);
	}
});

module.exports = Cart;