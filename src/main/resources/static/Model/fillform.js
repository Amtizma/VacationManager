// Functie pentru a face update la detaliile unui oras din lista

var updatename;
function fillform(e){
var name = e.textContent;
updatename = name;
document.getElementById("update").style.display="block";
for(let i = 0; i < listdataarray.length; i++){
    if(listdataarray[i] == name) {
   document.getElementById("start").value = listdataarray[i+6];
   document.getElementById("return").value = listdataarray[i+7];
    document.getElementById("people").value = listdataarray[i+2];
document.getElementById("rooms").value =listdataarray[i+3];
document.getElementById("transportation").value =listdataarray[i+4];
document.getElementById("hotelname").value = listdataarray[i+5];
    }
}
}