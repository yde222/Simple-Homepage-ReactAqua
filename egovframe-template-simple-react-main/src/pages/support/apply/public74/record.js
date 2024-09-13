'use strict';

/* globals MediaRecorder */

let mediaRecorder;
let recordedBlobs;

const recordButton = document.querySelector('button#record');

recordButton.addEventListener('click', () => {
    startRecording();
});

const downloadButton = document.querySelector('button#download');
downloadButton.addEventListener('click', () => {
  
  stopRecording();
  

});

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function getSupportedMimeTypes() {
  const possibleTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/mp4;codecs=h264,aac',
  ];
  return possibleTypes.filter(mimeType => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
}

function startRecording() {
  recordedBlobs = [];
  const mimeType = getSupportedMimeTypes()[0];
  const options = {mimeType};

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);

  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
    download()
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
}


async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
    window.stream = stream;

  } catch (e) {
    console.error('navigator.getUserMedia error:', e);
  }
}

document.querySelector('button#start').addEventListener('click', async () => {

    const constraints = {
    video: {
      width: 1280, height: 720
    }
  };
  console.log('Using media constraints:', constraints);
  await init(constraints);
});

function download(){
    const blob = new Blob(recordedBlobs, {type: 'video/webm'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test';
    document.body.appendChild(a);
    a.click();
  
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  
}