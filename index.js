// debugger;
import Task from '/task.js';
import Clock from './clock.js';

var arrTasks = [];
for (var i = 1; i < 10; i++) {
	var title = 'testTitle' + i;
	var description = 'testDescription' + i;
	var start = `09/0${i}/2018 00:00:00`;
	var end = `09/0${i}/2018 20:00:00`;
	var urgent = true;
	arrTasks[i - 1] = new Task(title, description, urgent, start, end);
}
console.log(arrTasks);
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
	})
}, 5000);

var watch = new Clock('clock');
watch.startTimer();