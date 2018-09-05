import {
	correctFirstZero
} from '/clock.js'

export default function Task(title, description, urgent, start, end) {
	this.title = title;
	this.description = description;
	this.urgentTask = !!urgent;
	this.start = new Date(start);
	this.end = new Date(end);
	this.intervalId = null;
	this.taskInQueue = this.checkTaskInQueue();
	this.todayTask = this.checkTodayTask();
	this.weekTask = this.checkWeekTask();
	this.expiredTask = this.checkExpiredTask();
};
Task.prototype.update = function () {
	this.checkTodayTask();
	this.checkWeekTask();
	this.checkTaskInQueue();
	this.checkExpiredTask();
}
Task.prototype.startTimer = function () {
	var self = this;
	// self.update();
	// self.timeoutId = setInterval(function () {
	self.update();
	self.insertForHtml();
	// self.stopTimer();
	// }, 1000);
}
Task.prototype.formatTaskForHtml = function () {
	var formatedDateTimeStart = this.formatDateTime(this.start);
	var formatedDateTimeEnd = this.formatDateTime(this.end);
	var taskLi = document.createElement('li');
	taskLi.className = this.urgentTask ? 'urgent' : 'no-urgent';
	taskLi.innerHTML = `<p>${this.title}</p>
		<p>${this.description}</p>
		<p>${formatedDateTimeStart}</p>
		<p>${formatedDateTimeEnd}</p>`;
	return taskLi;
}

Task.prototype.insertForHtml = function () {
	var tasksInQueueUl = document.getElementById('tasksInQueue');
	var tasksTodayUl = document.getElementById('todayTasks');
	var taskWeekUl = document.getElementById('weekTasks');
	var taskExpiredUl = document.getElementById('expiredTasks');
	if (this.taskInQueue) {
		tasksInQueueUl.appendChild(this.formatTaskForHtml());
	}
	if (this.todayTask) {
		tasksTodayUl.appendChild(this.formatTaskForHtml());
	}
	if (this.weekTask) {
		taskWeekUl.appendChild(this.formatTaskForHtml());
	}
	if (this.expiredTask) {
		taskExpiredUl.appendChild(this.formatTaskForHtml());
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
	this.todayTask = now.getFullYear() === this.start.getFullYear() &&
		now.getDay() === this.start.getDay() &&
		now.getMonth() === this.start.getMonth() &&
		this.end > now ? true : false;
	// console.log("this.todayTask " + this.todayTask);
}
Task.prototype.checkWeekTask = function () {
	var now = new Date();
	now.setMilliseconds(1000 * 60 * 60 * 24 * 7);
	var diff = new Date(now - this.start);
	var days = (+diff / (1000 * 60 * 60 * 24));
	// console.log(days);
	this.weekTask = (days < 7) && (days > 0) ? true : false;
	// console.log("this.weekTask " + this.weekTask);
}
Task.prototype.checkTaskInQueue = function () {
	var now = new Date();
	var diff = new Date(this.end - now);
	var days = (+diff / (1000 * 60 * 60 * 24));
	// console.log(days);
	this.taskInQueue = (days > 0) ? true : false;
	// console.log("this.taskInQueue " + this.taskInQueue);
}
Task.prototype.checkExpiredTask = function () {
	var now = new Date();
	var diff = new Date(this.end - now);
	var days = (+diff / (1000 * 60 * 60 * 24));
	// console.log(days);
	this.expiredTask = (days < 0) || (this.end < now) ? true : false;
	// console.log("this.expiredTask " + this.expiredTask);
}

function correctMonth(item) {
	item++;
	return item;
}