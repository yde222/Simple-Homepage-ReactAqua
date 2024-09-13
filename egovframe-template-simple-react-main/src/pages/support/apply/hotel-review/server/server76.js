// server.js
// const express = require('express')
// const app = express()
// const port = 3001

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })


const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

//DB보내는 기능 구현
//이전에 post에서 데이터 받는 부분 아래에다가 데이터 보내는 함수를 적어줍니다. 
//if문은 test함수 답게 호텔1,2,3별로 나누어 testData를 객체로 반환시켜줍니다.

//그리고 res.send()로 객체를 내보내면 끝 ㅎ
app.post('/text', (req, res) => {
  // 데이터 받는 곳
  const text1 = req.body.name;
  console.log(text1);

  // 데이터 보내는 곳
  let sendData;
  if (text1 == '호텔1') {
    sendData = {
      data: '호텔1 데이터 test',
    };
  } else if (text1 == '호텔2') {
    sendData = {
      data: '호텔2 데이터 test',
    };
  } else {
    sendData = {
      data: '호텔3 데이터 test',
    };
  }
  res.send(sendData);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});