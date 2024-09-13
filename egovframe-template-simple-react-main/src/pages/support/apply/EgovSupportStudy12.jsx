import React, {useRef, useState} from 'react';
import CreateUser9 from './CreateUser9';
import UserList12 from './UserList12';
//import Wrapper from './Wrapper';
//useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
//https://react.vlpt.us/basic/16-useEffect.html

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

  return (
    <>
      <CreateUser9 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
	  <UserList12 users={users} onRemove={onRemove}  onToggle={onToggle} />
    </>
  );
}
export default App;