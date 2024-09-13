import React, {useState, useEffect} from 'react';
//https://d-dual.tistory.com/48
//[ React / Select ] Select의 defaultValue 를 state를 이용하여 동적 변경 시키기.
// UI Library는 Antdesign을 사용.
import { Select } from 'antd';
const { Option } = Select;


const data = [
 {name: "Lee", isStudent: false},
 {name: "Kim", isStudent: true},
 {name: "Park", isStudent: true},
 {name: "Oh", isStudent: false}
];


const MainPage = () => {
  const [listData, setListData] = useState([]); // data state
  
  useEffect(function () {
  	setListData(data); // 최초 1회 data를 listData state에 넣어준다.
  } ,[])
 
 
    const columns = [ // table에서 사용할 columns
        {
          title: "이름",
          dataIndex: "name",
          align: "center",
          width: "80%",
          key: "name",
        },
        {
          title: "나이",
          dataIndex: "age",
          align: "center",
          width: "20%",
          key: "age",
          render: (value) => (
               <Select
                defaultValue={value}
//                onChange={onChange}
              >
                <Option value={true}>학생</Option>
                <Option value={false}>일반인</Option>
              </Select>
            )
        },
    ];
  
  
  function onChangeOption(value){ // Radio 옵션을 변경할때마다 발생할 필터링 이벤트. 
     switch (value) {
      case "all":
        return setListData(data);
        break;
      case "student":
        const filterStudents = data.filter((item) => {
          return item.isStudent === true;
        });
        return setListData(filterStudents);
        break;
      case "ordinary":
        const ordinaryPerson = data.filter((item) => {
          return item.isStudent === false;
        });
        return setListData(ordinaryPerson);
        break;
        };
    };
  
  
  return (
  	<div>
    	{/* <Radio.Group
          defaultValue="all"
          onChange={e => (value) => {
            onChangeOption(value.target.value);
          }}
        >
          <Radio value="all">전체</Radio>
          <Radio value="student">학생</Radio>
          <Radio value="ordinary">일반인</Radio>
        </Radio.Group>
        <Table
            dataSource={listData}
            columns={columns}
          /> */}
    </div>
  )
};

export default MainPage;