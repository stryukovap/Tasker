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
	this.taskInQueue = this.checkTask();
	this.todayTask = this.checkTask();
	this.weekTask = this.checkTask();
	this.expiredTask = this.checkTask();
};
// Task.prototype.setEndDateTime = function (durabilityMinutes) {
// 	var end = new Date();
// 	end.setMilliseconds(durabilityMinutes * 60 * 1000);
// 	return end;
// };
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
Task.prototype.checkTask = function () {
	var now = new Date();
	// console.log(now);
	var year = now.getFullYear();
	var month = correctFirstZero(correctMonth(now.getMonth()));
	var day = correctFirstZero(now.getDate());
	now = `${month}/${day}/${year}`;
	// console.log(now);
	now = new Date(now);
	// console.log(now);
	var dateStart = new Date(this.start);
	console.log(dateStart);
	var dateStartweek = new Date();
	dateStartweek.setMilliseconds(1000 * 60 * 60 * 24 * 7);
	console.log(dateStartweek);
	var dateEnd = new Date(this.end);
	// console.log(dateEnd);
	this.taskInQueue = (dateStart < now && dateStart != now) ? true : false;
	this.todayTask = (dateStart == now) ? true : false;
	this.weekTask = (dateStart <= dateStartweek && dateStart >= now) ? true : false;
	this.expiredTask = (dateStart < now && dateEnd < now) ? true : false;
}

function correctMonth(item) {
	item++;
	return item;
}