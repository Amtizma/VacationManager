var detailscounter=1;
function showdetails(){
var listelements = document.getElementsByClassName("listdetails");
 if(detailscounter%2 == 1){
    for(var i=0, len=listelements.length; i<len; i++)
    {
        listelements[i].style["display"] = "block";
    }
    }
 if(detailscounter%2 ==0){
for(var i=0, len=listelements.length; i<len; i++)
    {
        listelements[i].style["display"] = "none";
    }
}
detailscounter++;
}