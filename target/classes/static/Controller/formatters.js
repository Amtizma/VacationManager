function convertToPoint(t) {
    return { point: { latitude: t.lat, longitude: t.lng } };
}
function convertToSpeedFormat(t, r) {
    return t + (r || "km/h");
}
function formatToDurationTimeString(t) {
    var r = moment.utc(1e3 * t);
    if (t > 86400) {
        var o = (function (t) {
            return { days: Math.floor(t / 86400), rest: t % 86400 };
        })(t);
        return o.days + (1 === o.days ? " day " : " days ") + moment.utc(1e3 * o.rest).format("h [h] m [m]");
    }
    return t > 3600 ? r.format("H [h] m [m] s [s]") : t > 60 ? r.format("m [m] s [s]") : t > 0 ? r.format("s [s]") : "No delay";
}
function formatToShortDurationTimeString(t) {
    var r = moment.duration(t, "seconds");
    return t > 3600 ? r.format("h [h] m [m]") : t > 60 ? r.format("m [m]") : "No delay";
}
function formatToTimeString(t) {
    return moment(t).format("HH:mm:ss");
}
function formatToDateString(t) {
    return moment(t).format("DD/MM/YYYY");
}
function formatToShortenedTimeString(t) {
    return moment(t).format("h:mm a");
}
function dateTimeStringToObject(t, r) {
    if (!t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)) throw new TypeError("Wrong date format provided. It needs to follow dd/mm/yyyy pattern.");
    return moment(t + r, "DD/MM/YYYYh:mm A").toDate();
}
function dateStringToObject(t) {
    return moment(t, "YYYY-MM-DD").toDate();
}
function formatToDateWithFullMonth(t) {
    return moment(t).format("MMMM D, YYYY");
}
function formatToExpandedDateTimeString(t) {
    return moment(t).format("dddd, MMM D, HH:mm:ss");
}
function formatToDateTimeString(t) {
    return moment(t).format("MMM D, HH:mm:ss");
}
function formatToDateTimeStringForTrafficIncidents(t) {
    return moment(t).format("YYYY-MM-DD HH:mm");
}
function formatAsImperialDistance(t) {
    var r = Math.round(1.094 * t);
    return r >= 1760 ? Math.round(r / 17.6) / 100 + " mi" : r + " yd";
}
function formatAsMetricDistance(t) {
    var r = Math.round(t);
    return r >= 1e3 ? Math.round(r / 100) / 10 + " km" : r + " m";
}
function roundLatLng(t) {
    return Math.round(1e6 * t) / 1e6;
}
function formatCategoryName(t) {
    var r = t.toLowerCase().replace(/_/g, " ");
    return r.charAt(0).toUpperCase() + r.slice(1);
}
var Formatters = {
    convertToPoint: convertToPoint,
    convertToSpeedFormat: convertToSpeedFormat,
    formatToDurationTimeString: formatToDurationTimeString,
    formatToShortDurationTimeString: formatToShortDurationTimeString,
    formatToTimeString: formatToTimeString,
    formatToExpandedDateTimeString: formatToExpandedDateTimeString,
    formatAsImperialDistance: formatAsImperialDistance,
    formatAsMetricDistance: formatAsMetricDistance,
    roundLatLng: roundLatLng,
    formatToDateString: formatToDateString,
    formatToShortenedTimeString: formatToShortenedTimeString,
    dateTimeStringToObject: dateTimeStringToObject,
    dateStringToObject: dateStringToObject,
    formatToDateWithFullMonth: formatToDateWithFullMonth,
    formatCategoryName: formatCategoryName,
    formatToDateTimeString: formatToDateTimeString,
    formatToDateTimeStringForTrafficIncidents: formatToDateTimeStringForTrafficIncidents,
};
window.Formatters = window.Formatters || Formatters;
