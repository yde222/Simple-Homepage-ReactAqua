//https://devsakaso.com/react-form-input-textarea-radio-checkbox-select/
import { useState } from "react";

const Sample = () => {
  const [animals, setAnimals] = useState([
    { label: "원숭이", num: 12, checked: false },
    { label: "개", num: 7, checked: false },
    { label: "새", num: 50, checked: false },
  ]);

  const [sum, setSum] = useState(0);
  const onChange = (e) => {
    const newAnimals = animals.map((animal) => {
      const newAnimal = { ...animal };
	alert('내용1'+newAnimal.label+'내용2'+ e.target.value);
      if (newAnimal.label === e.target.value) {
        newAnimal.checked = !newAnimal.checked;
      }
	 alert('newAnimal '+newAnimal.label);
      return newAnimal;
    });
	 alert('newAnimals1 '+newAnimals[0].label);
	 alert('newAnimals2 '+newAnimals[1].label);
    setAnimals(newAnimals);
    let val = 0;
    newAnimals
      .filter((animal) => animal.checked)
      .forEach((animal) => (val += animal.num));

    setSum(val);
  };
  return (
    <>
	  <h2>멀티체크 계산</h2>
      <p className="center"> 선택된 항목의 마리수 합계가 표시됩니다.</p>

    <div>
      {animals.map((animal) => {
        return (
          <div key={animal.label}>
            <input
              id={animal.label}
              type="checkbox"
              value={animal.label}
              onChange={onChange}
            />
            <label htmlFor={animal.label}>
              {animal.label}: {animal.num} 마리
            </label>
          </div>
        );
      })}
      <div>합계：{sum}마리</div>
    </div>
    </>
  );
};

export default Sample;