/* Powered By CusMeDroid */
var database=firebase.database().ref(),yourVideo=document.getElementById("yourVideo"),friendsVideo=document.getElementById("friendsVideo"),yourId=Math.floor(1e9*Math.random()),servers={iceServers:[{urls:"stun:stun.services.mozilla.com"},{urls:"stun:stun.l.google.com:19302"},{urls:"turn:numb.viagenie.ca",credential:"beaver",username:"webrtc.websitebeaver@gmail.com"}]},pc=new RTCPeerConnection(servers);function sendMessage(e,s){database.push({sender:e,message:s}).remove()}function readMessage(e){var s=JSON.parse(e.val().message);e.val().sender!=yourId&&(null!=s.ice?pc.addIceCandidate(new RTCIceCandidate(s.ice)):"offer"==s.sdp.type?pc.setRemoteDescription(new RTCSessionDescription(s.sdp)).then((()=>pc.createAnswer())).then((e=>pc.setLocalDescription(e))).then((()=>sendMessage(yourId,JSON.stringify({sdp:pc.localDescription})))):"answer"==s.sdp.type&&pc.setRemoteDescription(new RTCSessionDescription(s.sdp)))}function showMyFace(){navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then((e=>yourVideo.srcObject=e)).then((e=>pc.addStream(e)))}function showFriendsFace(){pc.createOffer().then((e=>pc.setLocalDescription(e))).then((()=>sendMessage(yourId,JSON.stringify({sdp:pc.localDescription}))))}pc.onicecandidate=e=>e.candidate?sendMessage(yourId,JSON.stringify({ice:e.candidate})):console.log("Sent All Ice"),pc.onaddstream=e=>friendsVideo.srcObject=e.stream,database.on("child_added",readMessage);
