import React, {useRef, useState} from 'react';
import CreateUser9 from './CreateUser9';
import UserList9 from './UserList9';
//import Wrapper from './Wrapper';
// 배열에 항목 추가하기
//https://react.vlpt.us/basic/13-array-insert.html

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
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
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
  return (
    <>
      <CreateUser9 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList9 users={users} />
    </>
  );
}
export default App;