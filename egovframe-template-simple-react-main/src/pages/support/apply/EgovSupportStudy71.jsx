//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://react.dev/learn/updating-objects-in-state

//Updating a nested object 
//Consider a nested object structure like this:

// const [person, setPerson] = useState({
//   name: 'Niki de Saint Phalle',
//   artwork: {
//     title: 'Blue Nana',
//     city: 'Hamburg',
//     image: 'https://i.imgur.com/Sd1AgUOm.jpg',
//   }
// });

// If you wanted to update person.artwork.city, it’s clear how to do it with mutation:

// person.artwork.city = 'New Delhi';
// But in React, you treat state as immutable! In order to change city, 
// you would first need to produce the new artwork object (pre-populated with data from the previous one), 
// and then produce the new person object which points at the new artwork:

// const nextArtwork = { ...person.artwork, city: 'New Delhi' };
// const nextPerson = { ...person, artwork: nextArtwork };
// setPerson(nextPerson);

// Or, written as a single function call:

// setPerson({
//   ...person, // Copy other fields
//   artwork: { // but replace the artwork
//     ...person.artwork, // with the same one
//     city: 'New Delhi' // but in New Delhi!
//   }
// });
// This gets a bit wordy, but it works fine for many cases:

// const [사람, setPerson] = useState({
// 이름: 'Niki de Saint Phalle',
// 아트워크: {
// 제목: '블루나나',
// 도시: '함부르크',
// 이미지: 'https://i.imgur.com/Sd1AgUOm.jpg',
// }
// });

// person.artwork.city를 업데이트하려는 경우 돌연변이를 사용하여 수행하는 방법은 분명합니다.

// person.artwork.city = '뉴델리';
// 그러나 React에서는 상태를 불변으로 취급합니다! 도시를 변경하려면
// 먼저 새 아트워크 객체를 생성해야 합니다(이전 데이터로 미리 채워짐).
// 그런 다음 새 작품을 가리키는 새 사람 개체를 생성합니다.

// const nextArtwork = { ...person.artwork, city: '뉴델리' };
// const nextPerson = { ...사람, 작품: nextArtwork };
// setPerson(nextPerson);

// 또는 단일 함수 호출로 작성:

// setPerson({
// ...사람, // 다른 필드 복사
// artwork: { // 하지만 삽화를 대체합니다.
// ...person.artwork, // 같은 것으로
// 도시: '뉴델리' // 그러나 뉴델리에 있습니다!
// }
// });
// 약간 장황하지만 대부분의 경우 잘 작동합니다.

import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
