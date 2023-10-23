var mFront = document.getElementById("front");
var mBack = document.getElementById("back");
var mBtm = document.getElementById("btm");
var mVid = document.getElementById("vid");
var mView = document.getElementById("brow");

var webkam = {
  
  worker : null, // tesseract worker
  hVid : null, hGo :null, hRes : null, // html elements
  init : () => {
    
    webkam.hVid = mVid,
    webkam.hGo = document.getElementById("shoot"),
    webkam.hRes = document.getElementById("result");

    function handleVideo(cameraFacing) {
      const constraints = {
        video: {
          facingMode: {
            exact: cameraFacing
          }
        }
      }
      return constraints
    };

    function turnVideo(constraints) {
      let video;
      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          video = webkam.hVid
          video.srcObject = stream
          video.play()
          video.onloadeddata = () => {
            ctx.width = video.videoWidth
            ctx.height = video.videoHeight
          }
        })
    }
    
    document.querySelector(".frontCamera").addEventListener("click", () => {
      turnVideo(handleVideo("user"));
      mFront.style.display = "none";
      mBack.style.display = "block";
    })
    document.querySelector(".backCamera").addEventListener("click", () => {
      turnVideo(handleVideo("environment"));
      mFront.style.display = "block";
      mBack.style.display = "none";
    })

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(async (stream) => {
      
      webkam.worker = await Tesseract.createWorker();
      await webkam.worker.loadLanguage("eng");
      await webkam.worker.initialize("eng");

      webkam.hVid.srcObject = stream;
      webkam.hGo.onclick = webkam.snap;
      
      mVid.style.display = "none";
      mView.style.display = "block";
      mBtm.style.display = "none";
    })
    .catch(err => console.error(err));
  },

  snap : async () => {
    let canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    vWidth = webkam.hVid.videoWidth,
    vHeight = webkam.hVid.videoHeight;

    canvas.width = vWidth;
    canvas.height = vHeight;
    ctx.drawImage(webkam.hVid, 0, 0, vWidth, vHeight);

    const res = await webkam.worker.recognize(canvas.toDataURL("image/png"));
    webkam.hRes.value = res.data.text;
  },
};
window.addEventListener("load", webkam.init);

function sClose() {
  mVid.style.display = "block";
  mView.style.display = "none";
  mBtm.style.display = "block";
}
