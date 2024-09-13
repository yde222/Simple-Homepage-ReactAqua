// 전역 변수로 녹화된 청크들을 저장할 배열을 선언합니다.
let recordedChunks = [];

// Start MP4 버튼 클릭 시 호출되는 함수
document.getElementById('startMp4').addEventListener('click', function() {
    // 이전에 녹화한 데이터를 초기화합니다.
    recordedChunks = [];
    // mp4 녹화 시작 로직을 호출합니다.
    startMp4Recording();
});

// End MP4 버튼 클릭 시 호출되는 함수
document.getElementById('endMp4').addEventListener('click', function() {
    // mp4 녹화 종료 및 다운로드 로직을 호출합니다.
    endMp4Recording();
});

// Recording JPG 버튼 클릭 시 호출되는 함수
document.getElementById('recordJpg').addEventListener('click', function() {
    // JPG 녹화 로직을 호출합니다.
    recordJpg();
});


// MP4 녹화 시작 함수
function startMp4Recording() {

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream);
        console.log('startMp4Recording');

        mediaRecorder.ondataavailable = function(event) {
            console.log('ondataavailable', event.data);
            recordedChunks.push(event.data);
        };

        mediaRecorder.start();
    })
    .catch(function(err) {
        console.error('Error accessing media devices: ', err);
    });

}

function endMp4Recording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        
        mediaRecorder.onstop = function() {
            console.log('endMp4Recording recordedChunks', recordedChunks);
            const blob = new Blob(recordedChunks, { type: 'video/mp4' }); // 타입을 video/mp4로 수정
            console.log('endMp4Recording blob', blob);
            
            const url = window.URL.createObjectURL(blob);
            console.log('endMp4Recording url', url);
            
            const a = document.createElement('a');
            console.log('endMp4Recording a', a);
            a.href = url;
            a.download = 'recorded.mp4';
            
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }
}


// JPG 녹화 함수
function recordJpg() {
    // JPG 녹화 로직 구현
    // 예를 들어, canvas에 그려진 이미지를 캡처하고 저장하는 방법에 대한 코드를 작성합니다.
    // 현재 화면을 캡처하여 이미지로 저장
    html2canvas(document.body, {
        onrendered: function(canvas) {
            // Canvas에서 이미지 데이터를 얻음
            var imgData = canvas.toDataURL('image/jpeg');

            // 이미지 데이터를 다운로드할 수 있도록 링크를 생성
            var link = document.createElement('a');
            link.href = imgData;
            link.download = 'screenshot.jpg';

            // 생성된 링크를 클릭하여 다운로드 진행
            link.click();
        }
    });
}
