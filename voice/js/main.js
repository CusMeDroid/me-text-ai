/* Powered by CusMeDroid */
var mVoLay=document.getElementById("voicerap"),mVoBrow=document.getElementById("vbrow");function vClose(){mVoLay.style.display="block",mVoBrow.style.display="none"}runSpeechRecog=()=>{document.getElementById("output").innerHTML="Memuat Teks...";var e=document.getElementById("output"),t=document.getElementById("action");let n=new webkitSpeechRecognition;n.onstart=()=>{t.innerHTML="Mendengarkan..."},n.onresult=n=>{mVoLay.style.display="none",mVoBrow.style.display="block";var o=n.results[0][0].transcript;e.innerHTML=o,e.classList.remove("hide"),t.innerHTML=""},n.start()};