//test kpg
//test1 태현
//test2태현
// kpg 72 comment
//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://react.dev/learn/updating-objects-in-state

//Updating a nested object 

// Objects are not really nested 

// An object like this appears “nested” in code:

// let obj = {
//   name: 'Niki de Saint Phalle',
//   artwork: {
//     title: 'Blue Nana',
//     city: 'Hamburg',
//     image: 'https://i.imgur.com/Sd1AgUOm.jpg',
//   }
// };
// However, “nesting” is an inaccurate way to think about how objects behave. 
//When the code executes, there is no such thing as a “nested” object. 
//You are really looking at two different objects:

// let obj1 = {
//   title: 'Blue Nana',
//   city: 'Hamburg',
//   image: 'https://i.imgur.com/Sd1AgUOm.jpg',
// };

// let obj2 = {
//   name: 'Niki de Saint Phalle',
//   artwork: obj1
// };
// The obj1 object is not “inside” obj2. For example, obj3 could “point” at obj1 too:

// let obj1 = {
//   title: 'Blue Nana',
//   city: 'Hamburg',
//   image: 'https://i.imgur.com/Sd1AgUOm.jpg',
// };

// let obj2 = {
//   name: 'Niki de Saint Phalle',
//   artwork: obj1
// };

// let obj3 = {
//   name: 'Copycat',
//   artwork: obj1
// };
// If you were to mutate obj3.artwork.city, it would affect both obj2.artwork.city and obj1.city.
// This is because obj3.artwork, obj2.artwork, and obj1 are the same object. 
//This is difficult to see when you think of objects as “nested”.
// Instead, they are separate objects “pointing” at each other with properties.
//내포된 객체 업데이트

// 객체는 실제로 중첩되지 않습니다.

// 이와 같은 객체는 코드에서 "중첩"된 것으로 나타납니다.

// let obj = {
// 이름: 'Niki de Saint Phalle',
// 아트워크: {
// 제목: '블루나나',
// 도시: '함부르크',
// 이미지: 'https://i.imgur.com/Sd1AgUOm.jpg',
// }
// };
// 그러나 "중첩"은 객체의 동작 방식에 대해 생각하는 부정확한 방법입니다.
//코드가 실행될 때 "중첩된" 개체와 같은 것은 없습니다.
//당신은 실제로 두 개의 서로 다른 객체를 보고 있습니다.

// let obj1 = {
// 제목: '블루나나',
// 도시: '함부르크',
// 이미지: 'https://i.imgur.com/Sd1AgUOm.jpg',
// };

// let obj2 = {
// 이름: 'Niki de Saint Phalle',
// 아트워크: obj1
// };
// obj1 객체는 obj2 "내부"가 아닙니다. 예를 들어 obj3도 obj1을 "가리킬" 수 있습니다.

// let obj1 = {
// 제목: '블루나나',
// 도시: '함부르크',
// 이미지: 'https://i.imgur.com/Sd1AgUOm.jpg',
// };

// let obj2 = {
// 이름: 'Niki de Saint Phalle',
// 아트워크: obj1
// };

// let obj3 = {
// 이름: '카피캣',
// 아트워크: obj1
// };
// obj3.artwork.city를 변경하면 obj2.artwork.city와 obj1.city 모두에 영향을 미칩니다.
// 이는 obj3.artwork, obj2.artwork, obj1이 같은 객체이기 때문입니다.
//객체를 "중첩"으로 생각하면 보기 어렵습니다.
// 대신 속성으로 서로를 "가리키는" 별도의 개체입니다.

// Write concise update logic with Immer 
// If your state is deeply nested, you might want to consider flattening it. 
// But, if you don’t want to change your state structure, you might prefer a shortcut to nested spreads.
//  Immer is a popular library that lets you write using the convenient 
// but mutating syntax and takes care of producing the copies for you. 
// With Immer, the code you write looks like you are “breaking the rules” and mutating an object:

// updatePerson(draft => {
//   draft.artwork.city = 'Lagos';
// });
// But unlike a regular mutation, it doesn’t overwrite the past state!

// Immer로 간결한 업데이트 로직 작성
// 상태가 깊게 중첩된 경우 평면화를 고려할 수 있습니다.
// 그러나 상태 구조를 변경하지 않으려면 중첩된 스프레드에 대한 바로 가기를 선호할 수 있습니다.
// Immer는 편리한 도구를 사용하여 작성할 수 있는 인기 있는 라이브러리입니다.
// 그러나 구문을 변경하고 복사본을 생성합니다.
// Immer를 사용하여 작성하는 코드는 "규칙을 위반"하고 개체를 변경하는 것처럼 보입니다.

// updatePerson(초안 => {
// draft.artwork.city = '라고스';
// });
// 하지만 일반 변이와 달리 과거 상태를 덮어쓰지 않습니다!

// How does Immer work? 
// The draft provided by Immer is a special type of object, called a Proxy, 
// that “records” what you do with it. 
// This is why you can mutate it freely as much as you like! Under the hood, 
// Immer figures out which parts of the draft have been changed, 
// and produces a completely new object that contains your edits.

// To try Immer:

// Run npm install use-immer to add Immer as a dependency
// Then replace import { useState } from 'react' with import { useImmer } from 'use-immer'
// Here is the above example converted to Immer:

// Immer는 어떻게 작동합니까?
// Immer가 제공하는 드래프트는 프록시라고 하는 특별한 유형의 객체입니다.
// 당신이 그것으로 무엇을 하는지 "기록"합니다.
// 원하는 만큼 자유롭게 변형할 수 있는 이유입니다! 후드,
// Immer는 초안의 어떤 부분이 변경되었는지 파악합니다.
// 편집 내용이 포함된 완전히 새로운 개체를 생성합니다.

// 임머를 시도하려면:

// npm install use-immer를 실행하여 Immer를 종속 항목으로 추가
// 그런 다음 import { useState } from 'react'를 import { useImmer } from 'use-immer'로 바꿉니다.
// Immer로 변환된 위의 예는 다음과 같습니다.

// npm install use-immer
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
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




