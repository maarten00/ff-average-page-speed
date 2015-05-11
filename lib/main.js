var events = require("sdk/system/events");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var timer = require('./timer/timer');
var notifier = require('./notifier');

buttons.ActionButton({
  id: "timing",
  label: "Start reload timer",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleButtonClick
});

function handleButtonClick(state) {
	activeTab = tabs.activeTab;
	pageUrl = activeTab.url;

	timer.init(activeTab, 5);
	timer.startAttempt();
    events.on('timerComplete', function(){
		notifier.renderTimerResult(pageUrl, timer.getResults());
	});
}