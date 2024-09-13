//https://peter-coding.tistory.com/216
//[React] 자식 Component에서 부모 Componet로 값 변경하여 전달하기
//https://peter-coding.tistory.com/192 도 참조

import React, { useState } from "react";
import EmotionItem from "./EmotionItem47";
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];
const DiaryEditor = () => {
  const [emotion, setEmotion] = useState(3);
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };
  return (
    <div className="DiaryEditor">
      <div>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;