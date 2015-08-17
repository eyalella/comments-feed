var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _catalog = [];

for(var i=1; i<9; i++) {
	_catalog.push({
		'id': 'Widget' + i,
		'title': 'Widget #' + i,
		'summary': 'Product Summery',
		'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique justo a ultrices finibus. Quisque elit leo, vestibulum vitae arcu a, laoreet dictum ante. In blandit mauris elit, in gravida ligula porta a. Nam ultrices nibh id justo euismod, id sagittis magna venenatis. Quisque mattis aliquam ante. Aliquam at porta tellus, eget porttitor erat. Maecenas porttitor velit eu ipsum euismod scelerisque. Nunc nibh purus, aliquam sit amet nibh at, sollicitudin faucibus justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras mollis neque eu arcu lobortis mattis a id est. Duis auctor, sem eget pharetra lacinia, quam libero luctus tellus, non congue enim massa vitae arcu. Vivamus suscipit eros purus, a ultricies risus egestas sit amet. Fusce fermentum diam bibendum, fermentum magna ut, facilisis neque. Nullam laoreet magna non accumsan bibendum. Curabitur cursus nibh vestibulum nunc feugiat, ut condimentum ligula lobortis. Cras turpis dui, convallis nec semper vitae, iaculis eu neque. Maecenas ut nisi massa. Donec quis tortor purus. Proin malesuada odio non leo feugiat tristique nec sed diam. Etiam vel sagittis augue. Cras sed ex vehicula dui viverra cursus. Pellentesque bibendum pretium diam in laoreet. Praesent nisl ex, volutpat in auctor nec, fermentum sed magna. Vestibulum tristique nisl in vehicula',
		'cost': i,
		'img': 'http://lorempixel.com/1140/400?' + Math.random() 
	});
}

var _cartItems = [];

function _removeItem(index) {
	_cartItems[index].inCart = false;
	_cartItems.splice(index, 1);
}

function _increaceItem(index) {
	_cartItems[index].qty++;
}

function _decreaceItem(index) {
	if(_cartItems[index].qty > 1) {
		_cartItems[index].qty--;
	} else {
		_removeItem(index);
	}
}

function _addItem(item) {
	if(!item.inCart) {
		item['qty'] = 1;
		item['inCart'] = true;
		_cartItems.push(item);
	} else {
		_cartItems.forEach(function(cartItem, i) {
			if(cartItem.id === item.id) {
				_increaceItem(i);
			}
		});
	}
}

function _cartTotals() {
	var qty = 0, total = 0;

	_cartItems.forEach(function(cartItem, i) {
		qty += cartItem.qty;
		total += cartItem.qty * cartItem.cost;
	});

	return {'qty': qty, 'total': total}
}

var AppStore = assign(EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getCart: function() {
		return _cartItems;
	},

	getCatalog: function() {
		return _catalog;
	},

	getCartTotals: function() {
		return _cartTotals();
	},

	dispatcherIndex: AppDispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType) {
			case AppConstants.ADD_ITEM:
				_addItem(payload.action.item);
				break;

			case AppConstants.REMOVE_ITEM:
				_removeItem(payload.action.index);
				break;

			case AppConstants.INCREACE_ITEM:
				_increaceItem(payload.action.index);
				break;

			case AppConstants.DECREACE_ITEM:
				_decreaceItem(payload.action.index);
				break;
		};

		AppStore.emitChange();

		return true;
	})
});

module.exports = AppStore;