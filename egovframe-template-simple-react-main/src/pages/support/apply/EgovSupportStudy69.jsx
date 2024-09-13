//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://react.dev/learn/updating-objects-in-state

// Copying objects with the spread syntax 
// In the previous example, the position object is always created fresh from the current cursor position. 
// But often, you will want to include existing data as a part of the new object you’re creating. 
// For example, you may want to update only one field in a form, 
// but keep the previous values for all other fields.

// These input fields don’t work because the onChange handlers mutate the state:

// 스프레드 구문으로 객체 복사
// 이전 예제에서 위치 개체는 항상 현재 커서 위치에서 새로 생성됩니다.
// 그러나 종종 기존 데이터를 생성하는 새 객체의 일부로 포함하고 싶을 것입니다.
// 예를 들어 양식에서 하나의 필드만 업데이트하고 싶을 수 있습니다.
// 그러나 다른 모든 필드에 대해 이전 값을 유지합니다.

// 이 입력 필드는 onChange 핸들러가 상태를 변경하기 때문에 작동하지 않습니다.


// import { useState } from 'react';

// export default function Form() {
//   const [person, setPerson] = useState({
//     firstName: 'Barbara',
//     lastName: 'Hepworth',
//     email: 'bhepworth@sculpture.com'
//   });

//   function handleFirstNameChange(e) {
//     person.firstName = e.target.value;
//   }

//   function handleLastNameChange(e) {
//     person.lastName = e.target.value;
//   }

//   function handleEmailChange(e) {
//     person.email = e.target.value;
//   }

//   return (
//     <>
//       <label>
//         First name:
//         <input
//           value={person.firstName}
//           onChange={handleFirstNameChange}
//         />
//       </label>
//       <label>
//         Last name:
//         <input
//           value={person.lastName}
//           onChange={handleLastNameChange}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           value={person.email}
//           onChange={handleEmailChange}
//         />
//       </label>
//       <p>
//         {person.firstName}{' '}
//         {person.lastName}{' '}
//         ({person.email})
//       </p>
//     </>
//   );
// }

// For example, this line mutates the state from a past render:

// person.firstName = e.target.value;

// The reliable way to get the behavior you’re looking for is to create a new object and pass it to setPerson. 
// But here, you want to also copy the existing data into it because only one of the fields has changed:

// setPerson({
//   firstName: e.target.value, // New first name from the input
//   lastName: person.lastName,
//   email: person.email
// });

// You can use the ... object spread syntax so that you don’t need to copy every property separately.

// setPerson({
//   ...person, // Copy the old fields
//   firstName: e.target.value // But override this one
// });
// Now the form works!

// Notice how you didn’t declare a separate state variable for each input field. 
// For large forms, keeping all data grouped in an object is very convenient—as long as you update it correctly!

// 예를 들어, 이 줄은 과거 렌더링의 상태를 변경합니다.

// person.firstName = e.target.value;
// 찾고 있는 동작을 얻을 수 있는 신뢰할 수 있는 방법은 새 개체를 만들어 setPerson에 전달하는 것입니다.
// 그러나 여기서는 필드 중 하나만 변경되었기 때문에 기존 데이터도 복사하려고 합니다.

// setPerson({
// firstName: e.target.value, // 입력의 새 이름
// 성: 사람.성명,
// 이메일: 사람.이메일
// });
// 모든 속성을 개별적으로 복사할 필요가 없도록 ... 객체 확산 구문을 사용할 수 있습니다.

// setPerson({
// ...person, // 이전 필드 복사
// firstName: e.target.value // 하지만 이 항목을 재정의합니다.
// });
// 이제 양식이 작동합니다!

// 각 입력 필드에 대해 별도의 상태 변수를 선언하지 않은 방법에 유의하십시오.
// 큰 양식의 경우 모든 데이터를 개체에 그룹화하는 것이 매우 편리합니다. 올바르게 업데이트하는 한!

// Note that the ... spread syntax is “shallow”—it only copies things one level deep. 
// This makes it fast, but it also means that if you want to update a nested property,
//  you’ll have to use it more than once.

// 확산 구문은 "얕음"이라는 점에 유의하십시오. 한 수준 깊이만 복사합니다.
// 이렇게 하면 속도가 빨라지지만 중첩된 속성을 업데이트하려는 경우
// 한 번 이상 사용해야 합니다.

import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
