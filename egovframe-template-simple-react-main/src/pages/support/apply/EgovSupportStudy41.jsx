//https://www.daleseo.com/react-context/

//모든 기능이 그러하듯 React Context는 꼭 본연의 용도에 맞는 상황에서만 사용해야 합니다. 
//즉, 전역 데이터를 한 곳에서 저장하고 여러 컴포넌트에서 접근하고 싶은 경우가 아니라 
//사용을 피해야 합니다. 왜냐하면 React Context를 사용하게 되면 
//해당 컴포넌트는 해당 Context가 없이는 재사용이 어렵기 때문입니다.
import React, { Component } from "react";
import LangContext41 from "./LangContext41";
import Button from "./Button41";
import Title from "./Title41";
import Message from "./Message41";

class App extends Component {
  state = { lang: "en" };

  toggleLang = () => {
    this.setState(({ lang }) => ({
      lang: lang === "en" ? "kr" : "en",
    }));
  };

  render() {
    const { lang } = this.state;
    return (
      <LangContext41.Provider value={lang}>
        <Button toggleLang={this.toggleLang} />
        <Title />
        <Message />
      </LangContext41.Provider>
    );
  }
}
export default App;
