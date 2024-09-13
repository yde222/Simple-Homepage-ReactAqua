import React, { Component } from "react";
import LangContext from "./LangContext41";

//Message 컴포넌트와 같이 클래스로 구현된 컴포넌트의 경우에는 contextType을 
//사용해서 Context에 저장되어 있는 전역 데이터에 접근할 수 있습니다. 
//단, 이 방법은 클래스 컴포넌트에서만 사용 가능합니다.
class Message41 extends Component {
  static contextType = LangContext;

  render() {
    const lang = this.context;
    if (lang === "en")
      return (
        <p>
          "Context provides a way to pass data through the component tree
          without having to pass props down manually at every level"
        </p>
      );
    else
      return (
        <p>
          "컨텍스트는 모든 레벨에서 일일이 props를 넘기지 않고도 컴포넌트 트리에
          걸쳐서 데이터를 전달할 수 있는 방법을 제공합니다."
        </p>
      );
  }
}
export default Message41;