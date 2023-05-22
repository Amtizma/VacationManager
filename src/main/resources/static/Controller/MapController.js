$(document).ready(function() {
var homecity;
var destinationcity;
const locationsarray = [];
const cityarray = [];
const cities = [];
const popupOffsets = {
    top: [0, 0],
    bottom: [0, -50],
    'bottom-right': [0, -70],
    'bottom-left': [0, -70],
    left: [25, -35],
    right: [-25, -35]
}
var coordinates = [];
var coordinates2 = [];
const objectivelist = [];
var objectivenumber = 0;

function addobjective1() {
    let newObjective = document.getElementById("objectivename").value;
    // Check for duplicates
    let isDuplicate = false;
    for (let i = 0; i < objectivelist.length; i++) {
        if (objectivelist[i] === newObjective) {
            isDuplicate = true;
            break;
        }
    }
    // Add new objective if not a duplicate
    if (!isDuplicate) {
        objectivelist.push(newObjective);
        document.getElementById('objectivelistid').innerHTML += '<li id="objectivelistelement">' + newObjective + '<button class="remove-button" onclick = "removeObjective()"></button>' + '</li>';
        objectivenumber++;
    } else {
        alert("Objective already added!");
    }
}

start.min = new Date().toISOString().split("T")[0];
returnDate.min = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

//------------------------------------Remove objective----------------------------------------------
function removeObjective() {
    const buttons = document.querySelectorAll('.remove-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.previousSibling.textContent.trim();
            button.parentNode.remove();
            const index = objectivelist.indexOf(name);
            if (index > -1) {
                objectivelist.splice(index, 1);
            }
        });
    });
}

//--------------------------------------------------------------------------------------------------

// ----------------------------------- calculatetime.js -------------------------------------------
function calculatetime(timeinseconds, distance) {
    if (document.getElementById('transportation').value == 'Car') timeinseconds = ((distance / 1000) / 0.025) / 3600;
    if (document.getElementById('transportation').value == 'Bus') timeinseconds = ((distance / 1000) / 0.0166666667) / 3600;
    if (document.getElementById('transportation').value == 'Plane') timeinseconds = ((distance / 1000) / 0.0055555556) / 3600;
    if (document.getElementById('transportation').value == 'Bike') timeinseconds = ((distance / 1000) / 0.2083333333) / 3600;
    return timeinseconds.toFixed(2);
}

// ------------------------------------------------------------------------------------------------

// ------------------------------------ Clustering ------------------------------------------------
var markersOnTheMap = {};
var eventListenersAdded = false;

var geoJson = {
    type: 'FeatureCollection',
    features: coolLocations.map(function(location) {
        var feature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [location.lng, location.lat]
            },
            properties: {
                id: location.name,
                name: location.name
            }
        };
        return feature;
    })
};

function refreshMarkers() {
    Object.keys(markersOnTheMap).forEach(function(name) {
        markersOnTheMap[name].remove();
        delete markersOnTheMap[name];
    });
    map.querySourceFeatures('point-source').forEach(function(feature) {
        if (feature.properties && !feature.properties.cluster) {
            var name = feature.properties.name;
            if (!markersOnTheMap[name]) {
                var newMarker = new tt.Marker().setLngLat(feature.geometry.coordinates);
                newMarker.addTo(map);
                const popup = new tt.Popup({offset: popupOffsets}).setHTML(feature.properties.name);
                newMarker.setPopup(popup);
                newMarker.getElement().addEventListener('mouseenter', function () {
                    newMarker.togglePopup();
                });
                newMarker.getElement().addEventListener('mouseleave', function () {
                    newMarker.togglePopup();
                });
                newMarker.getElement().addEventListener('click', function () {
                    const city1 = feature.properties.name;
                    document.getElementById('Name1').value = city1;
                });
                markersOnTheMap[name] = newMarker;

            }
        }
    });
}

map.on('load', function() {
    map.addSource('point-source', {
        type: 'geojson',
        data: geoJson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'point-source',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#EC619F',
                4,
                '#008D8D',
                7,
                '#004B7F'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                4,
                20,
                7,
                25
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': 'white',
            'circle-stroke-opacity': 1
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'point-source',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-size': 16
        },
        paint: {
            'text-color': 'white'
        }
    });

    map.on('data', function(e) {
        if (e.sourceId !== 'point-source' || !map.getSource('point-source').loaded()) {
            return;
        }
        refreshMarkers();
        if (!eventListenersAdded) {
            map.on('move', refreshMarkers);
            map.on('moveend', refreshMarkers);
            eventListenersAdded = true;
        }
    });

    map.on('click', 'clusters', function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('point-source').getClusterExpansionZoom(clusterId, function(err, zoom) {
            if (err) {
                return;
            }
            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom + 0.5
            });
            var currentZoom = map.getZoom();
            if (currentZoom <= 14) {
                map.setLayoutProperty('unclustered-point-layer', 'visibility', 'none');
            } else {
                map.setLayoutProperty('unclustered-point-layer', 'visibility', 'visible');
            }
        });
    });
    map.on('mouseenter', 'clusters', function() {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function() {
        map.getCanvas().style.cursor = '';
    });
});
// ----------------------------------- markers.js -------------------------------------------------
function createMarkerElement(type) {
    var element = document.createElement('div');
    var innerElement = document.createElement('div');

    element.className = 'route-marker';
    innerElement.className = 'icon tt-icon -white -' + type;
    element.appendChild(innerElement);
    return element;
}

function addMarkers(feature) {
    var startPoint, endPoint;
    if (feature.geometry.type === 'MultiLineString') {
        startPoint = feature.geometry.coordinates[0][0]; //get first point from first line
        endPoint = feature.geometry.coordinates.slice(-1)[0].slice(-1)[0]; //get last point from last line
    } else {
        startPoint = feature.geometry.coordinates[0];
        endPoint = feature.geometry.coordinates.slice(-1)[0];
    }

    new tt.Marker({element: createMarkerElement('start')}).setLngLat(startPoint).addTo(map);
    new tt.Marker({element: createMarkerElement('finish')}).setLngLat(endPoint).addTo(map);
}

function createMarker(position, color, popupText) {
    var markerElement = document.createElement('div');
    markerElement.className = 'marker';
    var markerContentElement = document.createElement('div');
    markerContentElement.className = 'marker-content';
    markerContentElement.style.backgroundColor = color;
    markerElement.appendChild(markerContentElement);
    var iconElement = document.createElement('div');
    iconElement.className = 'marker-icon';
    iconElement.style.backgroundImage =
        'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKV5WQKc4B2iNyqi3VdsKnbnkmOka-j1GXg&usqp=CAU)';
    markerContentElement.appendChild(iconElement);
    var popup = new tt.Popup({offset: 30}).setText(popupText);
    // add marker to map
    var marker = new tt.Marker({element: markerElement, anchor: 'bottom'})
        .setLngLat(position)
        .setPopup(popup)
        .addTo(map);
    marker.getElement().addEventListener('mouseenter', function () {
        marker.togglePopup();
    });
    marker.getElement().addEventListener('mouseleave', function () {
        marker.togglePopup();
    });
    marker.getElement().addEventListener('click', function () {
        const objective = popupText;
        document.getElementById('objectivename').value = objective;
        resizeTextarea();
    });
    marker.getElement().addEventListener('contextmenu', function (event) {
        event.preventDefault();
        const popupObjectiveName = popupText;
        const googleSearchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(popupObjectiveName + ", " + document.getElementById('Name1').value);
        window.open(googleSearchUrl, '_blank');
    });
}

function createMarkerHotel(position, color, popupText) {
    var markerElement = document.createElement('div');
    markerElement.className = 'marker';
    var markerContentElement = document.createElement('div');
    markerContentElement.className = 'marker-content';
    markerContentElement.style.backgroundColor = color;
    markerElement.appendChild(markerContentElement);
    var iconElement = document.createElement('div');
    iconElement.className = 'marker-icon';
    iconElement.style.backgroundImage =
        'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6zWQytBgNUC-6DZyltLg6zMqemc1f8W0dQ&usqp=CAU)';
    markerContentElement.appendChild(iconElement);
    var popup = new tt.Popup({offset: 30}).setText(popupText);
    // add marker to map
    var marker = new tt.Marker({element: markerElement, anchor: 'bottom'})
        .setLngLat(position)
        .setPopup(popup)
        .addTo(map);
}

// ------------------------------------------------------------------------------------------------
// ----------------------------------- popup.js ---------------------------------------------------
function createPopup(feature, lngLat) {
    function convertToPoint(t) {
        return {point: {latitude: t.lat, longitude: t.lng}}
    }

    function convertToSpeedFormat(t, r) {
        return t + (r || "km/h")
    }

    function formatAsImperialDistance(t) {
        var r = Math.round(1.094 * t);
        return r >= 1760 ? Math.round(r / 17.6) / 100 + " mi" : r + " yd"
    }

    function formatAsMetricDistance(t) {
        var r = Math.round(t);
        return r >= 1e3 ? Math.round(r / 100) / 10 + " km" : r + " m"
    }

    function roundLatLng(t) {
        return Math.round(1e6 * t) / 1e6
    }

    function formatCategoryName(t) {
        var r = t.toLowerCase().replace(/_/g, " ");
        return r.charAt(0).toUpperCase() + r.slice(1)
    }

    var Formatters = {
        convertToPoint: convertToPoint,
        convertToSpeedFormat: convertToSpeedFormat,
        formatAsImperialDistance: formatAsImperialDistance,
        formatAsMetricDistance: formatAsMetricDistance,
        roundLatLng: roundLatLng,
        formatCategoryName: formatCategoryName
    };
    window.Formatters = window.Formatters || Formatters;
    popup = new tt.Popup({className: 'tt-popup', offset: [0, 18]})
        .setLngLat(lngLat)
        .setHTML(
            '<div class="tt-pop-up-container">' +
            '<div class="pop-up-content -small">' +
            '<div class="pop-up-result-address">' +
            'Distance: ' + Formatters.formatAsMetricDistance(feature.lengthInMeters) +
            '</div>' +
            '<div class="pop-up-result-address">' +
            'Estimated travel time: ' +
            calculatetime(feature.travelTimeInSeconds, feature.lengthInMeters) +
            ' hours' +
            '</div>'
        )
        .setMaxWidth('none');
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

// ------------------------------------------------------------------------------------------------

// ----------------------------------- route.js ---------------------------------------------------
function InfoHint(t,e,i){this.type=t,this.position=e,this.duration=i,this.element=this._createElement()}InfoHint.prototype.addTo=function(t){return t.appendChild(this.element),this},InfoHint.prototype.isHidden=function(){return this.element.classList.contains("-hidden")},InfoHint.prototype.hide=function(){this.element.classList.add("-hidden")},InfoHint.prototype.show=function(){this.element.classList.remove("-hidden")},InfoHint.prototype.setErrorMessage=function(t){this.element.innerText=t&&(t.message||t.data.message)||"There was an error.",this._createMessage()},InfoHint.prototype.setMessage=function(t){this.element.innerText=t,this._createMessage()},InfoHint.prototype._createElement=function(){var t=document.createElement("div");return t.setAttribute("class",this._getClassList()),t},InfoHint.prototype._createMessage=function(){this.show(),this.duration&&(this.timeout&&window.clearTimeout(this.timeout),this.duration&&(this.timeout=window.setTimeout(this.hide.bind(this),this.duration)))},InfoHint.prototype._createElement=function(){var t=document.createElement("div");return t.setAttribute("class",this._getClassList()),t},InfoHint.prototype._getClassList=function(){return["tt-info-hint","-hidden","-"+this.position,"-"+this.type].join(" ")},window.infoHint=window.InfoHint||InfoHint;
var infoHint = new InfoHint('info', 'bottom-center').addTo(document.getElementById('map'));
let routeid = 0;

// ------------------------------------------------------------------------------------------------
});