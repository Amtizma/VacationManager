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