"use strict";   // 厳格モードとする
//https://www.hiramine.com/programming/videochat_webrtc/16_muliple_peer_connection.html
//다자간 영상 채팅
// モジュール
const express = require( "express" );
const http = require( "http" );
const socketIO = require( "socket.io" );

// オブジェクト
const app = express();
const server = http.Server( app );
const io = socketIO( server );

// 定数
const PORT = process.env.PORT || 1337;

// 接続時の処理
// ・サーバーとクライアントの接続が確立すると、
// 　サーバー側で、"connection"イベント
// 　クライアント側で、"connect"イベントが発生する
io.on(
    "connection",
    ( socket ) =>
    {
        console.log( "connection : ", socket.id );

// 서버에서 정보 수신
//socket.on("cameraInfo", (data) => {
    // data에는 각 카메라에 대한 정보가 포함됨
//    updateCameraInfo(data.cameraName, data.temperature, data.doValue, data.phValue, data.phEcValue);
//});

        // 切断時の処理
        // ・クライアントが切断したら、サーバー側では"disconnect"イベントが発生する
        socket.on(
            "disconnect",
            () =>
            {
                console.log( "disconnect : ", socket.id );
            } );

        // signalingデータ受信時の処理
        // ・クライアント側のsignalingデータ送信「socket.emit( "signaling", objData );」に対する処理
        socket.on(
            "signaling",
            ( objData ) =>
            {
                console.log( "signaling : ", socket.id );
                console.log( "- type : ", objData.type );

                // 指定の相手に送信
                if( "to" in objData )
                {
                    console.log( "- to : ", objData.to );
                    // 送信元SocketIDを送信データに付与し、指定の相手に送信
                    objData.from = socket.id;
                    socket.to( objData.to ).emit( "signaling", objData );
                }
                else
                {
                    console.error( "Unexpected : Unknown destination" );
                }
            } );

        // ビデオチャット参加時の処理
        socket.on(
            "join",
            ( objData ) =>
            {
                console.log( "join : ", socket.id );

                // 「join」を送信元以外の全員に送信
                // 送信元SocketIDを送信データに付与し、送信元以外の全員に送信
                //socket.broadcast.emit( "signaling", { from: socket.id, type: "join" } );
				//chart17 추가
                // ルーム名
                let strRoomName = objData.roomname;
                if( !strRoomName )
                {
                    strRoomName = "**********NoName**********"
                }
                console.log( "- Room name = ", strRoomName );

                // ルームへの入室
                socket.join( strRoomName );
                // ルーム名をsocketオブジェクトのメンバーに追加
                socket.strRoomName = strRoomName;

                // 「join」を同じルームの送信元以外の全員に送信
                // 送信元SocketIDを送信データに付与し、同じルームの送信元以外の全員に送信
                socket.broadcast.to( strRoomName ).emit( "signaling", { from: socket.id, type: "join" } );
            } );

        // ビデオチャット離脱時の処理
				//chart17 추가
        socket.on(
            "leave",
            ( objData ) =>
            {
                console.log( "leave : ", socket.id );
                
                if( "strRoomName" in socket )
                {
                    console.log( "- Room name = ", socket.strRoomName );

                    // ルームからの退室
                    socket.leave( socket.strRoomName );
                    // socketオブジェクトのルーム名のクリア
                    socket.strRoomName = "";
                }

            } );
    } );

// 公開フォルダの指定
app.use( express.static( __dirname + "/public74" ) );

// https://sirius7.tistory.com/101 참조
// server.js
//const express = require('express')
const session = require('express-session')
const path = require('path');
//const app = express()
//const port = 3001

const db = require('./lib/db');
const sessionOption = require('./lib/sessionOption');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

// Add the following line to parse JSON data
//app.use(express.json());

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(session({  
	key: 'session_cookie_name',
    secret: '~',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))

app.get('/', (req, res) => {    
    req.sendFile(path.join(__dirname, '/build/index.html'));
})

//app.post("/login", (req, res) => { // 데이터 받아서 결과 전송
app.post("/login", async (req, res) => {
    try {
//        const memberId = 'hong0206@hanmail.net';
//        const memberPwd = 'Kim0821pg@';

    const memberId = req.body.memberId;
    const memberPwd = req.body.memberPwd;

//    const memberPwd = '/rK54NgMU9yScNsEq+R8XTcH1bX5vUkcJqlBlMju8dQ=';
        const sendData = { isLogin: "" };
        console.log( "req.body.userId : ", req.body.userId );
        console.log( "login memberId : ", memberId );
        console.log( "login memberPwd : ", memberPwd );

        if (memberId && memberPwd) {
            db.query('SELECT * FROM lettnemplyrinfo WHERE emplyr_id = ?', [memberId], function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
 //                   bcrypt.compare(memberPwd , results[0].PASSWORD, (err, result) => {
                        console.log( "login password : ", results[0].PASSWORD );
 //                       console.log( "result : ", result );
  //                      console.log( "err : ", err );

 //       console.error("bcrypt.compare 에러1:", err);
 //  if (err) {
        // 에러가 발생한 경우에 대한 처리
//        console.error("bcrypt.compare 에러2:", err);
        // 클라이언트에게 에러 메시지를 전송하거나 다른 적절한 조치를 취할 수 있습니다.
 //       res.status(500).json({ isLogin: "비밀번호 비교 중 오류가 발생했습니다." });
 //       return; // 중요: 에러 발생 시 함수 실행 종료
 //   }
 //                       if (result === true) {
                            console.log( "password check OK : ", memberId );
                            const username = req.body.userId;
                            const sendData = { isLogin: "" };
                            console.log( "login username : ", username );
                            if (username) {
                                db.query('SELECT * FROM LETTNBBS a  LEFT OUTER JOIN COMVNUSERMASTER b ON a.FRST_REGISTER_ID = b.ESNTL_ID  WHERE ntt_sj = ?', [username], function (error, results, fields) {
                                    if (error) throw error;
                                    if (results.length > 0) {
                                        console.log( "camera name OK : " );
                                        sendData.isLogin = "True";
                                        res.send(sendData);
                                    } else {
                                        sendData.isLogin = "카메라명이 일치하지 않습니다.";
                                        res.send(sendData);
                                    }
                                });
                            } else {
                                sendData.isLogin = "카메라명을 입력하세요!";
                                res.status(400).json(sendData);
                            }
//                        } else {
//                            sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
//                            res.send(sendData);
//                        }
//                    });                      
                } else {
                    sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
                    res.send(sendData);
                }
            });
        } else {
            sendData.isLogin = "아이디, 비밀번호를 입력하세요!";
            res.status(400).json(sendData);
        }
    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ isLogin: "Internal Server Error" });
    }
});

// 체크박스 관련
// 라우트 설정(Light)
app.post('/updateCheckboxLight', (req, res) => {
  const checkboxStatus = req.body.checkboxStatus; // 클라이언트에서 보낸 체크박스 상태

  // 여기서 checkboxStatus를 필요에 따라 처리
  console.log( "updateCheckboxLight  : ", checkboxStatus );

  // 클라이언트에 응답을 보냄
  res.send({ success: true, message: 'Checkbox status updated successfully' });
});

// 라우트 설정(H)
app.post('/updateCheckboxH', (req, res) => {
  const checkboxStatus = req.body.checkboxStatus; // 클라이언트에서 보낸 체크박스 상태

  // 여기서 checkboxStatus를 필요에 따라 처리
  console.log( "updateCheckboxH  : ", checkboxStatus );

  // 클라이언트에 응답을 보냄
  res.send({ success: true, message: 'Checkbox status updated successfully' });
});

// 라우트 설정(Ir)
app.post('/updateCheckboxIr', (req, res) => {
  const checkboxStatus = req.body.checkboxStatus; // 클라이언트에서 보낸 체크박스 상태

  // 여기서 checkboxStatus를 필요에 따라 처리
  console.log( "updateCheckboxIr  : ", checkboxStatus );

  // 클라이언트에 응답을 보냄
  res.send({ success: true, message: 'Checkbox status updated successfully' });
});

// 라우트 설정(Uv)
app.post('/updateCheckboxUv', (req, res) => {
  const checkboxStatus = req.body.checkboxStatus; // 클라이언트에서 보낸 체크박스 상태

  // 여기서 checkboxStatus를 필요에 따라 처리
  console.log( "updateCheckboxUv  : ", checkboxStatus );

  // 클라이언트에 응답을 보냄
  res.send({ success: true, message: 'Checkbox status updated successfully' });
});

// 라우트 설정(G)
app.post('/updateCheckboxG', (req, res) => {
  const checkboxStatus = req.body.checkboxStatus; // 클라이언트에서 보낸 체크박스 상태

  // 여기서 checkboxStatus를 필요에 따라 처리
  console.log( "updateCheckboxG  : ", checkboxStatus );

  // 클라이언트에 응답을 보냄
  res.send({ success: true, message: 'Checkbox status updated successfully' });
});

// サーバーの起動
server.listen(
    PORT,
    () =>
    {
        console.log( "Server on port %d", PORT );
    } );
