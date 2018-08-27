export function getFormatedTimeNow() {
    var now = new Date();
    var hours = correctFirstZero(now.getHours());
    var minutes = correctFirstZero(now.getMinutes());
    var seconds = correctFirstZero(now.getSeconds());
    var formatedTime = `${hours}:${minutes}:${seconds}`;
    return formatedTime;
};
export function correctFirstZero(item) {
    if (item < 10) {
        item = `0${item}`;
    };
    return item;
};