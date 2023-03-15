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