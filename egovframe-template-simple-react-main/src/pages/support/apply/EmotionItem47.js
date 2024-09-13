import React from 'react';

const EmotionItem47 = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
      key={emotion_id}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem47;