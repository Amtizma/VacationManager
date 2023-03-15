// Salveaza datele introduse de utilizator in form-uri intr-un array
// Parcurge array-ul si completeaza detaliile despre oras in cityList
// Adauga marker pentru hotel si afiseaza traseul pe harta
const listdataarray = [];
listdataarray[0] = document.getElementById('startingcityname').value;
var position = 1;
x = 300;
y=250;
function route(){
x = x +160;
y = y +160;
listdataarray[position] = document.getElementById("Name").value;
listdataarray[position+1] = document.getElementById("start").value + " to " + document.getElementById("return").value;
listdataarray[position+2] = document.getElementById("people").value;
listdataarray[position+3] = document.getElementById("rooms").value;
listdataarray[position+4] = document.getElementById("transportation").value;
listdataarray[position+5] = document.getElementById("hotelname").value;
listdataarray[position+6] = document.getElementById("start").value;
listdataarray[position+7] = document.getElementById("return").value;
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
document.getElementById("return").value = "";
document.getElementById("people").value = "1";
document.getElementById("rooms").value = "";
document.getElementById("transportation").value = "Car";
document.getElementById("hotelname").value = "";
document.getElementById("objectivename").value = "";
objectivelist.length = 0;
}

