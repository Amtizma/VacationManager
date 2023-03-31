// Calculeaza timpul necesar traseului in functie de modul de transport ales
function calculatetime(timeinseconds, distance){
    if(document.getElementById('transportation').value == 'Car') timeinseconds = ((distance/1000) / 0.025) / 3600;
    if(document.getElementById('transportation').value == 'Bus') timeinseconds = ((distance/1000) / 0.0166666667) / 3600;
    if(document.getElementById('transportation').value == 'Plane') timeinseconds = ((distance/1000) / 0.0055555556) / 3600;
    if(document.getElementById('transportation').value == 'Bike') timeinseconds = ((distance/1000) / 0.2083333333) / 3600;
    return timeinseconds.toFixed(2);
}