// Functie care permite afisarea detaliilor despre ruta pe harta
function InfoHint(t, e, i) {
    (this.type = t), (this.position = e), (this.duration = i), (this.element = this._createElement());
}
(InfoHint.prototype.addTo = function (t) {
    return t.appendChild(this.element), this;
}),
    (InfoHint.prototype.isHidden = function () {
        return this.element.classList.contains("-hidden");
    }),
    (InfoHint.prototype.hide = function () {
        this.element.classList.add("-hidden");
    }),
    (InfoHint.prototype.show = function () {
        this.element.classList.remove("-hidden");
    }),
    (InfoHint.prototype.setErrorMessage = function (t) {
        (this.element.innerText = (t && (t.message || t.data.message)) || "There was an error."), this._createMessage();
    }),
    (InfoHint.prototype.setMessage = function (t) {
        (this.element.innerText = t), this._createMessage();
    }),
    (InfoHint.prototype._createElement = function () {
        var t = document.createElement("div");
        return t.setAttribute("class", this._getClassList()), t;
    }),
    (InfoHint.prototype._createMessage = function () {
        this.show(), this.duration && (this.timeout && window.clearTimeout(this.timeout), this.duration && (this.timeout = window.setTimeout(this.hide.bind(this), this.duration)));
    }),
    (InfoHint.prototype._createElement = function () {
        var t = document.createElement("div");
        return t.setAttribute("class", this._getClassList()), t;
    }),
    (InfoHint.prototype._getClassList = function () {
        return ["tt-info-hint", "-hidden", "-" + this.position, "-" + this.type].join(" ");
    }),
    (window.infoHint = window.InfoHint || InfoHint);
var infoHint = new InfoHint("info", "bottom-center").addTo(document.getElementById("map"));

// Functia care adauga ruta pe harta
function addroute() {
    tt.services
        .calculateRoute({
            key: [[${apikey}]],
            traffic: false,
            locations: coordinates[0] + "," + coordinates[1] + ":" + coordinates2[0] + "," + coordinates2[1],
        })
        .then(function (response) {
            var geojson = response.toGeoJson();
            map.addLayer(
                {
                    id: "route" + i,
                    type: "line",
                    source: {
                        type: "geojson",
                        data: geojson,
                    },
                    paint: {
                        "line-color": "#4a90e2",
                        "line-width": 8,
                    },
                },
                findFirstBuildingLayerId()
            );
            map.on("mouseover", "route" + i, onPopupTrigger);
            addMarkers(geojson.features[0]);
            var features = response.toGeoJson().features;
            var bounds = new tt.LngLatBounds();
            var coordinatess = features[0].geometry.coordinates;
            var lngLat = coordinatess[Math.floor(coordinatess.length / 2)];
            var summary = features[0].properties.summary;

            createPopup(summary, lngLat);
            coordinates.forEach(function (point) {
                bounds.extend(tt.LngLat.convert(point));
            });
            geojson.features[0].geometry.coordinates.forEach(function (point) {
                bounds.extend(tt.LngLat.convert(point));
            });
            map.fitBounds(bounds, { duration: 0, padding: 50 });
            infoHint.setMessage("Hover over the route to display a popup with route information");
        });
    i++;
}
