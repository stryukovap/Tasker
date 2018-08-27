import {
	correctFirstZero
} from '/module_clock.js'

export default function Task(title, description, durabilityMinutes) {
	this.title = title;
	this.description = description;
	this.start = this.formatDateTime();
	this.end = this.formatDateTime(this.setEndDateTime(durabilityMinutes));
};
Task.prototype.setEndDateTime = function (durabilityMinutes) {
	var end = new Date();
	end.setMilliseconds(durabilityMinutes * 60 * 1000);
	return end;
};
Task.prototype.formatDateTime = function (date) {
	var now = date ? date : new Date();
	var hours = correctFirstZero(now.getHours());
	var minutes = correctFirstZero(now.getMinutes());
	var seconds = correctFirstZero(now.getSeconds());
	var year = now.getFullYear();
	var month = correctFirstZero(correctMouth(now.getMonth()));
	var day = correctFirstZero(now.getDate());
	return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}
Task.prototype.checkDateAndTimeTask = function () {
	var time = new Date();
	var start = new Date(this.start);
	var end = new Date(this.end);
	return (start < time && end > time) ? true : false;
}

function correctMouth(item) {
	item++;
	return item;
}