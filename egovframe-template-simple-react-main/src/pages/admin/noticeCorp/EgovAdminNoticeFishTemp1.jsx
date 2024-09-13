import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactApexChart from 'react-apexcharts';

const CalendarWithRadioButtons = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewType, setViewType] = useState('daily'); // 초기값은 '일'로 설정

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleViewTypeChange = (event) => {
    const newViewType = event.target.value;
    setViewType(newViewType);
  };

const generateSampleData = () => {
  const data = [];
  if (selectedDate) {
    let startDate = new Date(selectedDate); // 시작일을 선택된 날짜로 설정
    const endDate = new Date(selectedDate);
    switch (viewType) {
      case 'daily':
        startDate.setDate(endDate.getDate() - 1); // 하루치 데이터
        break;
      case 'weekly':
        startDate.setDate(endDate.getDate() - 7); // 일주일치 데이터
        break;
      case 'monthly':
        startDate.setMonth(endDate.getMonth() - 1); // 한달치 데이터
        break;
      case 'quarterly':
        startDate.setMonth(endDate.getMonth() - 3); // 세달치 데이터
        break;
      default:
        break;
    }
    // 임의의 데이터 생성
	while (startDate < endDate) {
  		const year = startDate.getFullYear();
  		const month = String(startDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 하고, 두 자리로 만듭니다.
  		const day = String(startDate.getDate()).padStart(2, '0'); // 일을 두 자리로 만듭니다.
  		const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 변환
		if(viewType != 'daily'){
  			data.push({ date: formattedDate, value: Math.floor(Math.random() * 100) }); // 임의의 데이터 생성
		}else{
			//하루인 경우,,,, 24시간 패턴			
			for(var i=0;i<24;i++){
  				data.push({ date: formattedDate+':'+String(i).padStart(2, '0'), value: Math.floor(Math.random() * 100) }); // 임의의 데이터 생성
			}
		}
  		startDate.setDate(startDate.getDate() + 1); // 다음 날짜로 이동
	}
  }
  return data;
};

  const sampleData = generateSampleData();

  // 차트 옵션 설정
  const chartOptions = {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: sampleData.map(dataPoint => dataPoint.date)
    }
  };

  // 차트 시리즈 설정
  const chartSeries = [{
    name: 'Sample Data',
    data: sampleData.map(dataPoint => dataPoint.value)
  }];

  return (
    <div>
      {/* 라디오 버튼 */}
      <div>
        <label>
          <input type="radio" value="daily" checked={viewType === 'daily'} onChange={handleViewTypeChange} />
          일(시간단위)
        </label>
        <label>
          <input type="radio" value="weekly" checked={viewType === 'weekly'} onChange={handleViewTypeChange} />
          주(일단위)
        </label>
        <label>
          <input type="radio" value="monthly" checked={viewType === 'monthly'} onChange={handleViewTypeChange} />
          월(일단위)
        </label>
        <label>
          <input type="radio" value="quarterly" checked={viewType === 'quarterly'} onChange={handleViewTypeChange} />
          분기(일단위)
        </label>
      </div>
      {/* DatePicker */}
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
      {/* 데이터와 함께 꺾은선 차트 */}
      <div>
        <h3>Sample Data:</h3>
        <ul>
          {sampleData.map((dataPoint, index) => (
            <li key={index}>{`${dataPoint.date}: ${dataPoint.value}`}</li>
          ))}
        </ul>
        <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </div>
    </div>
  );
};

export default CalendarWithRadioButtons;
