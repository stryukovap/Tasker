// debugger;
import Task from '/task.js';
import Clock from './clock.js';
import Schema from './VirtualDom.js'

var arrTasks = [];
for (var i = 1; i < 10; i++) {
	var title = 'testTitle' + i;
	var description = 'testDescription' + i;
	var start = `09/0${i}/2018 00:30:00`;
	var end = `09/0${i}/2018 20:00:00`;
	var urgent = i % 2 ? true : false;
	arrTasks[i - 1] = new Task(title, description, urgent, start, end);
}
console.log(arrTasks);
var schema = new Schema('tasksInQueue',
	'todayTasks',
	'weekTasks',
	'expiredTasks');
var virtualCheck = setInterval(function () {
	schema.cleanElements();
	schema.update();
	arrTasks.forEach(function (item) {
		item.update();
		schema.appendTasks(item);
	});
	var app = document.getElementById('app');
	var appHtml = schema.insertInHtml();
	app.innerHTML = appHtml.outerHTML;
}, 1000)

var watch = new Clock('clock');
watch.startTimer();