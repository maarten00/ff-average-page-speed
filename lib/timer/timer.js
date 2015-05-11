var events = require("sdk/system/events");
exports.init = init;
exports.startAttempt = startAttempt;
exports.getResults = getResults;

var startTime, timings, attempt, tab, maxAttempts = 5;

function init(initTab, initMaxAttempts)
{
	maxAttempts = initMaxAttempts;
	tab = initTab;
	timings = [];
	tab.on('load', readyListener);
	attempt = 0;
}

function startAttempt(){
	attempt++;
	startTime = new Date();
	tab.reload();
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
		tab.removeListener('load', readyListener);
		//todo: Fire event ready
		events.emit('timerComplete');
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
	return averageTime;
}