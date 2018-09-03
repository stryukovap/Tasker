import {
	correctFirstZero
} from '/clock.js'

/**
 * Задача. В колонке "Tasks in Queue" выводить те, которые находятся в очереди, но не в сегодняшних тасках.
Сегодняшние (Today tasks) - соответственно.
Week tasks - те, что должны быть выполнены или хотя бы начаты на этой неделе.
Expired - те, что уже закончились.
Кружочек - это срочность таска. Он может быть срочный и не очень)
Показываем срочность при помощи цвета кружочка 
 */

export default function Task(title, description, urgent, start, end) {
	this.title = title;
	this.description = description;
	this.urgentTask = !!urgent;
	this.start = new Date(start);
	this.end = new Date(end);
	this.intervalId = null;
	this.taskInQueue = false;
	this.todayTask = false;
	this.weekTask = false;
	this.expiredTask = false;
};
Task.prototype.update = function () {
	this.checkTodayTask();
	this.checkWeekTask();
	this.checkTaskInQueue();
	this.checkExpiredTask();
}
Task.prototype.startTimer = function () {
	var self = this;
	self.update();
	self.timeoutId = setInterval(function () {
		self.update();
		self.insertForHtml();
	}, 1000*5);
}
Task.prototype.insertForHtml = function () {
	var tasksInQueueUl = document.getElementById('tasksInQueue');
	var tasksTodayUl = document.getElementById('todayTasks');
	var taskWeekUl = document.getElementById('weekTasks');
	var taskExpiredUl = document.getElementById('expiredTasks');
	var formatedDateTimeStart = this.formatDateTime(this.start);
	var formatedDateTimeEnd = this.formatDateTime(this.end);
	if (this.taskInQueue) {
		var taskLi = `<p>${this.title}</p>
		<p>${this.description}</p>
		<p>${formatedDateTimeStart}</p>
		<p>${formatedDateTimeEnd}</p>`;
		tasksInQueueUl.innerHTML = taskLi;
	}
	if (this.todayTask) {
		var taskLi = `<p>${this.title}</p>
		<p>${this.description}</p>
		<p>${formatedDateTimeStart}</p>
		<p>${formatedDateTimeEnd}</p>`;
		tasksTodayUl.innerHTML = taskLi;
	}
	if (this.weekTask) {
		var taskLi = `<p>${this.title}</p>
		<p>${this.description}</p>
		<p>${formatedDateTimeStart}</p>
		<p>${formatedDateTimeEnd}</p>`;
		taskWeekUl.innerHTML = taskLi;
	}
	if (this.expiredTask) {
		var taskLi = `<p>${this.title}</p>
		<p>${this.description}</p>
		<p>${formatedDateTimeStart}</p>
		<p>${formatedDateTimeEnd}</p>`;
		taskExpiredUl.innerHTML = taskLi;
	}
}
Task.prototype.stopTimer = function () {
	clearInterval(this.timeoutId);
}
Task.prototype.formatDateTime = function (date) {
	var now = date ? date : new Date();
	var hours = correctFirstZero(now.getHours());
	var minutes = correctFirstZero(now.getMinutes());
	var seconds = correctFirstZero(now.getSeconds());
	var year = now.getFullYear();
	var month = correctFirstZero(correctMonth(now.getMonth()));
	var day = correctFirstZero(now.getDate());
	return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}
Task.prototype.checkTodayTask = function () {
	var now = new Date();
	var diff = new Date(now - this.start);
	var days = (+diff / (1000 * 60 * 60 * 24));
	console.log(days);
	this.todayTask = (days < 1) && (days > 0) ? true : false;
	console.log("this.todayTask " + this.todayTask);
}
Task.prototype.checkWeekTask = function () {
	var now = new Date();
	now.setMilliseconds(1000 * 60 * 60 * 24 * 7);
	var diff = new Date(now - this.start);
	var days = (+diff / (1000 * 60 * 60 * 24));
	console.log(days);
	this.weekTask = (days < 7) && (days > 0) ? true : false;
	console.log("this.weekTask " + this.weekTask);
}
Task.prototype.checkTaskInQueue = function () {
	var now = new Date();
	var diff = new Date(this.end - now);
	var days = (+diff / (1000 * 60 * 60 * 24));
	console.log(days);
	this.taskInQueue = (days > 0) ? true : false;
	console.log("this.taskInQueue " + this.taskInQueue);
}
Task.prototype.checkExpiredTask = function () {
	var now = new Date();
	var diff = new Date(this.end - now);
	var days = (+diff / (1000 * 60 * 60 * 24));
	console.log(days);
	this.expiredTask = (days < 0) ? true : false;
	console.log("this.expiredTask " + this.expiredTask);
}

function correctMonth(item) {
	item++;
	return item;
}