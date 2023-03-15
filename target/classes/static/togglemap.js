function togglemap(){
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