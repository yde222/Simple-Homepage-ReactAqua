import React, { useEffect  } from 'react';
//useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기

function User({ user, onRemove, onToggle  }) {
	useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
  	console.log(user);
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
  	console.log(user);
    };
  }, []);
  // useEffect(() => {
  //   console.log(user);
  // });
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
  	onClick={() => onToggle(user.id)}
	>{user.username}</b> 
	 &nbsp;
	<span>({user.email})</span>
     	<button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList12({users, onRemove, onToggle  }) {

  return (
    <div>
      {users.map(user => (
        <User user={user}  key={user.id}  onRemove={onRemove} 
		 onToggle={onToggle}/>
      ))}
    </div>
  );
  }

export default UserList12;