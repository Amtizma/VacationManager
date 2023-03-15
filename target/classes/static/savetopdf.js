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