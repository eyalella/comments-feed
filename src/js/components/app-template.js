var React = require('react');
var Header = require('./header/app-header')

var CatalogItem = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Header />
				{this.props.children}
			</div> 
		);
	}
});

module.exports = CatalogItem;