// placeholder for data that will be filled in by Thymeleaf
const coolLocations = /*[[${coolLocations}]]*/ null;
coolLocations.forEach(location => {
 const marker = new tt.Marker().setLngLat(location.lnglat).addTo(map);
 const popup = new tt.Popup({offset: popupOffsets}).setHTML(location.description);
 marker.setPopup(popup).togglePopup();
locationsarray.push(location.description, location.lnglat);
const hotelsList = /*[[${hotelList}]]*/ null;
 marker.getElement().addEventListener('click', function () {
 const city1 = location.description;
 document.getElementById('Name1').value = city1;
  });
});
 map.addControl(new tt.FullscreenControl());
 map.addControl(new tt.NavigationControl());