
//https://velog.io/@cada/React%EC%9D%98-setState%EA%B0%80-%EC%9E%98%EB%AA%BB%EB%90%9C-%EA%B0%92%EC%9D%84-%EC%A3%BC%EB%8A%94-%EC%9D%B4%EC%9C%A0
//[React] [ setState가 잘못된 값을 주는 이유 ]
//이 코드의 의도는 this.state.count의 값을 3씩 증가시켜주는 것입니다. 
//하지만 실제로 위 코드는 3이 아닌 1씩 증가하게 됩니다. 왜 이런 현상이 발생하는 것일까요?

//이것은 setState의 호출이 비동기적으로 이뤄지기 때문입니다. 
//setState는 컴포넌트를 즉각적으로 갱신하지 않고 변경사항을 대기열에 집어넣어 여러 변경사항과 함께 
//일괄적으로 갱신합니다. 이를 위해 컴포넌트의 렌더링을 뒤로 미룰수도 있는 것이죠. 
//즉, setState를 여러번 호출한다고 해도 한 번의 렌더링만 이루어질 수 있고, 
//따라서 this.state는 setState에 의해 여러번 조작되는 동안 변경되지 않고 
//단 하나의 값만 가지게 됩니다.

//이 코드는 개발자가 의도한 대로 동작하지 않습니다. this.state가 즉각 반영되지 않기 때문입니다. 
//아래의 세 가지 방법을 통해 위 문제를 해결할 수 있습니다.
// 3. setState의 updater 인자에 함수 사용
//add() {
//  this.setState((state, props) => {
//    return {count: state.count + 1}
//  });
//}

import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0
  }

//  add() {
//    this.setState({count: this.state.count+1});
//  }
// 3. setState의 updater 인자에 함수 사용
add() {
  this.setState((state, props) => {
    return {count: state.count + 1}
  });
}

  
  handleClick() {
    this.add();
    this.add();
    this.add();
  }
  
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.handleClick()}>Add</button>
      </div>
    );
  }
}

export default App;