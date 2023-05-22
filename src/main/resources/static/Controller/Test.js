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
var homecity;
var destinationcity;
const locationsarray = [];
const cityarray = [];
 var map = tt.map({
   key: [[${apikey}]], // this will be replaced by Thymeleaf at runtime
   container: 'map',
   style: 'tomtom://vector/1/basic-main',
   center: [20, 57.2787],
   zoom: 3
 });
 const popupOffsets = {
 top: [0, 0],
 bottom: [0, -50],
 'bottom-right': [0, -70],
 'bottom-left': [0, -70],
 left: [25, -35],
 right: [-25, -35]
}
var coordinates = new Array();
var coordinates2 = new Array();
const objectivelist = [];
var objectivenumber = 0;
function addobjective1(){
objectivelist[objectivenumber] = document.getElementById("objectivename").value;
objectivenumber++;
}
start.min = new Date().toISOString().split("T")[0];
returnDate.min = new Date( Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
// ----------------------------------- mapinitialization.js ----------------------------------------
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
 // ------------------------------------------------------------------------------------------------

 // ----------------------------------- calculatetime.js -------------------------------------------
 function calculatetime(timeinseconds, distance){
     if(document.getElementById('transportation').value == 'Car') timeinseconds = ((distance/1000) / 0.025) / 3600;
     if(document.getElementById('transportation').value == 'Bus') timeinseconds = ((distance/1000) / 0.0166666667) / 3600;
     if(document.getElementById('transportation').value == 'Plane') timeinseconds = ((distance/1000) / 0.0055555556) / 3600;
     if(document.getElementById('transportation').value == 'Bike') timeinseconds = ((distance/1000) / 0.2083333333) / 3600;
     return timeinseconds.toFixed(2);
 }
 // ------------------------------------------------------------------------------------------------

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
 // ------------------------------------------------------------------------------------------------

 // ----------------------------------- popup.js ---------------------------------------------------
 function createPopup(feature, lngLat) {
 function convertToPoint(t){return{point:{latitude:t.lat,longitude:t.lng}}}function convertToSpeedFormat(t,r){return t+(r||"km/h")}function formatAsImperialDistance(t){var r=Math.round(1.094*t);return r>=1760?Math.round(r/17.6)/100+" mi":r+" yd"}function formatAsMetricDistance(t){var r=Math.round(t);return r>=1e3?Math.round(r/100)/10+" km":r+" m"}function roundLatLng(t){return Math.round(1e6*t)/1e6}function formatCategoryName(t){var r=t.toLowerCase().replace(/_/g," ");return r.charAt(0).toUpperCase()+r.slice(1)}var Formatters={convertToPoint:convertToPoint,convertToSpeedFormat:convertToSpeedFormat,formatAsImperialDistance:formatAsImperialDistance,formatAsMetricDistance:formatAsMetricDistance,roundLatLng:roundLatLng,formatCategoryName:formatCategoryName};window.Formatters=window.Formatters||Formatters;
                popup = new tt.Popup({ className: 'tt-popup', offset: [0, 18] })
                    .setLngLat(lngLat)
                    .setHTML(
                        '<div class="tt-pop-up-container">' +
                            '<div class="pop-up-content -small">' +
                                '<div class="pop-up-result-address">' +
                                    'Distance: ' + Formatters.formatAsMetricDistance(feature.lengthInMeters) +
                                '</div>' +
                                '<div class="pop-up-result-address">' +
                                     'Estimated travel time: ' +
                                      calculatetime(feature.travelTimeInSeconds, feature.lengthInMeters)+
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
 function addroute(){
            tt.services.calculateRoute({
                key: [[${apikey}]],
                traffic: false,
                locations: coordinates[0]+ ',' + coordinates[1] + ':' + coordinates2[0] + ',' + coordinates2[1]
            })
                .then(function(response) {
                    var geojson = response.toGeoJson();
                    map.addLayer({
                        'id': 'route' + i,
                        'type': 'line',
                        'source': {
                            'type': 'geojson',
                            'data': geojson
                        },
                        'paint': {
                            'line-color': '#4a90e2',
                            'line-width': 8
                        }
                    }, findFirstBuildingLayerId());
                     map.on('mouseover', 'route' + i, onPopupTrigger);
                    addMarkers(geojson.features[0]);
                    var features = response.toGeoJson().features;
                    var bounds = new tt.LngLatBounds();
                    var coordinatess = features[0].geometry.coordinates;
                        var lngLat = coordinatess[Math.floor(coordinatess.length / 2)];
                        var summary = features[0].properties.summary;

                        createPopup(summary, lngLat);
                        coordinates.forEach(function(point) {
                            bounds.extend(tt.LngLat.convert(point));
                        });
                    geojson.features[0].geometry.coordinates.forEach(function(point) {
                        bounds.extend(tt.LngLat.convert(point));
                    });
                    map.fitBounds(bounds, { duration: 0, padding: 50 });
                    infoHint.setMessage('Hover over the route to display a popup with route information');
                });
                i++;
}
 // ------------------------------------------------------------------------------------------------

 // ----------------------------------- menubutton.js ----------------------------------------------
 var menucounter = 1;
 function menubutton(){
     if(menucounter%2 == 1){
      document.getElementById("form").style.display="flex";
      document.getElementById("citylist").style.display="inline-block";
     document.getElementById("mySidepanel").style.display="block";
     document.getElementById("mySidepanel").style.backgroundImage="linear-gradient(#000, #000)";
     document.getElementById("mySidepanel").style.borderRight="1px solid";
     document.getElementById("mySidepanel").style.borderTop="1px solid";
     document.getElementById("mySidepanel").style.display="block";
     }
     if(menucounter%2 == 0){
           document.getElementById("form").style.display="none";
       document.getElementById("citylist").style.display="none";
          document.getElementById("mySidepanel").style.borderRight="none";
          document.getElementById("mySidepanel").style.backgroundImage="none";
     document.getElementById("mySidepanel").style.borderTop="none";
     document.getElementById("mySidepanel").style.display="none";
 }
     menucounter++;

 }
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- addcity.js -------------------------------------------------

   const listdataarray = [];
   listdataarray[0] = document.getElementById('startingcityname').value;
   var position = 1;
   x = 300;
   y=250;
   function route(){
   x = x +160;
   y = y +160;
   listdataarray[position] = document.getElementById("Name").value;
   listdataarray[position+1] = document.getElementById("start").value + " to " + document.getElementById("returnDate").value;
   listdataarray[position+2] = document.getElementById("people").value;
   listdataarray[position+3] = document.getElementById("rooms").value;
   listdataarray[position+4] = document.getElementById("transportation").value;
   listdataarray[position+5] = document.getElementById("hotelname").value;
   listdataarray[position+6] = document.getElementById("start").value;
   listdataarray[position+7] = document.getElementById("returnDate").value;
   var value = 5;
    if(cityarray[cityarray.length-1] == homecity) value = 10;
    if(value == 5) {
    document.getElementById('citylist').innerHTML += '<li id = "listelement" onclick = fillform(this)>' +destinationcity+ '</li>';
    document.getElementById('citylist').innerHTML += '<li class = "listdetails">' +listdataarray[position+1] + '</li>';
    document.getElementById('citylist').innerHTML += '<li class = "listdetails">' + "Hotel name: " + listdataarray[position+5] + '</li>';
    document.getElementById('citylist').innerHTML += '<li class = "listdetails">' +"People: " + listdataarray[position+2] + " | " + "Rooms: " + listdataarray[position+3] + '</li>';
    document.getElementById('citylist').innerHTML += '<li class = "listdetails">' + "Mode of transport: " + listdataarray[position+4]+ '</li>';
    for(let i = 1; i <= objectivelist.length; i++){
    document.getElementById('citylist').innerHTML += '<li class = "listdetails">' + "Objective " + i + " : " + objectivelist[i]+ '</li>';
   }
    position = position + 8;
    }
    else alert("The city is already on the trip!");
   var coordinatesindex = locationsarray.indexOf(homecity)+1;
   var coordinates2index =locationsarray.indexOf(destinationcity)+1;
   coordinates = locationsarray[coordinatesindex];
   coordinates2 = locationsarray[coordinates2index];
   for(let i = 0; i < hotelscoordinates.length; i = i +3){
       if(hotelscoordinates[i] == document.getElementById('hotelname').value) {
       var hotelcd = [];
       hotelcd[1] = hotelscoordinates[i+1];
       hotelcd[0] = hotelscoordinates[i+2];
       createMarkerHotel(hotelcd, '#FF0000', hotelscoordinates[i]);
       console.log(hotelcd);
       }
   };
   addroute();
     document.getElementById("mySidepanel").style.display="none";
     document.getElementById("mySidepanelCity").style.borderBottom="1px solid";
     document.getElementById("savetopdf").style.marginTop= x + "px";
     document.getElementById("showdetails").style.marginTop= y + "px";

   homecity = locationsarray[coordinates2index-1];
   document.getElementById("Name").value = "";
   document.getElementById("start").value = "";
   document.getElementById("returnDate").value = "";
   document.getElementById("people").value = "1";
   document.getElementById("rooms").value = "";
   document.getElementById("transportation").value = "Car";
   document.getElementById("hotelname").value = "";
   document.getElementById("objectivename").value = "";
   objectivelist.length = 0;
   }
  // ------------------------------------------------------------------------------------------------


  // ----------------------------------- fillform.js ------------------------------------------------
var updatename;
function fillform(e){
var name = e.textContent;
updatename = name;
document.getElementById("update").style.display="block";
for(let i = 0; i < listdataarray.length; i++){
    if(listdataarray[i] == name) {
   document.getElementById("start").value = listdataarray[i+6];
   document.getElementById("returnDate").value = listdataarray[i+7];
    document.getElementById("people").value = listdataarray[i+2];
document.getElementById("rooms").value =listdataarray[i+3];
document.getElementById("transportation").value =listdataarray[i+4];
document.getElementById("hotelname").value = listdataarray[i+5];
    }
}
}
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- updatecity.js ----------------------------------------------
function updatecity(){
    document.getElementById("citylist").innerHTML = "";
    for(let i=0; i< listdataarray.length; i++){
        if(listdataarray[i] == updatename){
        listdataarray[i+1] = document.getElementById("start").value + " to " + document.getElementById("returnDate").value;
        listdataarray[i+2] = document.getElementById("people").value;
        listdataarray[i+3] = document.getElementById("rooms").value;
        listdataarray[i+4] = document.getElementById("transportation").value;
        listdataarray[i+5] = document.getElementById("hotelname").value;
        listdataarray[i+6] = document.getElementById("start").value;
        listdataarray[i+7] = document.getElementById("returnDate").value;
        }
    }
     document.getElementById('citylist').innerHTML += '<li id = "listelement">' +listdataarray[0]+ '</li>';
    for(let i=1; i< listdataarray.length; i=i+8){
     document.getElementById('citylist').innerHTML += '<li id = "listelement" onclick = fillform(this)>' +listdataarray[i]+ '</li>';
     document.getElementById('citylist').innerHTML += '<li class = "listdetails">' +listdataarray[i+1] + '</li>';
     document.getElementById('citylist').innerHTML += '<li class = "listdetails">' + "Hotel name: " + listdataarray[i+5] + '</li>';
     document.getElementById('citylist').innerHTML += '<li class = "listdetails">' +"People: " + listdataarray[i+2] + " | " + "Rooms: " + listdataarray[i+3] + '</li>';
     document.getElementById('citylist').innerHTML += '<li class = "listdetails">' + "Mode of transport: " + listdataarray[i+4]+ '</li>';
     }
     document.getElementById("update").style.display="none";
     document.getElementById("Name").value = "";
document.getElementById("start").value = "";
document.getElementById("returnDate").value = "";
document.getElementById("people").value = "1";
document.getElementById("rooms").value = "";
document.getElementById("transportation").value = "Car";
document.getElementById("hotelname").value = "";
document.getElementById("objectivename").value = "";
}

  // ------------------------------------------------------------------------------------------------
  // ----------------------------------- addtrip.js -------------------------------------------------
function addtrip(){
objectivenumber = 0;
zoomcity();
 cityarray.push(document.getElementById('Name1').value);
 document.getElementById("form").style.display="flex";
 document.getElementById("citylist").style.display="inline-block";
 document.getElementById("mySidepanel").style.display="block";
 destinationcity = document.getElementById('Name1').value;
  document.getElementById("Name").value = destinationcity;
  const locationsarray2 = [];
function saveapi(response){
const apiresponse = response;
var data = JSON.stringify(apiresponse);
var values = data.split(":");
var coord = "123";
var name = "123";
for(let i = 0; i < values.length; i++){
if(values[i] == "\"Point\",\"coordinates\"") coord = values[i+1].substring(1, values[i+1].lastIndexOf("]"));
if(values[i]== "{\"xid\"") name = values[i+2].substring(1, values[i+2].lastIndexOf(",")-1);
if(values[i] =="{\"type\"") locationsarray2.push(coord, name);
}
locationsarray2.shift();
locationsarray2.shift();
locationsarray2.shift();
locationsarray2.shift();
for(let i = 0; i < locationsarray2.length; i= i+2){
const splitter = locationsarray2[i].split(",");
const array = [];
array.push(splitter[0]);
array.push(splitter[1]);
 createMarker(array, '#5327c3', locationsarray2[i+1]);
}
}
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1fb99e2302msh01a84d95d59109cp1cc453jsn32731c716e00',
		'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
	}
};
var destinationcity2 = document.getElementById('Name1').value;
var coordinates22index =locationsarray.indexOf(destinationcity2)+1;
coordinates22 = locationsarray[coordinates22index];
fetch('https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?lat='+coordinates22[1]+'&lon='+coordinates22[0]+'&radius=10000&rate=3&kinds=museums%2Cmonuments%2Chistoric', options)
	.then(response => response.json())
	.then(data => saveapi(data))
	.catch(err => console.error(err));
}
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- searchhotel.js ----------------------------------------------
const hotelscoordinates = [];
 function toggleTable(){
 if(!document.getElementById("rooms").value.startsWith("0")  && document.getElementById("rooms").value !== ""){
  if(document.getElementById("start").value<document.getElementById("returnDate").value){
    if(!document.getElementById("people").value.startsWith("0") && document.getElementById("people").value !== ""){
 document.getElementById("myList").innerHTML = "";
  document.getElementById("myList").style.display="block";
  document.getElementById('citylist').style.display="none";
   document.getElementById("form").style.display="none";
   document.getElementById("mySidepanel").style.backgroundImage="none";
   document.getElementById("savetopdf").style.display="none";
   document.getElementById("showdetails").style.display="none";
const hotelsarray = [];
function savehotels(response){
const apiresponse = response;
var data = JSON.stringify(apiresponse);
var values = data.split("\"");
var url = "";
var hotel_name = "";
var latitude = "";
var longitude = "";
var gross_price= "";
var main_photo_url= "";
for(let i = 0; i < values.length; i++){
if (values[i] == "url") url = values[i+2];
if (values[i] =="hotel_name") hotel_name = values[i+2];
if (values[i] == "latitude") latitude = values[i+1].substring(1).replace(',',' ');
if (values[i] == "longitude") longitude = values[i+1].substring(1).replace(',',' ');
if (values[i] == "gross_amount_hotel_currency" && values[i+1]==":{" && values[i+2] == "value") gross_price = values[i+3].substring(1).replace('}',' ').replace(',',' ');
if (values[i] == "gross_amount_hotel_currency" && values[i+1] == ":{" && values[i+2] == "currency" && values[i+3] == ":" && values[i+4] == "EUR" && values[i+5] == "," && values[i+6] == "value") gross_price = values[i+7].substring(1).replace('}',' ').replace(',',' ');
if (values[i] == "max_photo_url") main_photo_url = values[i+2];
if (values[i] =="max_1440_photo_url") hotelsarray.push(url, hotel_name, latitude, longitude, gross_price, main_photo_url);
if (values[i] =="max_1440_photo_url") hotelscoordinates.push(hotel_name, latitude, longitude);
}
for(let i = 0; i < hotelsarray.length; i = i+6){
document.getElementById('myList').innerHTML += '<li id = "hname" onclick="gethotel(this)">' + hotelsarray[i+1] + '</li>';
document.getElementById('myList').innerHTML += '<li id = "hname" ><a href="' + hotelsarray[i] + '"/>' + "Link"  +'</a>' +'</li>';
document.getElementById('myList').innerHTML += '<li id = "hname">' + hotelsarray[i+4] + "€"+ '</li>';
document.getElementById('myList').innerHTML += '<li id = "himage"><img src=' + hotelsarray[i+5] + 'width="460" height="400"'+ '</li>';
};
}
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1fb99e2302msh01a84d95d59109cp1cc453jsn32731c716e00',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
};
var destinationcity2 = document.getElementById('Name1').value;
var coordinates22index =locationsarray.indexOf(destinationcity2)+1;
coordinates22 = locationsarray[coordinates22index];
var adults_number = document.getElementById('people').value;
var checkout_date = document.getElementById('returnDate').value;
var checkin_date = document.getElementById('start').value;
var room_number = document.getElementById('rooms').value;
fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude='+coordinates22[0]+'&locale=en-gb&adults_number=' + adults_number +'&filter_by_currency=EUR&checkout_date=' + checkout_date + '&units=metric&latitude=' + coordinates22[1] +'&order_by=popularity&room_number=' + room_number + '&checkin_date=' + checkin_date +'&include_adjacency=true', options)
	.then(response => response.json())
	.then(data => savehotels(data))
	.catch(err => console.error(err));
	}
	else {
        	alert("Incorrect value for people label!");
        	}
	}
	else {
    	alert("The return date must be after start date!");
    	}
	}
	else {
	alert("Incorrect value for rooms label!");
	}
	}
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- misc.js ----------------------------------------------------
  function isMobileOrTablet(){var i,a=!1;return i=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)))&&(a=!0),a}window.isMobileOrTablet=window.isMobileOrTablet||isMobileOrTablet;
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- gethotel.js ------------------------------------------------
function gethotel(e){
 var name = e.textContent;
 document.getElementById('hotelname').value = name;
document.getElementById("form").style.display="flex";
 document.getElementById("citylist").style.display="inline-block";
document.getElementById("myList").style.display="none";
 document.getElementById("mySidepanel").style.backgroundImage="linear-gradient(#000, #000)";
 document.getElementById("savetopdf").style.display="block";
 document.getElementById("showdetails").style.display="block";
}
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- togglemap.js -----------------------------------------------
function togglemap(){
document.getElementById('start').valueAsDate = new Date();
document.getElementById('returnDate').valueAsDate = new Date();
document.getElementById("startform").style.display="none";
document.getElementById("mySidepanel").style.display="none";
document.getElementById("mySidepanelCity").style.display="block";
document.getElementById("map").style.display="block";
document.getElementById("menubutton").style.display="block";
map.resize();
document.getElementById("citynamesform").style.display="block";
homecity = document.getElementById("startingcityname").value;
document.getElementById('citylist').innerHTML += '<li id = "listelement">' + homecity + '</li>';
}
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- zoomoncity.js ----------------------------------------------
function zoomcity(){
var destinationcity2 = document.getElementById('Name1').value;
var coordinates22index =locationsarray.indexOf(destinationcity2)+1;
coordinates22 = locationsarray[coordinates22index];
map.flyTo({center: coordinates22, zoom: 9});
}
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- savetopdf.js -----------------------------------------------
  function savetopdf(){
  document.getElementById("mySidepanel").style.display="block";
  document.getElementById("mySidepanel").style.borderTop="none";
  document.getElementById("mySidepanel").style.borderRight="none";
  document.getElementById("mySidepanel").style.backgroundImage="none";
  document.getElementById("mySidepanelCity").style.display="none";
  document.getElementById("map").style.display="none";
  document.getElementById("menubutton").style.display="none";
  document.getElementById("form").style.display="none";
  document.getElementById("savetopdf").style.display="none";
  document.getElementById("showdetails").style.display="none";
  window.print();
  document.getElementById("map").style.display="block";
  map.resize();
  document.getElementById("showdetails").style.display="inline-block";
  document.getElementById("savetopdf").style.display="inline-block";
  document.getElementById("mySidepanel").style.display="block";
  document.getElementById("mySidepanel").style.borderRight="1px solid";
  document.getElementById("mySidepanel").style.borderTop="1px solid";
  document.getElementById("mySidepanel").style.backgroundImage="linear-gradient(#000, #000)";
  document.getElementById("mySidepanelCity").style.display="block";
  document.getElementById("menubutton").style.display="block";
  document.getElementById("form").style.display="flex";
  }
  // ------------------------------------------------------------------------------------------------
  // ----------------------------------- showdetails.js ---------------------------------------------
var detailscounter=1;
function showdetails(){
var listelements = document.getElementsByClassName("listdetails");
 if(detailscounter%2 == 1){
    for(var i=0, len=listelements.length; i<len; i++)
    {
        listelements[i].style["display"] = "block";
    }
    }
 if(detailscounter%2 ==0){
for(var i=0, len=listelements.length; i<len; i++)
    {
        listelements[i].style["display"] = "none";
    }
}
detailscounter++;
}
  // ------------------------------------------------------------------------------------------------

  // ----------------------------------- interactivemapPOI.js ---------------------------------------
  function formatCategoryName(t){var r=t.toLowerCase().replace(/_/g," ");return r.charAt(0).toUpperCase()+r.slice(1)}var Formatters1={formatCategoryName:formatCategoryName};window.Formatters1=window.Formatters1||Formatters1;
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
  // ------------------------------------------------------------------------------------------------

