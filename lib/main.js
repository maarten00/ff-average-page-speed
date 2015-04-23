var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var notifications = require("sdk/notifications");

var startTime;
var activeTab;
var timings;
var attempt;
var maxAttempts = 5;
var pageUrl;

var button = buttons.ActionButton({
  id: "timing",
  label: "Start reload timer",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  activeTab = tabs.activeTab;
  pageUrl = activeTab.url;
  timings = [];
  activeTab.on('load', readyListener);
  attempt = 0;
  startAttempt();
}
function startAttempt(){
  attempt++;
  startTime = new Date();
  activeTab.reload();
}

function readyListener()
{
  stopTimer();
  if(attempt < maxAttempts)
  {
    startAttempt();
  }
  else
  {
    activeTab.removeListener('load', readyListener);
    getResults();
  }
}

function stopTimer(){
  endTime = new Date();
  loadTimeInMs = (endTime.getTime() - startTime.getTime());
  console.log( 'Attempt ' + attempt + ': ' + loadTimeInMs /1000 + ' seconds' );
  timings.push( loadTimeInMs );
}

function getResults()
{
  totalTime = 0;
  timings.forEach(function(t)
  {
    totalTime = totalTime + t;
  });

  averageTime = totalTime / maxAttempts;
  renderResult(averageTime);
}

function renderResult(result)
{
  notificationText = pageUrl.substr(0, 42) + '\n';
  averageText = 'Average : ' + ( Math.round((result / 1000) * 1000) / 1000)  + 'S (' + result + 'ms)';
  notificationText = notificationText + averageText;

  console.log(notificationText);
  notifications.notify({
    title: "Reload result for:",
    text: notificationText
  });
}