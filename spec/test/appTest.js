var React = require('react');
var App = require('../../src/js/components/app');
var FeedComments = require('../../src/js/components/feed-comments');

var TestUtils = React.addons.TestUtils;

describe("App", function() {
	var component, html;
	var data = {
		email: "eyal@dudamobile.com",
		message: "Test"	
	}

	beforeEach(() => {
		component = TestUtils.renderIntoDocument(<App />)
	});

	component.setState(data);
	html = component.getDOMNode().textContent;

	if('should have 1 comment in feed', () => {
		expact(html).toContain(FeedComments);
	})
});