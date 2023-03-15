var menucounter = 1;
function menubutton(){
    if(menucounter%2 == 1){
     document.getElementById("form").style.display="flex";
     document.getElementById("citylist").style.display="inline-block";
    document.getElementById("mySidepanel").style.display="block";
    document.getElementById("mySidepanel").style.backgroundImage="linear-gradient(#000, #000)";
    document.getElementById("mySidepanel").style.borderRight="1px solid";
    document.getElementById("mySidepanel").style.borderTop="1px solid";
    document.getElementById("mySidepanel").style.display="block";
    }
    if(menucounter%2 == 0){
          document.getElementById("form").style.display="none";
      document.getElementById("citylist").style.display="none";
         document.getElementById("mySidepanel").style.borderRight="none";
         document.getElementById("mySidepanel").style.backgroundImage="none";
    document.getElementById("mySidepanel").style.borderTop="none";
    document.getElementById("mySidepanel").style.display="none";
}
    menucounter++;

}