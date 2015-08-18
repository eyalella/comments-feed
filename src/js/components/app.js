var scss = require('./app.scss')
var React = require('react');
var Catalog = require('./catalog/app-catalog');
var Cart = require('./cart/app-cart');
var Route = require('react-router-component');
var CatalogDetail = require('./product/app-catalogdetail');
var Template = require('./app-template');
var Locations = Route.Locations;
var Location = Route.Location;

var App = React.createClass({
	render: function() {
		return (
			<Template>
				<Locations>
					<Location path="/" handler={Catalog} />
					<Location path="/cart" handler={Cart} />
					<Location path="/item/:item" handler={CatalogDetail} />
				</Locations>
			</Template>
		);
	}
});

module.exports = App;