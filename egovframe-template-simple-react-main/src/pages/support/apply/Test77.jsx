//https://unit-15.tistory.com/71
//[React] prop-types 사용법
 
// import React from 'react';

// Food.propTypes = {
//     greeting: PropTypes.string.isRequired,
//     name: PropTypes.number.isRequired,
// }

// function Food() {
//     return (
//         <Test
//             greeting="hello"
//             num='123'
//         />
//     );
// }

// export default Food;

import React from 'react';
import PropTypes from 'prop-types';

function Test(props) {
    // greeting prop이 "hello"인지 확인하여 true 또는 false를 반환
    const isGreetingHello = props.greeting === "hello";
   const isCount = props.count === "6";

    return (
        <div>
            {isGreetingHello.toString()} <br/> {/* true 또는 false 출력 */}
            {isCount.toString()} {/* true 또는 false 출력 */}
        </div>
    );
}

Test.propTypes = {
    greeting: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
}

export default Test;
