var webkam = {
  
  worker : null, // tesseract worker
  hVid : null, hGo :null, hRes : null, // html elements
  init : () => {
    
    webkam.hVid = document.getElementById("vid"),
    webkam.hGo = document.getElementById("go"),
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
    })
    document.querySelector(".backCamera").addEventListener("click", () => {
      turnVideo(handleVideo("environment"));
    })

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(async (stream) => {
      
      webkam.worker = await Tesseract.createWorker();
      await webkam.worker.loadLanguage("eng");
      await webkam.worker.initialize("eng");

      webkam.hVid.srcObject = stream;
      webkam.hGo.onclick = webkam.snap;
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

    function turnVideo(constraints) {
      let video;
      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          video = webkam.hVid
          video.srcObject = stream
          video.stop()
          video.onloadeddata = () => {
            ctx.width = video.videoWidth
            ctx.height = video.videoHeight
          }
        })
    
    }

    const res = await webkam.worker.recognize(canvas.toDataURL("image/png"));
    webkam.hRes.value = res.data.text;
  },
};
window.addEventListener("load", webkam.init);
