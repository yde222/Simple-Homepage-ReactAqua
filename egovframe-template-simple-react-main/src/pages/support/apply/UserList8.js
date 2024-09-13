import React, { useState, useRef  } from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList8() {
  const users = [
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
  ];
//동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 map() 을 사용
//리액트에서 배열을 렌더링 할 때에는 key 라는 props 를 설정 (고유값)
//고유 원소에 key 가 있어야만 배열이 업데이트 될 때 효율적으로 렌더링
//수정되지 않는 기존의 값은 그대로 두고 원하는 곳에 내용을 삽입하거나 삭제하기 때문
  return (
    <div>
      {users.map(user => (
        <User user={user}  key={user.id} />
      ))}
    </div>
  );
  }

export default UserList8;