import React, {useRef, useState, useMemo} from 'react';
import CreateUser9 from './CreateUser9';
import UserList12 from './UserList12';
//import Wrapper from './Wrapper';
//useMemo 를 사용하여 연산한 값 재사용
//https://react.vlpt.us/basic/17-useMemo.html

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
 const [users, setUsers] = useState([
//  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
		  active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
		 active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
		 active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

  	setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

	const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };

	const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

//const count = countActiveUsers(users);
//useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 
//deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 
//만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.
  const count = useMemo(() => countActiveUsers(users), [users]);
 
  return (
    <>
      <CreateUser9 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
	  <UserList12 users={users} onRemove={onRemove}  onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}
export default App;