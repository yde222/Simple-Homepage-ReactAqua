import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const EgovAdminOper2Edit = ({ dataList }) => {
  const chartRef = useRef(null); // Chart.js 차트 인스턴스를 참조하기 위한 useRef

  // 작성일을 기준으로 각 날짜별로 작성된 게시물의 개수를 세는 함수
  const countPostsByDate = () => {
    const counts = {};
    dataList.forEach(item => {
      const date = item.frstRegisterPnttm.split(' ')[0]; // 작성일에서 날짜 부분만 추출
      counts[date] = (counts[date] || 0) + 1; // 날짜별로 게시물 개수를 세어 counts 객체에 저장
    });
    return counts;
  };

  // 작성일별 게시물 개수를 가져옴
  const postCounts = countPostsByDate();

  // 파이 차트 데이터 생성
  const data = {
    labels: Object.keys(postCounts), // 작성일
    datasets: [
      {
        data: Object.values(postCounts), // 게시물 개수
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 새로운 차트를 생성
    const ctx = chartRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: data,
  		options: {
	//aspectRatio 속성은 차트의 가로세로 비율을 조절하는 역할을 합니다. 
	//값이 1이면 차트의 가로와 세로 길이가 동일한 정사각형 모양이 되고, 
	//값이 2면 가로 길이가 세로 길이의 2배인 직사각형 모양이 됩니다.

//따라서 aspectRatio 값을 2로 설정하면 가로로 긴 형태의 차트가 생성됩니다. 
//이것은 차트의 가로 길이가 세로 길이의 2배인 직사각형 형태로 표시되기 때문에 차트가 작아진 것처럼 보입니다.
      		//aspectRatio: 1, // 가로세로 비율 조정, 1은 정사각형을 의미합니다.
      		aspectRatio: 2, // 가로세로 비율 조정, 1은 정사각형을 의미합니다.
    	}
    });

    // 이전 차트가 있으면 제거
    return () => {
      newChartInstance.destroy();
    };
  }, [dataList]); // dataList가 변경될 때마다 useEffect 실행

  return (
    <div>
      <h2>작성일별 게시물 수</h2>
      {/* <canvas ref={chartRef} />  차트를 그릴 캔버스 요소 */}
		<canvas ref={chartRef} width={50} height={50} />
    </div>
  );
};

export default EgovAdminOper2Edit;
