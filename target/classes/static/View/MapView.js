// Permite ca doar cifre sa fie scrise in inputurile cu ID-urile #people si #rooms.
$(document).ready(function() {
  $('#people').on('input', function() {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
  });
});
$(document).ready(function() {
  $('#rooms').on('input', function() {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
  });
});


function togglemap() {
    document.getElementById("startform").style.display = "none";
    document.getElementById("mySidepanel").style.display = "none";
    document.getElementById("mySidepanelCity").style.display = "block";
    document.getElementById("map").style.display = "block";
    document.getElementById("menubutton").style.display = "block";
    map.resize();
    document.getElementById("citynamesform").style.display = "block";
    homecity = document.getElementById("startingcityname").value;
    document.getElementById("citylist").innerHTML += '<li id = "listelement">' + homecity + "</li>";
}


// Functie pentru POI interactive
function formatCategoryName(t) {
    var r = t.toLowerCase().replace(/_/g, " ");
    return r.charAt(0).toUpperCase() + r.slice(1);
}
    var Formatters1 = { formatCategoryName: formatCategoryName };
    window.Formatters1 = window.Formatters1 || Formatters1;
    var popup = null;
        var hoveredFeature = null;

        map.on('load', function() {
            bindMapEvents();
        });

        function bindMapEvents() {
            map.on('click', function(event) {
                var feature = map.queryRenderedFeatures(event.point)[0];

                hidePoiMarker();

                if (feature.sourceLayer === 'Point of Interest') {
                    map.addLayer({
                        'id': 'selectedPoi',
                        'source': {
                            'type': 'geojson',
                            'data': {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': feature.geometry.coordinates
                                }
                            }
                        },
                        'type': 'symbol',
                        'paint': {
                            'text-color': 'rgba(0, 0, 0, 1)',
                            'text-halo-color': 'rgba(255, 255, 255, 1)',
                            'text-halo-width': 1
                        },
                        'layout': {
                            'text-field': feature.properties.name || feature.properties.description,
                            'icon-image': `${feature.properties.icon}_pin`,
                            'icon-anchor': 'bottom',
                            'text-letter-spacing': 0.1,
                            'icon-padding': 5,
                            'icon-offset': [0, 5],
                            'text-max-width': 10,
                            'text-variable-anchor': ['top'],
                            'text-font': ['Noto-Bold'],
                            'text-size': 14,
                            'text-radial-offset': 0.2
                        }
                    });
                }
            });

            map.on('mouseenter', 'POI', function(event) {
                map.getCanvas().style.cursor = 'pointer';
                var feature = map.queryRenderedFeatures(event.point)[0];

                createPopup1(feature);
                hoveredFeature = feature;

                map.setFeatureState(feature, { hover: true });
            });

            map.on('mouseleave', 'POI', function(event) {
                map.getCanvas().style.cursor = '';

                if (hoveredFeature) {
                    map.setFeatureState(hoveredFeature, { hover: false });
                }

                hoveredFeature = null;

                if (!event.originalEvent.relatedTarget) {
                    removePopup();
                }
            });

            map.on('click', 'POI', function(event) {
                map.getCanvas().style.cursor = '';

                if (hoveredFeature) {
                    map.setFeatureState(hoveredFeature, { hover: false });
                }

                hoveredFeature = null;

                if (!event.originalEvent.relatedTarget) {
                    removePopup();
                }
            });
        }

        function createPopup1(result) {
            var markerSize = 10;
            removePopup();

            var popupOffset = {
                'top': [0, markerSize],
                'top-left': [0, markerSize],
                'top-right': [0, markerSize],
                'bottom': [0, -markerSize],
                'bottom-left': [0, -markerSize],
                'bottom-right': [0, -markerSize],
                'left': [markerSize, -markerSize],
                'right': [-markerSize, -markerSize]
            };

            var htmlContent = document.createElement('div');

            htmlContent.innerHTML = '<div class="popup-container">' +
                '<div class="category">' +
                    Formatters1.formatCategoryName(result.properties.category) +
                '</div>' +
                '<div class="name">' + result.properties.name + '</div>' +
            '</div>';

            popup = new tt.Popup({ offset: popupOffset })
                .setLngLat(result.geometry.coordinates)
                .setDOMContent(htmlContent)
                .addTo(map)
                .setMaxWidth('200px');

            htmlContent.addEventListener('mouseleave', function() {
                removePopup();
            });
        }

        function removePopup() {
            if (popup) {
                popup.remove();
                popup = null;
            }
        }

        function hidePoiMarker() {
            if (map.getLayer('selectedPoi')) {
                map.removeLayer('selectedPoi');
                map.removeSource('selectedPoi');
            }
        }

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

function zoomcity() {
    var destinationcity2 = document.getElementById("Name1").value;
    var coordinates22index = locationsarray.indexOf(destinationcity2) + 1;
    coordinates22 = locationsarray[coordinates22index];
    map.flyTo({ center: coordinates22, zoom: 9 });
}
