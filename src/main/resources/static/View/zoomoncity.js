function zoomcity() {
    var destinationcity2 = document.getElementById("Name1").value;
    var coordinates22index = locationsarray.indexOf(destinationcity2) + 1;
    coordinates22 = locationsarray[coordinates22index];
    map.flyTo({ center: coordinates22, zoom: 9 });
}
