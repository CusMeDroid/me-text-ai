/* Powered by CusMeDroid */
var mFront=document.getElementById("front"),mBack=document.getElementById("back"),mBtm=document.getElementById("btm"),mVid=document.getElementById("mewrap"),mView=document.getElementById("brow"),webkam={worker:null,hVid:null,hGo:null,hRes:null,init:()=>{function e(e){return{video:{facingMode:{exact:e}}}}function t(e){let t;navigator.mediaDevices.getUserMedia(e).then((e=>{t=webkam.hVid,t.srcObject=e,t.play(),t.onloadeddata=()=>{ctx.width=t.videoWidth,ctx.height=t.videoHeight}}))}webkam.hVid=document.getElementById("vid"),webkam.hGo=document.getElementById("shoot"),webkam.hRes=document.getElementById("result"),document.querySelector(".frontCamera").addEventListener("click",(()=>{t(e("user")),mFront.style.display="none",mBack.style.display="block"})),document.querySelector(".backCamera").addEventListener("click",(()=>{t(e("environment")),mFront.style.display="block",mBack.style.display="none"})),navigator.mediaDevices.getUserMedia({video:!0}).then((async e=>{webkam.worker=await Tesseract.createWorker(),await webkam.worker.loadLanguage("eng"),await webkam.worker.initialize("eng"),webkam.hVid.srcObject=e,webkam.hGo.onclick=webkam.snap})).catch((e=>console.error(e)))},snap:async()=>{let e=document.createElement("canvas"),t=e.getContext("2d"),a=webkam.hVid.videoWidth,n=webkam.hVid.videoHeight;e.width=a,e.height=n,t.drawImage(webkam.hVid,0,0,a,n);const i=await webkam.worker.recognize(e.toDataURL("image/png"));webkam.hRes.value=i.data.text,mVid.style.display="none",mView.style.display="block",mBtm.style.display="none"}};function sClose(){mVid.style.display="block",mView.style.display="none",mBtm.style.display="block"}window.addEventListener("load",webkam.init);
