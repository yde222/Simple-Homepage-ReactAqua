import React, { useState, useRef  } from 'react';
//User 컴포넌트의 삭제 버튼이 클릭 될 때는 user.id 값을 앞으로 props 로 받아올 
//onRemove 함수의 파라미터로 넣어서 호출해주어야 합니다.

function User({ user, onRemove }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
     	<button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList10({users, onRemove }) {

  return (
    <div>
      {users.map(user => (
        <User user={user}  key={user.id}  onRemove={onRemove} />
      ))}
    </div>
  );
  }

export default UserList10;