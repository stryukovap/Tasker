export default function Clock(idElement) {
    var now = new Date();
    this.hours = this.correctFirstZero(now.getHours());
    this.minutes = this.correctFirstZero(now.getMinutes());
    this.seconds = this.correctFirstZero(now.getSeconds());
    this.timeoutId = null;
    this.idElement = idElement;
}
Clock.prototype.correctFirstZero = function (item) {
    if (item < 10) {
        item = `0${item}`;
    };
    return item;
}
Clock.prototype.update = function () {
    var now = new Date();
    this.hours = this.correctFirstZero(now.getHours());
    this.minutes = this.correctFirstZero(now.getMinutes());
    this.seconds = this.correctFirstZero(now.getSeconds());
}
Clock.prototype.startTimer = function () {
    var self = this;
    self.update();
    self.timeoutId = setInterval(function () {
        self.update();
        self.insertTimeForHtml();
    }, 1000);
}
Clock.prototype.stopTimer = function () {
    clearInterval(this.timeoutId);
}
Clock.prototype.formatedTime = function () {
    var formatedTime = `${this.hours}:${this.minutes}:${this.seconds}`;
    return formatedTime;
}
Clock.prototype.insertTimeForHtml = function () {
    var clockDiv = document.getElementById(this.idElement);
    var timeForHtml = `<p>${this.formatedTime()}</p>`;
    clockDiv.innerHTML = timeForHtml;
}
export function correctFirstZero(item) {
    if (item < 10) {
        item = `0${item}`;
    };
    return item;
};