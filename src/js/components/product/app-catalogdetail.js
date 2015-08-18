var React = require('react');
var AppStore = require('../../stores/app-store');
var AddToCart = require('../catalog/app-addtocart');
var storeWatchMixin = require('../../mixins/StoreWatchMixin');
var Link = require('react-router-component').Link;

function getCatalogItem(component) {
	var thisItem;
	AppStore.getCatalog().forEach(function(item) {
		if(item.id.toString() === component.props.item) {
			thisItem = item;
		}
	});

	return {item: thisItem};
}

var CatalogDetail = React.createClass({
	mixins: [storeWatchMixin(getCatalogItem)],

	render: function() {
		var imageStyle = {
			maxWidth: '100%'
		}

		return (
			<div key={this.state.item.id}>
				<h2>{this.state.item.title}</h2>
				<img src={this.state.item.img} alt="" style={imageStyle} />
				<br />
				<br />
				<hr />
				<br />
				<p>{this.state.item.description}</p>
				<p>
					${this.state.item.cost}
					<span className="text-success">{this.state.item.inCart && '(' + this.state.item.qty + ' in cart)'}</span>
				</p>
				<div className="btn-group btn-group-sm">
					<Link href="/" className="btn btn-default">Continue Shopping</Link>
					<AddToCart item={this.state.item} />
				</div>
			</div>
		);
	}
});

module.exports = CatalogDetail;