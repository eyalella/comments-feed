var React = require('react');
var AddToCart = require('./app-addtocart');
var Link = require('react-router-component').Link;

var CatalogItem = React.createClass({
	render: function() {

		return (
			<div className="catalogItem col-sm-3">
				<br />
				<h4>{this.props.item.title}</h4>
				<img src={this.props.item.img} alt="" />
				<p>
					<br />
					{this.props.item.summary}</p>
				<p>
					${this.props.item.cost}
					<span className="text-success">{this.props.item.inCart && '(' + this.props.item.qty + ' in cart)'}</span>
				</p>
				<div className="btn-group btn-group-xs">
					<Link href={"/item/" + this.props.item.id} className="btn btn-default">Learn More</Link>
					<AddToCart item={this.props.item} />
				</div>
				<p className="description">
					<br />
					{this.props.item.description}
				</p>
			</div>
		);
	}
});

module.exports = CatalogItem;