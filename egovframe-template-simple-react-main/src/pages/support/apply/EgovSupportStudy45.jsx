//https://wazacs.tistory.com/30
// scroll
//이번에는 window가 아닌 특정 div 에서 스크롤했을 때 div안의 다른 객체가 고정이 되도록 구현해 보겠습니다. 
//축약한다면 다음과 같습니다.
//1. 기존 처럼 클래스 하나를 붙여 위치를 컨트롤한다. 
//2. scroll값을 가져와 인라인 스타일로 실시간 반영한다. (다른 css 부분을 컨트롤하기 위해 어차피 클래스를 붙이긴 할 것이다.)

//- scroll 값을 가져오기 : boxRef.current.scrollTop

//- scroll 행위 여부를 판단하기 : addEventListener 
 
import "./styles45.css";
import { useRef, useState, useEffect } from "react";

export default function App() {
  const boxRef = useRef(null);
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);

  function logit() {
    setScrollY(boxRef.current.scrollTop);
//30 이면 금방 I am fixed 900 이면 늦게늦게   I am fixed 
    if (boxRef.current.scrollTop > 30) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      boxRef.current.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      boxRef.current.removeEventListener("scroll", logit);
    };
  });

  return (
    <div className="App">
      <div className="box">
        <div className={ScrollActive ? "smallBox fixed" : "smallBox"}>
          {ScrollActive ? "I am fixed! ✨" : "I will be fixed! 😁"}
        </div>
        <div className="boxInner" ref={boxRef}>
          {" "}
          {/* boxRef 설정하기 */}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
          impedit ducimus perferendis, fuga nobis nihil eius similique.
          Laboriosam fuga doloribus quibusdam cumque beatae! Quae omnis,
          explicabo possimus molestias nam tempore! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Molestiae impedit ducimus perferendis,
          fuga nobis nihil eius similique. Laboriosam fuga doloribus quibusdam
          cumque beatae! Quae omnis, explicabo possimus molestias nam tempore!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
          impedit ducimus perferendis, fuga nobis nihil eius similique.
          Laboriosam fuga doloribus quibusdam cumque beatae! Quae omnis,
          explicabo possimus molestias nam tempore! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Molestiae impedit ducimus perferendis,
          fuga nobis nihil eius similique. Laboriosam fuga doloribus quibusdam
          cumque beatae! Quae omnis, explicabo possimus molestias nam tempore!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
          impedit ducimus perferendis, fuga nobis nihil eius similique.
          Laboriosam fuga doloribus quibusdam cumque beatae! Quae omnis,
          explicabo possimus molestias nam tempore! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Molestiae impedit ducimus perferendis,
          fuga nobis nihil eius similique. Laboriosam fuga doloribus quibusdam
          cumque beatae! Quae omnis, explicabo possimus molestias nam tempore!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
          impedit ducimus perferendis, fuga nobis nihil eius similique.
          Laboriosam fuga doloribus quibusdam cumque beatae! Quae omnis,
          explicabo possimus molestias nam tempore! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Molestiae impedit ducimus perferendis,
          fuga nobis nihil eius similique. Laboriosam fuga doloribus quibusdam
          cumque beatae! Quae omnis, explicabo possimus molestias nam tempore!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
          impedit ducimus perferendis, fuga nobis nihil eius similique.
          Laboriosam fuga doloribus quibusdam cumque beatae! Quae omnis,
          explicabo possimus molestias nam tempore! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Molestiae impedit ducimus perferendis,
          fuga nobis nihil eius similique. Laboriosam fuga doloribus quibusdam
          cumque beatae! Quae omnis, explicabo possimus molestias nam tempore!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
          impedit ducimus perferendis, fuga nobis nihil eius similique.
          Laboriosam fuga doloribus quibusdam cumque beatae! Quae omnis,
          explicabo possimus molestias nam tempore! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Molestiae impedit ducimus perferendis,
          fuga nobis nihil eius similique. Laboriosam fuga doloribus quibusdam
          cumque beatae! Quae omnis, explicabo possimus molestias nam tempore!
        </div>
      </div>
    </div>
  );
}
