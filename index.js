import Task from '/module_task.js';
import {
	getFormatedTimeNow
} from '/module_clock.js'
// debugger;
var arrTasks = [];
var task1 = new Task("Home",
	"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, quis?",
	1);
arrTasks.push(task1);
var task2 = new Task("Work",
	"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, quis?",
	2);
arrTasks.push(task2);
var task3 = new Task("Home work",
	"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, quis?",
	3);
arrTasks.push(task3);

setInterval(function () {
	insertTimeForHtml(getFormatedTimeNow());
	insertStartedTaskForHtml(createArrayStartedTask(arrTasks));
}, 1000);

function insertTimeForHtml(time) {
	var clockDiv = document.getElementById('clock');
	var timeForHtml = `<h4 style="font-size:50px; text-align: center;">${time}</h4>`;
	clockDiv.innerHTML = timeForHtml;
};

function insertStartedTaskForHtml(arr) {
	var taskUl = document.getElementById('tasks');
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
			arrTasksStarted.push(`<li><p style=font-size:30px;>Task # ${item.title} Started</p>
			<p style=font-size:20px;>Descripton: ${item.description}</p>
			<p style=font-size:15px;>Task started: ${item.start}</p>
			<p style=font-size:15px;>Task ended: ${item.end}</p></li>`);
		};
	});
	return arrTasksStarted;
};