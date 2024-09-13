
//https://ja.linux-console.net/?p=4896#gsc.tab=0
//React-Select を使用して検索可能な非同期ドロップダウンを作成する方法
import React from 'react';
import Select from 'react-select';

const aquaticCreatures = [
  { label: 'SharkL', value: 'Shark' },
  { label: 'DolphinL', value: 'Dolphin' },
  { label: 'WhaleL', value: 'Whale' },
  { label: 'OctopusL', value: 'Octopus' },
  { label: 'CrabL', value: 'Crab' },
  { label: 'LobsterL', value: 'Lobster' },
];

//하나인 경우
//Output
//'Shark' 'Shark'
//function App() {
//  return (
//    <div className="App">
//      <Select
//        options={aquaticCreatures}
//		onChange={opt => console.log(opt.label, opt.value)}
//      />
//    </div>
//  );
//}
//복수선택

function App() {
  return (
    <div className="App">
      <Select
        options={aquaticCreatures}
 		isMulti
  		onChange={opt => console.log(opt)}     
 	/>
    </div>
  );
}

export default App;