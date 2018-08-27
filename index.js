// debugger;
var arrTasks = [{
		id: 1,
		dateStart: "08/16/2018 15:07:00",
		dateEnd: "08/29/2018 19:59:00",
	},
	{
		id: 2,
		dateStart: "08/16/2018 15:07:00",
		dateEnd: "08/17/2018 19:59:00",
	},
	{
		id: 3,
		dateStart: "08/16/2018 15:07:00",
		dateEnd: "08/30/2018 16:43:00",
	}
];

setInterval(function () {
	insertTimeForHtml(getFormatedTimeNow());
	insertStartedTaskForHtml(createArrayStartedTask(arrTasks));
}, 1000);

function correctTime(item) {
	if (item < 10) {
		item = `0${item}`;
	};
	return item;
};

function getFormatedTimeNow() {
	var now = new Date();
	var hours = correctTime(now.getHours());
	var minutes = correctTime(now.getMinutes());
	var seconds = correctTime(now.getSeconds());
	var formatedTime = `${hours}:${minutes}:${seconds}`;
	return formatedTime;
};

function insertTimeForHtml(time) {
	var clockDiv = document.getElementById('clock');
	var timeForHtml = `<h3 style="border:1px solid red; font-size:50px; text-align: center;">${time}</h3>`;
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
		if (checkDateAndTimeTask(item)) {
			arrTasksStarted.push(`<li style=font-size:30px;>Task # ${item.id} Started</li>`);
		};
	});
	return arrTasksStarted;
};

function checkDateAndTimeTask(item) {
	var time = new Date();
	var dateStart = new Date(item.dateStart);
	var dateEnd = new Date(item.dateEnd);
	return (dateStart < time && dateEnd > time) ? true:false;
};