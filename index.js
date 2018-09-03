// debugger;
import Task from '/task.js';
import Clock from './clock.js';

var arrTasks = [];
for (var i = 1; i < 10; i++) {
	var title = 'testTitle' + i;
	var description = 'testDescription' + i;
	var start = `09/0${i}/2018 10:00:00`;
	var end = `09/0${i}/2018 20:00:00`;
	var urgent = true;
	arrTasks[i-1] = new Task(title, description, urgent, start, end);
}
console.log(arrTasks);
// var task1 = new Task('testTitle1',
// 	'testDescription1',
// 	'true',
// 	'09/02/2018 10:00:00',
// 	'09/02/2018 20:00:00');
// arrTasks.push(task1);
// var task2 = new Task('testTitle2',
// 	'testDescription2',
// 	'true',
// 	'09/03/2018 10:00:00',
// 	'09/03/2018 20:00:00');
// arrTasks.push(task2);
// var task3 = new Task('testTitle3',
// 	'testDescription3',
// 	'true',
// 	'09/04/2018 10:00:00',
// 	'09/04/2018 20:00:00');
// arrTasks.push(task3);
// var task4 = new Task('testTitle4',
// 	'testDescription4',
// 	'true',
// 	'09/05/2018 10:00:00',
// 	'09/05/2018 20:00:00');
// arrTasks.push(task4);

arrTasks.forEach(function (item) {
	item.startTimer();
	// console.log(item);
})

var watch = new Clock('clock');
watch.startTimer();

// setInterval(function () {
// 	insertStartedTaskForHtml(createArrayStartedTask(arrTasks));
// }, 1000);

// function insertStartedTaskForHtml(arr) {
// 	var taskUl = document.getElementById('tasksInQueue');
// 	var taskForHtml = "";
// 	arr.forEach(function (item) {
// 		taskForHtml += item;
// 	});
// 	taskUl.innerHTML = taskForHtml;
// }

// function createArrayStartedTask(arr) {
// 	var arrTasksStarted = [];
// 	arr.forEach(function (item) {
// 		if (item.checkDateAndTimeTask()) {
// 			arrTasksStarted.push(`<li>
// 			<p>Task # ${item.title} Started</p>
// 			<p>Description: ${item.description}</p>
// 			<p>Task started: ${item.start}</p>
// 			<p>Task ended: ${item.end}</p>
// 			</li>`);
// 		};
// 	});
// 	return arrTasksStarted;
// };