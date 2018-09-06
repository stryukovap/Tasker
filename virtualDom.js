import Task from './task.js'
export default function Schema(tasksInQueue,
    todayTasks,
    weekTasks,
    expiredTasks) {
    this.tasksInQueueUl = this.createUl(tasksInQueue);
    this.tasksTodayUl = this.createUl(todayTasks);
    this.taskWeekUl = this.createUl(weekTasks);
    this.taskExpiredUl = this.createUl(expiredTasks);
}
Schema.prototype.insertInHtml = function(){
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
Schema.prototype.cleanElements = function () {
    this.tasksInQueueUl.innerHTML = "";
    this.tasksTodayUl.innerHTML = "";
    this.taskWeekUl.innerHTML = "";
    this.taskExpiredUl.innerHTML = "";
}
Schema.prototype.appendTasks = function (item) {
    // debugger;
        if (item.taskInQueue) {
            this.tasksInQueueUl.appendChild(item.taskForHtml);
        }
        if (item.todayTask) {
            this.tasksTodayUl.appendChild(item.taskForHtml);
        }
        if (item.weekTask) {
            this.taskWeekUl.appendChild(item.taskForHtml);
        }
        if (item.expiredTask) {
            this.taskExpiredUl.appendChild(item.taskForHtml);
        }
}