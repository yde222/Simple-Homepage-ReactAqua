//김평권의 양식장 테이블,,,[챠트관련] 씨트 참조
//id와 tempdate을 합쳐서 unique처리
CREATE TABLE fishFarmTempDaypg (
    id DECIMAL(20,0),
    tempdate VARCHAR(8),
    temp INT,
    UNIQUE (id, tempdate)
);

//테이블이 없어지므로 사용에 주의 하세요.
DROP TABLE IF EXISTS fishFarmTempDaypg;

//insert에서 27, 30은 이 select(챠트에서 양식장 목록 sql)의 id를 의미
SELECT a.NTT_ID AS id, a.NTT_SJ AS name FROM LETTNBBS a LEFT OUTER JOIN COMVNUSERMASTER b ON 
a.FRST_REGISTER_ID = b.ESNTL_ID WHERE a.USE_AT = 'Y' AND a.BBS_ID = 'BBSMSTR_BBBBBBBBBBBB' 
ORDER BY NTT_ID DESC;

//랍스터 양식장(27), 새우 양식장(30)의 열흘치 데이터
//(27, '20240821', 11),,,이 데이터의 의미는 랍스터 양식장 24년8월21일 수온이 11도...

INSERT INTO fishFarmTempDaypg (id, tempdate, temp)
VALUES
(27, '20240821', 11),
(27, '20240822', 12),
(27, '20240823', 13),
(27, '20240824', 14),
(27, '20240825', 15),
(27, '20240826', 16),
(27, '20240827', 17),
(27, '20240828', 18),
(27, '20240829', 19),
(27, '20240830', 20),
(27, '20240831', 21);

INSERT INTO fishFarmTempDaypg (id, tempdate, temp)
VALUES
(30, '20240821', 21),
(30, '20240822', 22),
(30, '20240823', 23),
(30, '20240824', 24),
(30, '20240825', 25),
(30, '20240826', 26),
(30, '20240827', 27),
(30, '20240828', 28),
(30, '20240829', 29),
(30, '20240830', 30),
(30, '20240831', 31);

//챠트를 표시하기 위해 조건문을 설정해서 사용
select * from fishFarmTempDaypg;

