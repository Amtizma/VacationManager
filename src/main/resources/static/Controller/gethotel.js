// Salveaza hotelul pe care se face click

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
