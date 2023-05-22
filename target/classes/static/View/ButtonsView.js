// Functie de afisare sau nu a meniului.
var menucounter = 1;
function menubutton() {
    if (menucounter % 2 == 1) {
        document.getElementById("form").style.display = "flex";
        document.getElementById("citylist").style.display = "inline-block";
        document.getElementById("mySidepanel").style.display = "block";
        document.getElementById("mySidepanel").style.backgroundImage = "linear-gradient(#000, #000)";
        document.getElementById("mySidepanel").style.borderRight = "1px solid";
        document.getElementById("mySidepanel").style.borderTop = "1px solid";
        document.getElementById("mySidepanel").style.display = "block";
    }
    if (menucounter % 2 == 0) {
        document.getElementById("form").style.display = "none";
        document.getElementById("citylist").style.display = "none";
        document.getElementById("mySidepanel").style.borderRight = "none";
        document.getElementById("mySidepanel").style.backgroundImage = "none";
        document.getElementById("mySidepanel").style.borderTop = "none";
        document.getElementById("mySidepanel").style.display = "none";
    }
    menucounter++;
}

// Functia pentru a afisa detaliile sau nu

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
