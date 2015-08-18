var React = require('react');
var AppStore = require('../../stores/app-store');
var storeWatchMixin = require('../../mixins/StoreWatchMixin');
var CatalogItem = require('./app-catalogitem');

function getCatalog() {
	return {
		items: AppStore.getCatalog()
	}
}

var Catalog = React.createClass({
	mixins: [storeWatchMixin(getCatalog)],

	render: function() {
		var items = this.state.items.map(function(item){
			return <CatalogItem key={item.id} item={item} />
		});
		return (
			<div className="row">
				{items}
			</div>
		);
	}
});

module.exports = Catalog;