debugger;
import Task from '/task.js';
import Clock from './clock.js';

var arrTasks = [];
var task1 = new Task ('testTitle', 'testDescripton', 'true', '09/01/2018','09/20/2018');
console.log(task1);

// var watch = new Clock('clock');
// watch.startTimer();

setInterval(function () {
	insertStartedTaskForHtml(createArrayStartedTask(arrTasks));
}, 1000);

function insertStartedTaskForHtml(arr) {
	var taskUl = document.getElementById('tasksInQueue');
	var taskForHtml = "";
	arr.forEach(function (item) {
		taskForHtml += item;
	});
	taskUl.innerHTML = taskForHtml;
}

function createArrayStartedTask(arr) {
	var arrTasksStarted = [];
	arr.forEach(function (item) {
		if (item.checkDateAndTimeTask()) {
			arrTasksStarted.push(`<li>
			<p>Task # ${item.title} Started</p>
			<p>Description: ${item.description}</p>
			<p>Task started: ${item.start}</p>
			<p>Task ended: ${item.end}</p>
			</li>`);
		};
	});
	return arrTasksStarted;
};