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
arrTasks.forEach(function (item) {
	item.startTimer();
});
arrTasks.forEach(function (item) {
	schema.appendTasks(item);
});
var app = document.getElementById('app');
var appHtml = schema.insertInHtml();
app.innerHTML = appHtml.outerHTML;
console.log(schema);
// schema.cleanElements();

var check = setInterval(function () {
	var tasksInQueueUl = document.getElementById('tasksInQueue');
	var tasksTodayUl = document.getElementById('todayTasks');
	var taskWeekUl = document.getElementById('weekTasks');
	var taskExpiredUl = document.getElementById('expiredTasks');
	tasksInQueueUl.innerHTML = "";
	tasksTodayUl.innerHTML = "";
	taskWeekUl.innerHTML = "";
	taskExpiredUl.innerHTML = "";
	arrTasks.forEach(function (item) {
		item.startTimer();
		// item.insertForHtml();
	})
}, 1000);

var watch = new Clock('clock');
watch.startTimer();