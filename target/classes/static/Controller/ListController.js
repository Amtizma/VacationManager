$(document).ready(function() {
// ----------------------------------- Buton done -------------------------------------------------
let tripDetails = [];
function doneObjectives(){
    document.getElementById("objectives").style.display = "none";
    document.getElementById("preview").style.display = "block";
    document.getElementById("previewlist").innerHTML += '<li class = "previewcityname">' + document.getElementById("Name1").value + '</li>';
    document.getElementById("previewlist").innerHTML += '<li class = "previewhotelname">' + hotelname + '</li>';
    document.getElementById("previewlist").innerHTML += '<li class = "previewdate">' + document.getElementById("start").value + " to " + document.getElementById("returnDate").value + '</li>';
    document.getElementById("previewlist").innerHTML += '<li class = "previewpeopleandrooms">'+ document.getElementById("people").value + " people <img id = \"roomsnumber\" src=\"https://cdn-icons-png.flaticon.com/512/1422/1422872.png\"> "+document.getElementById("rooms").value + " room(s) " + '</li>';
    document.getElementById("previewlist").innerHTML += '<li class = "previewtransportation">' + document.getElementById("transportation").value + '</li>';
    const sourceList = document.getElementById("objectivelistid");
    const targetList = document.getElementById("previewlist");
    const listItems = Array.from(sourceList.getElementsByTagName("li"));
    listItems.forEach(item => {
        const newItem = document.createElement("li");
        newItem.textContent = item.textContent;
        newItem.classList.add("previewobjectives");
        targetList.appendChild(newItem);
    });

}
// ------------------------------------------------------------------------------------------------

// ----------------------------------- Cancel function --------------------------------------------
function cancel(){
    document.getElementById("Name1").value = "";
    document.getElementById("start").value = new Date();
    document.getElementById("returnDate").value = new Date();
    document.getElementById("people").value = "1";
    document.getElementById("rooms").value = "1";
    document.getElementById("objectivename").value = "";
    hotelname = "";
    const list = document.getElementById("objectivelistid");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    const list1 = document.getElementById("previewlist");
    while (list1.firstChild) {
        list1.removeChild(list1.firstChild);
    }
    document.getElementById("preview").style.display = "none";
    document.getElementById("hotelData").style.display = "block";
    document.getElementById("mySidepanel").style.display = "none";


}
// ------------------------------------------------------------------------------------------------


// ----------------------------------- menubutton.js ----------------------------------------------
var menucounter = 1;

function menubutton() {
    if (menucounter % 2 == 1) {
        document.getElementById("mySidepanel").style.display = "block";
    }
    if (menucounter % 2 == 0) {
        document.getElementById("mySidepanel").style.display = "none";
    }
    menucounter++;

}

// ------------------------------------------------------------------------------------------------

// ----------------------------------- addcity.js -------------------------------------------------

const listdataarray = [];
listdataarray[0] = document.getElementById('startingcityname').value;
var position = 1;
var hotelcd = [];
function route() {
    document.getElementById("mySidepanel").style.display = "none";
    document.getElementById("listData").style.display = "block";
    document.getElementById("detailslist").innerHTML += '<li class="detailscityname">' + document.getElementById("Name1").value + '<button class="hideButton" onclick = "hideElements(this)" ></button><button class="showButton" onclick = "showElements(this)"></button></li>';
    document.getElementById("detailslist").innerHTML += '<li class = "detailshotel">' + hotelname + '</li>';
    document.getElementById("detailslist").innerHTML += '<li class = "detailsdate">' + document.getElementById("start").value + " to " + document.getElementById("returnDate").value + '</li>';
    document.getElementById("detailslist").innerHTML += '<li class = "detailspeopleandrooms">'+ document.getElementById("people").value + " people <img id = \"roomsnumberdetails\" src=\"https://cdn-icons-png.flaticon.com/512/1422/1422872.png\"> "+document.getElementById("rooms").value + " room(s) " + '</li>';
    document.getElementById("detailslist").innerHTML += '<li class = "detailstransportation">' + document.getElementById("transportation").value + '</li>';
    const sourceList = document.getElementById("objectivelistid");
    const targetList = document.getElementById("detailslist");
    const listItems = Array.from(sourceList.getElementsByTagName("li"));
    listItems.forEach(item => {
        const newItem = document.createElement("li");
        newItem.textContent = item.textContent;
        newItem.classList.add("detailsobjectives");
        targetList.appendChild(newItem);
    });
    var coordinatesindex = locationsarray.indexOf(homecity) + 1;
    var coordinates2index = locationsarray.indexOf(destinationcity) + 1;
    coordinates = locationsarray[coordinatesindex];
    coordinates2 = locationsarray[coordinates2index];
    for (let i = 0; i < hotelscoordinates.length; i = i + 3) {
        if (hotelscoordinates[i] === hotelname) {
            hotelcd = [];
            hotelcd[1] = hotelscoordinates[i + 1];
            hotelcd[0] = hotelscoordinates[i + 2];
            createMarkerHotel(hotelcd, '#FF0000', hotelscoordinates[i]);
            console.log(hotelcd);
        }
    }
    addroute();
    cancel();
}
// ------------------------------------------------------------------------------------------------

// ----------------------------------- Hide button -----------------------------------------------
function hideElements(clickedButton) {
    const hideButtons = document.querySelectorAll('.hideButton');
    hideButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Find the next detailscityname element
            let nextCityName = this.parentNode.nextElementSibling;
            while (nextCityName && !nextCityName.classList.contains('detailscityname')) {
                nextCityName = nextCityName.nextElementSibling;
            }
            // Hide all elements in between
            let currentElement = this.parentNode.nextElementSibling;
            while (currentElement && currentElement !== nextCityName) {
                currentElement.style.display = 'none';
                currentElement = currentElement.nextElementSibling;
            }
        });
    });
    clickedButton.style.display = 'none';
    const showButton = clickedButton.nextElementSibling;
    showButton.style.display = 'inline-block';
}

function showElements(clickedButton){
    const hideButtons = document.querySelectorAll('.showButton');
    hideButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Find the next detailscityname element
            let nextCityName = this.parentNode.nextElementSibling;
            while (nextCityName && !nextCityName.classList.contains('detailscityname')) {
                nextCityName = nextCityName.nextElementSibling;
            }
            // Hide all elements in between
            let currentElement = this.parentNode.nextElementSibling;
            while (currentElement && currentElement !== nextCityName) {
                currentElement.style.display = 'block';
                currentElement = currentElement.nextElementSibling;
            }
        });
    });
    clickedButton.style.display = 'none';
    const hideButton = clickedButton.previousElementSibling;
    hideButton.style.display = 'inline-block';
}
// ------------------------------------------------------------------------------------------------


// ----------------------------------- fillform.js ------------------------------------------------
var updatename;

function fillform(e) {
    var name = e.textContent;
    updatename = name;
    document.getElementById("update").style.display = "block";
    for (let i = 0; i < listdataarray.length; i++) {
        if (listdataarray[i] == name) {
            document.getElementById("start").value = listdataarray[i + 6];
            document.getElementById("returnDate").value = listdataarray[i + 7];
            document.getElementById("people").value = listdataarray[i + 2];
            document.getElementById("rooms").value = listdataarray[i + 3];
            document.getElementById("transportation").value = listdataarray[i + 4];
            document.getElementById("hotelname").value = listdataarray[i + 5];
        }
    }
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ----------------------------------- addtrip.js -------------------------------------------------
function addtrip() {
    objectivenumber = 0;
    cityarray.push(document.getElementById('Name1').value);
    document.getElementById("mySidepanel").style.display = "block";
    destinationcity = document.getElementById('Name1').value;
    const locationsarray2 = [];

    function saveapi(response) {
        const apiresponse = response;
        var data = JSON.stringify(apiresponse);
        var values = data.split(":");
        var coord = "123";
        var name = "123";
        for (let i = 0; i < values.length; i++) {
            if (values[i] == "\"Point\",\"coordinates\"") coord = values[i + 1].substring(1, values[i + 1].lastIndexOf("]"));
            if (values[i] == "{\"xid\"") name = values[i + 2].substring(1, values[i + 2].lastIndexOf(",") - 1);
            if (values[i] == "{\"type\"") locationsarray2.push(coord, name);
        }
        locationsarray2.shift();
        locationsarray2.shift();
        locationsarray2.shift();
        locationsarray2.shift();
        for (let i = 0; i < locationsarray2.length; i = i + 2) {
            const splitter = locationsarray2[i].split(",");
            const array = [];
            array.push(splitter[0]);
            array.push(splitter[1]);
            createMarker(array, '#5327c3', locationsarray2[i + 1]);
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
    var coordinates22index = locationsarray.indexOf(destinationcity2) + 1;
    coordinates22 = locationsarray[coordinates22index];
    fetch('https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?lat=' + coordinates22[1] + '&lon=' + coordinates22[0] + '&radius=10000&rate=3&kinds=museums%2Cmonuments%2Chistoric', options)
        .then(response => response.json())
        .then(data => saveapi(data))
        .catch(err => console.error(err));
}

// ------------------------------------------------------------------------------------------------

// ----------------------------------- searchhotel.js ----------------------------------------------
const hotelscoordinates = [];

function toggleTable() {
    document.getElementById("hotelData").style.display = "none";
    document.getElementById("objectives").style.display = "block";
    addtrip();
    if (!document.getElementById("rooms").value.startsWith("0") && document.getElementById("rooms").value !== "") {
        if (document.getElementById("start").value < document.getElementById("returnDate").value) {
            if (!document.getElementById("people").value.startsWith("0") && document.getElementById("people").value !== "") {
                addtrip();
                document.getElementById("popuphotels").style.display = "block";
                document.getElementById("mySidepanel").style.filter = "blur(3px)";
                document.getElementById("mySidepanelCity").style.filter = "blur(3px)";
                document.getElementById("map").style.filter = "blur(3px)";
                const hotelsarray = [];

                function savehotels(response) {
                    const apiresponse = response;
                    var data = JSON.stringify(apiresponse);
                    var values = data.split("\"");
                    var url = "";
                    var hotel_name = "";
                    var latitude = "";
                    var longitude = "";
                    var gross_price = "";
                    var main_photo_url = "";
                    for (let i = 0; i < values.length; i++) {
                        if (values[i] == "url") url = values[i + 2];
                        if (values[i] == "hotel_name") hotel_name = values[i + 2];
                        if (values[i] == "latitude") latitude = values[i + 1].substring(1).replace(',', ' ');
                        if (values[i] == "longitude") longitude = values[i + 1].substring(1).replace(',', ' ');
                        if (values[i] == "gross_amount_hotel_currency" && values[i + 1] == ":{" && values[i + 2] == "value") gross_price = values[i + 3].substring(1).replace('}', ' ').replace(',', ' ');
                        if (values[i] == "gross_amount_hotel_currency" && values[i + 1] == ":{" && values[i + 2] == "currency" && values[i + 3] == ":" && values[i + 4] == "EUR" && values[i + 5] == "," && values[i + 6] == "value") gross_price = values[i + 7].substring(1).replace('}', ' ').replace(',', ' ');
                        if (values[i] == "max_photo_url") main_photo_url = values[i + 2];
                        if (values[i] == "max_1440_photo_url") hotelsarray.push(url, hotel_name, latitude, longitude, gross_price, main_photo_url);
                        if (values[i] == "max_1440_photo_url") hotelscoordinates.push(hotel_name, latitude, longitude);
                    }
                    for (let i = 0; i < hotelsarray.length; i = i + 6) {
                        let hotelDiv = '<a href="' + hotelsarray[i] + '" target="_blank" rel="noopener noreferrer">';
                        hotelDiv += '<div class="blurred">';
                        hotelDiv += '<li id="hname">' + hotelsarray[i + 1] + '</li>';
                        hotelDiv += '<li id="hmoney">' + hotelsarray[i + 4] + "€" + '</li>';
                        hotelDiv += '<li id="himage"><img src="' + hotelsarray[i + 5] + '" width="460" height="400"></li>';
                        hotelDiv += '</div>';
                        document.getElementById('myList').innerHTML += hotelDiv;
                        document.getElementById('myList').innerHTML  += '<li><button id="hbutton" onclick="gethotel(\'' + hotelsarray[i + 1] + '\')">Select</button></li>';
                    }
                }

                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '1fb99e2302msh01a84d95d59109cp1cc453jsn32731c716e00',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }
                };
                var destinationcity2 = document.getElementById('Name1').value;
                var coordinates22index = locationsarray.indexOf(destinationcity2) + 1;
                coordinates22 = locationsarray[coordinates22index];
                var adults_number = document.getElementById('people').value;
                var checkout_date = document.getElementById('returnDate').value;
                var checkin_date = document.getElementById('start').value;
                var room_number = document.getElementById('rooms').value;
                fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=' + coordinates22[0] + '&locale=en-gb&adults_number=' + adults_number + '&filter_by_currency=EUR&checkout_date=' + checkout_date + '&units=metric&latitude=' + coordinates22[1] + '&order_by=popularity&room_number=' + room_number + '&checkin_date=' + checkin_date + '&include_adjacency=true', options)
                    .then(response => response.json())
                    .then(data => savehotels(data))
                    .catch(err => console.error(err));
            } else {
                alert("Incorrect value for people label!");
            }
        } else {
            alert("The return date must be after start date!");
        }
    } else {
        alert("Incorrect value for rooms label!");
    }
}

// ------------------------------------------------------------------------------------------------



// ----------------------------------- misc.js ----------------------------------------------------
function isMobileOrTablet() {
    var i, a = !1;
    return i = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(i) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0, 4))) && (a = !0), a
}

window.isMobileOrTablet = window.isMobileOrTablet || isMobileOrTablet;
// ------------------------------------------------------------------------------------------------

// ----------------------------------- gethotel.js ------------------------------------------------
let hotelname;
function gethotel(e) {
    hotelname = e;
    document.getElementById('popuphotels').style.display = "none";
    document.getElementById('hotelData').style.display = "none";
    document.getElementById('objectives').style.display = "block";
    document.getElementById("mySidepanel").style.filter = "none";
    document.getElementById("mySidepanelCity").style.filter = "none";
    document.getElementById("map").style.filter = "none";
    document.getElementById("myList").innerHTML = "";
}

// ------------------------------------------------------------------------------------------------

// ----------------------------------- togglemap.js -----------------------------------------------
function togglemap() {
    if(cities.includes(document.getElementById("startingcityname").value)) {
        document.getElementById("detailslist").innerHTML += '<li class = "detailsstartingcity">' + document.getElementById("startingcityname").value + '</li>';
        document.getElementById('start').valueAsDate = new Date();
        document.getElementById('returnDate').valueAsDate = new Date();
        document.getElementById("startdiv").style.display = "none";
        document.getElementById("mySidepanel").style.display = "none";
        document.getElementById("mySidepanelCity").style.display = "block";
        document.getElementById("map").style.display = "block";
        map.resize();
        homecity = document.getElementById("startingcityname").value;
        document.getElementById('citylist').innerHTML += '<li id = "listelement">' + homecity + '</li>';
    }
    else {
        alert("City not found. Please enter a valid city name.");
    }
}

// ------------------------------------------------------------------------------------------------

// ----------------------------------- zoomoncity.js ----------------------------------------------
function zoomcity() {
    if(cities.includes(document.getElementById("Name1").value)) {
        document.getElementById("mySidepanel").style.display = "block";
        var destinationcity2 = document.getElementById('Name1').value;
        var coordinates22index = locationsarray.indexOf(destinationcity2) + 1;
        coordinates22 = locationsarray[coordinates22index];
        map.flyTo({center: coordinates22, zoom: 9});
        const elementsToRemove = document.querySelectorAll('.marker');
        elementsToRemove.forEach(element => element.remove());
    }
    else {
        alert("City not found. Please enter a valid city name.");
    }
}

// ------------------------------------------------------------------------------------------------

// ----------------------------------- savetopdf.js -----------------------------------------------
function savetopdf() {
    document.getElementById("mySidepanel").style.display = "block";
    document.getElementById("mySidepanel").style.borderTop = "none";
    document.getElementById("mySidepanel").style.borderRight = "none";
    document.getElementById("mySidepanel").style.backgroundImage = "none";
    document.getElementById("mySidepanelCity").style.display = "none";
    document.getElementById("map").style.display = "none";
    //document.getElementById("menubutton").style.display="none";
    document.getElementById("savetopdf").style.display = "none";
    document.getElementById("showdetails").style.display = "none";
    window.print();
    document.getElementById("map").style.display = "block";
    map.resize();
    document.getElementById("showdetails").style.display = "inline-block";
    document.getElementById("savetopdf").style.display = "inline-block";
    document.getElementById("mySidepanel").style.display = "block";
    document.getElementById("mySidepanel").style.borderRight = "1px solid";
    document.getElementById("mySidepanel").style.borderTop = "1px solid";
    document.getElementById("mySidepanel").style.backgroundImage = "linear-gradient(#000, #000)";
    document.getElementById("mySidepanelCity").style.display = "block";
//  document.getElementById("menubutton").style.display="block";
}

// ------------------------------------------------------------------------------------------------
// ----------------------------------- showdetails.js ---------------------------------------------
var detailscounter = 1;

function showdetails() {
    var listelements = document.getElementsByClassName("listdetails");
    if (detailscounter % 2 == 1) {
        for (var i = 0, len = listelements.length; i < len; i++) {
            listelements[i].style["display"] = "block";
        }
    }
    if (detailscounter % 2 == 0) {
        for (var i = 0, len = listelements.length; i < len; i++) {
            listelements[i].style["display"] = "none";
        }
    }
    detailscounter++;
}

// ------------------------------------------------------------------------------------------------
});