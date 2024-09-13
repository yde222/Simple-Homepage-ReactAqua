import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { GALLERY_BBS_ID } from 'config';

//다국어지원 임포트 
import enUsMsg from "../../../AquaLang/EgovNoticeCrop_en-us.json";
import koMsg from "../../../AquaLang/EgovNoticeCrop_ko.json";
import { IntlProvider } from 'react-intl'; 
import { FormattedMessage } from 'react-intl';

const CalendarWithFisheryList = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [viewType, setViewType] = useState('weekly');//초기값은 일주일
  const [fisheryList, setFisheryList] = useState([]);
  const [selectedFishery, setSelectedFishery] = useState(null);
  const [chartData, setChartData] = useState([]);

  const bbsId = GALLERY_BBS_ID;
  const location = useLocation();

//다국어지원 설정
const locale = localStorage.getItem("locale") ?? "ko";
const messages = { "en-US": enUsMsg, ko: koMsg }[locale]

  const [searchCondition, setSearchCondition] = useState(
    location.state?.searchCondition || { bbsId: bbsId, pageIndex: 1, searchCnd: '0', searchWrd: '' }
  );

  const retrieveFisheryList = () => {
    const retrieveDetailURL = 'http://localhost:8080/cop/est/selectFisherygeListAPI.do';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(searchCondition),
    };

    fetch(retrieveDetailURL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setFisheryList(data.resultList || []);
      })
      .catch((error) => {
        console.error('Error fetching fishery data:', error);
        setFisheryList([]);
      });
  };

  useEffect(() => {
    retrieveFisheryList();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  const handleFisherySelect = (event) => {
    const selectedFisheryId = event.target.value;
    // selectedFisheryId가 string이므로, fishery.id도 string으로 변환하여 비교
    const selectedFishery = fisheryList.find(fishery => String(fishery.id) === selectedFisheryId);

    setSelectedFishery(selectedFishery);
  };

  const fetchChartData = () => {

	        //console.error('fetchChartData:selectedDate', selectedDate);
	        //console.error('fetchChartData:selectedFishery', selectedFishery);
	        //console.error('fetchChartData:viewType', viewType);

    if (!selectedDate || !selectedFishery || !viewType) return;

	        //console.error('fetchChartData2:selectedDate', selectedDate);
	        //console.error('fetchChartData2:selectedFishery', selectedFishery);
	        //console.error('fetchChartData2:viewType', viewType);
	let startDate = new Date(selectedDate); // 시작일을 선택된 날짜로 설정
    const endDate = new Date(selectedDate);
    switch (viewType) {
      //case 'daily':
      //  startDate.setDate(endDate.getDate() - 1); // 하루치 데이터
      //  break;
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

    const requestOptions = {

      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        fisheryId: selectedFishery.id,
        //selectedDate: selectedDate.toISOString().split('T')[0], // yyyy-mm-dd 형식으로 변환
        selectedDateFrom: startDate, // yyyy-mm-dd 형식으로 변환
        selectedDate: endDate,
        viewType: viewType,
      }),
    };

    fetch('http://localhost:8080/cop/est/getFisherygeData.do', requestOptions)
      .then((response) => response.json())

	.then((data) => {
	    // 서버에서 받은 전체 응답을 먼저 확인
	    console.log('Server response data:', data);
    	if (Array.isArray(data.chartData.resultList)) {
	        // 데이터 형식이 맞는지 확인
	        console.log('resultList:', data.chartData.resultList);
	        const formattedData = data.chartData.resultList.map(item => ({
    	        date: item.tempdate, // 서버에서 받은 날짜 필드명에 맞게 수정
        	    value: item.temp,    // 서버에서 받은 값 필드명에 맞게 수정
        	}));
        	setChartData(formattedData);
    	} else {
      		console.error('Invalid chart data format:', data.chartData.resultList);
      		setChartData([]); // Invalid data fallback
    	}
  	})
    .catch((error) => {
        console.error('Error fetching chart data:', error);
        setChartData([]);
    });
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedDate, selectedFishery, viewType]);

  const chartOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: chartData.map((dataPoint) => dataPoint.date),
    },
  };

  const chartSeries = [
    {
      name: 'Fishery Data',
      data: chartData.map((dataPoint) => dataPoint.value),//y축
    },
  ];

  return (
  <IntlProvider locale={locale} messages={messages}>  {/* <!-- 다국어지원 --> */}
    <div>
      <div>
        <label>
          <input type="radio" value="weekly" checked={viewType === 'weekly'} onChange={handleViewTypeChange} />
          <FormattedMessage id="weekly" defaultMessage="주(일단위)" />
        </label>
        <label>
          <input type="radio" value="monthly" checked={viewType === 'monthly'} onChange={handleViewTypeChange} />
          <FormattedMessage id="monthly" defaultMessage="월(일단위)" />
        </label>
        <label>
          <input type="radio" value="quarterly" checked={viewType === 'quarterly'} onChange={handleViewTypeChange} />
          <FormattedMessage id="quarterly" defaultMessage="분기(일단위)" />
        </label>
      </div>

      <div>
        <h3><FormattedMessage id="fisheryList" defaultMessage="양식장 목록" />:</h3>
        <select 
          onChange={handleFisherySelect} 
          style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
          size="5"
        >
          {Array.isArray(fisheryList) && fisheryList.length > 0 ? (
            fisheryList.map((fishery, index) => (
              <option key={index} value={fishery.id}>
                {fishery.name}
              </option>
            ))
          ) : (
            <option value="">No fisheries available</option>
          )}
        </select>
      </div>

      {selectedFishery && (
        <div>
          <h3><FormattedMessage id="selectedFishery" defaultMessage="Selected Fishery" />:</h3>
          <p><strong>ID:</strong> {selectedFishery.id}</p>
          <p><strong>Name:</strong> {selectedFishery.name}</p>
        </div>
      )}

      <DatePicker selected={selectedDate} onChange={handleDateChange} />

	  <div>
    	<h3><FormattedMessage id="fisheryData" defaultMessage="Fishery Data" />:</h3>
    	{chartData.length > 0 ? (
    	  <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
    	) : (
      	<p>No chart data available</p>
    	)}
	  </div>
    </div>
  </IntlProvider>  
  );
};

export default CalendarWithFisheryList;
