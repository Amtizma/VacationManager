function createPopup(feature, lngLat) {
    function convertToPoint(t) {
        return { point: { latitude: t.lat, longitude: t.lng } };
    }
    function convertToSpeedFormat(t, r) {
        return t + (r || "km/h");
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
        formatAsImperialDistance: formatAsImperialDistance,
        formatAsMetricDistance: formatAsMetricDistance,
        roundLatLng: roundLatLng,
        formatCategoryName: formatCategoryName,
    };
    window.Formatters = window.Formatters || Formatters;
    popup = new tt.Popup({ className: "tt-popup", offset: [0, 18] })
        .setLngLat(lngLat)
        .setHTML(
            '<div class="tt-pop-up-container">' +
                '<div class="pop-up-content -small">' +
                '<div class="pop-up-result-address">' +
                "Distance: " +
                Formatters.formatAsMetricDistance(feature.lengthInMeters) +
                "</div>" +
                '<div class="pop-up-result-address">' +
                "Estimated travel time: " +
                calculatetime(feature.travelTimeInSeconds, feature.lengthInMeters) +
                " hours" +
                "</div>"
        )
        .setMaxWidth("none");
    popup.addTo(map);
}
function onPopupTrigger(event) {
    infoHint.hide();
    if (popup) {
        popup.remove();
    }
    var feature = JSON.parse(event.features[0].properties.summary);
    createPopup(feature, event.lngLat);
}
