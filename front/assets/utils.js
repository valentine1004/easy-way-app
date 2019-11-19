function rad(x) {
    return x * Math.PI / 180;
};

function getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.latitude - p1.latitude);
    var dLong = rad(p2.longitude - p1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

function convertUnixToDate(unix){
    let newDate = new Date(unix*1000);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let date = newDate.getDate();
    return `${year}-${month}-${date}`;
}

function getCurrentDate(){
    let currentData = new Date().getTime() / 1000;
    let fixedCurrentData = new Date(convertUnixToDate(currentData)).getTime() / 1000;

    return fixedCurrentData;
}

export {getDistance, convertUnixToDate, getCurrentDate};
