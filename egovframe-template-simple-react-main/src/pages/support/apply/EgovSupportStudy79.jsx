//https://y00njaekim.github.io/react/%EB%B0%98%EB%B3%B5%EB%AC%B8/#for-%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%B0%98%EB%B3%B5%EB%AC%B8
//[React] 반복문 처리

import React, {useState} from 'react'

function App() {

  function repeatedUI() {
    var arr = [];
    for(var i=0; i<3; i++) {
      arr.push(<div>안녕</div>)
    }    
    return arr;
  }	
	

  let [title, setTitle] = useState(['나이키', '아디다스', '퓨마']);
  let [thumb, setThumb] = useState([0, 0, 0]);

  return (
	
    <div>
   { repeatedUI() }	
      {
        title.map(function(e, i) {
          return (
            <div key={i}>
              <h3> { e }
                <span onClick={ () => {
                  var temp = [...thumb];
                  temp[i] = temp[i] + 1;
console.log('thumb i ' + i +' ' + temp[i]);
                  setThumb(temp);
                }}>👍</span> { thumb[i] }
              </h3>
            </div>
          )
        })
      }
    </div> 
  )
}


export default App