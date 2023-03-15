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

            new tt.Marker({ element: createMarkerElement('start') }).setLngLat(startPoint).addTo(map);
            new tt.Marker({ element: createMarkerElement('finish') }).setLngLat(endPoint).addTo(map);
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
     marker.getElement().addEventListener('mouseenter', function () {marker.togglePopup();});
     marker.getElement().addEventListener('mouseleave', function () {marker.togglePopup();});
     marker.getElement().addEventListener('click', function () {const objective = popupText;document.getElementById('objectivename').value = objective;});
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

