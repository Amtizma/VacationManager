function updatecity() {
    document.getElementById("citylist").innerHTML = "";

    // Functie care umple datele din label cu detaliile salvate anterior ale trip-ului
    for (let i = 0; i < listdataarray.length; i++) {
        if (listdataarray[i] == updatename) {
            listdataarray[i + 1] = document.getElementById("start").value + " to " + document.getElementById("returnDate").value;
            listdataarray[i + 2] = document.getElementById("people").value;
            listdataarray[i + 3] = document.getElementById("rooms").value;
            listdataarray[i + 4] = document.getElementById("transportation").value;
            listdataarray[i + 5] = document.getElementById("hotelname").value;
            listdataarray[i + 6] = document.getElementById("start").value;
            listdataarray[i + 7] = document.getElementById("returnDate").value;
        }
    }
    // Functie care face update in lista de detalii
    document.getElementById("citylist").innerHTML += '<li id = "listelement">' + listdataarray[0] + "</li>";
    for (let i = 1; i < listdataarray.length; i = i + 8) {
        document.getElementById("citylist").innerHTML += '<li id = "listelement" onclick = fillform(this)>' + listdataarray[i] + "</li>";
        document.getElementById("citylist").innerHTML += '<li class = "listdetails">' + listdataarray[i + 1] + "</li>";
        document.getElementById("citylist").innerHTML += '<li class = "listdetails">' + "Hotel name: " + listdataarray[i + 5] + "</li>";
        document.getElementById("citylist").innerHTML += '<li class = "listdetails">' + "People: " + listdataarray[i + 2] + " | " + "Rooms: " + listdataarray[i + 3] + "</li>";
        document.getElementById("citylist").innerHTML += '<li class = "listdetails">' + "Mode of transport: " + listdataarray[i + 4] + "</li>";
    }

    // Resetare label-uri

    document.getElementById("update").style.display = "none";
    document.getElementById("Name").value = "";
    document.getElementById("start").value = "";
    document.getElementById("returnDate").value = "";
    document.getElementById("people").value = "1";
    document.getElementById("rooms").value = "";
    document.getElementById("transportation").value = "Car";
    document.getElementById("hotelname").value = "";
    document.getElementById("objectivename").value = "";
}
