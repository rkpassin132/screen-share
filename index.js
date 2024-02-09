const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
// Options for getDisplayMedia()
var displayMediaOptions = {
    video: {
        cursor: "always",   
        height: 1000,
        width: 1200
    },
    audio: true
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function (evt) {
    startCapture();
}, false);
stopElem.addEventListener("click", function (evt) {
    stopCapture();
}, false);

async function startCapture() {
    try {
        let videoObj = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        videoElem.srcObject = videoObj;
        dumpOptionsInfo();
    } catch (err) {
        console.error("Error: " + err);
    }
}

function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoElem.srcObject = null;
}

function dumpOptionsInfo() {
    console.log(videoElem.srcObject);
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];
    console.info("Track settings:");
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info("Track constraints:");
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}