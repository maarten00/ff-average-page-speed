var notifications = require("sdk/notifications");
exports.renderTimerResult = renderTimerResult;

function renderTimerResult(pageUrl, result)
{
	notificationText = pageUrl.substr(0, 40) + '..\n';
	averageText = 'Average : ' + ( Math.round((result / 1000) * 1000) / 1000)  + 'S (' + result + 'ms)';
	notificationText = notificationText + averageText;

	console.log(notificationText);
	notifications.notify({
		title: "Reload result for:",
		text: notificationText
	});
}