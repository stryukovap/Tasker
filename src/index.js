// debugger;
var clearTag = require('./lib/clearTag');
var Task = require('./lib/task');
var Clock = require('./lib/clock');
var Schema = require('./lib/schema');

var arrTasks = [];
for (var i = 10; i < 20; i++) {
	var title = 'testTitle' + i;
	var description = 'testDescription' + i;
	var start = `09/${i}/2018 00:30:00`;
	var end = `09/${i}/2018 20:00:00`;
	var urgent = i % 2 ? true : false;
	arrTasks[i - 1] = new Task(title, description, urgent, start, end);
}
console.log(arrTasks);
var schema = new Schema('tasksInQueue',
	'todayTasks',
	'weekTasks',
	'expiredTasks');
var virtualCheck = setInterval(function () {
	clearTag('app');
	schema.update();
	arrTasks.forEach(function (item) {
		item.update();
		schema.appendTasks(item);
	});
	var app = document.getElementById('app');
	var appHtml = schema.insertInHtml();
	app.innerHTML = appHtml.outerHTML;
}, 1000)
// debugger;
var watch = new Clock('clock');
watch.startTimer();