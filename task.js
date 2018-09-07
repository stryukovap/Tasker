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
	this.taskForHtml = this.formatTaskForHtml();
};
Task.prototype.update = function () {
	this.checkTodayTask();
	this.checkWeekTask();
	this.checkTaskInQueue();
	this.checkExpiredTask();
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
}
Task.prototype.checkWeekTask = function () {
	var now = new Date();
	now.setMilliseconds(1000 * 60 * 60 * 24 * 7);
	var diff = new Date(now - this.start);
	var days = (+diff / (1000 * 60 * 60 * 24));
	this.weekTask = (days < 7) && (days > 0) ? true : false;
}
Task.prototype.checkTaskInQueue = function () {
	var now = new Date();
	var diff = new Date(this.end - now);
	var days = (+diff / (1000 * 60 * 60 * 24));
	this.taskInQueue = (days > 0) ? true : false;
}
Task.prototype.checkExpiredTask = function () {
	var now = new Date();
	var diff = new Date(this.end - now);
	var days = (+diff / (1000 * 60 * 60 * 24));
	this.expiredTask = (days < 0) || (this.end < now) ? true : false;
}

function correctMonth(item) {
	item++;
	return item;
}