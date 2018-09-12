import Task from './task.js'
export default function Schema(tasksInQueue,
    todayTasks,
    weekTasks,
    expiredTasks) {
    this.tasksInQueue = tasksInQueue;
    this.todayTasks = todayTasks;
    this.weekTasks = weekTasks;
    this.expiredTasks = expiredTasks;
    this.tasksInQueueUl = this.createUl(this.tasksInQueue);
    this.tasksTodayUl = this.createUl(this.todayTasks);
    this.taskWeekUl = this.createUl(this.weekTasks);
    this.taskExpiredUl = this.createUl(this.expiredTasks);
}
Schema.prototype.insertInHtml = function () {
    var div = document.createElement('div');
    div.className = 'virtual';
    div.appendChild(this.tasksInQueueUl);
    div.appendChild(this.tasksTodayUl);
    div.appendChild(this.taskWeekUl);
    div.appendChild(this.taskExpiredUl);
    console.log(div);
    return div;
}
Schema.prototype.createUl = function (item) {
    var ul = document.createElement('ul');
    ul.id = String(item);
    var ulTitle = document.createElement('p');
    ulTitle.textContent = String(item);
    ul.appendChild(ulTitle);
    return ul;
}
Schema.prototype.update = function () {
    this.tasksInQueueUl = this.createUl(this.tasksInQueue);
    this.tasksTodayUl = this.createUl(this.todayTasks);
    this.taskWeekUl = this.createUl(this.weekTasks);
    this.taskExpiredUl = this.createUl(this.expiredTasks);
}
Schema.prototype.cleanElements = function () {
    this.tasksInQueueUl.innerHTML = "";
    this.tasksTodayUl.innerHTML = "";
    this.taskWeekUl.innerHTML = "";
    this.taskExpiredUl.innerHTML = "";
}
Schema.prototype.appendTasks = function (item) {
    // debugger;
    if (item.taskInQueue) {
        var el = new Task(item.title,
            item.description,
            item.urgentTask,
            item.start,
            item.end);
        this.tasksInQueueUl.appendChild(el.taskForHtml);
    }
    if (item.todayTask) {
        var el = new Task(item.title,
            item.description,
            item.urgentTask,
            item.start,
            item.end);
        this.tasksTodayUl.appendChild(el.taskForHtml);
    }
    if (item.weekTask) {
        var el = new Task(item.title,
            item.description,
            item.urgentTask,
            item.start,
            item.end);
        this.taskWeekUl.appendChild(el.taskForHtml);
    }
    if (item.expiredTask) {
        var el = new Task(item.title,
            item.description,
            item.urgentTask,
            item.start,
            item.end);
        this.taskExpiredUl.appendChild(el.taskForHtml);
    }
}