import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EgovAdminGalleryEdit = ({ dataList }) => {
    if (!dataList || dataList.length === 0) {
        return <div>No data available</div>;
    }

    // 차트 데이터 생성
    const generateChartData = () => {
        const chartData = {
            options: {
                chart: {
                    id: 'basic-bar' // 막대그래프를 위해 id를 변경
                },
                xaxis: {
                    categories: dataList.map(item => item.frstRegisterPnttm) // 작성일
                }
            },
            series: [{
                name: '조회수',
                data: dataList.map(item => item.inqireCo) // 조회수
            }]
        };
        return chartData;
    };

    return (
        <div>
            <h3>작성일과 조회수 변화</h3>
            {/* 차트 표시 */}
            <ReactApexChart options={generateChartData().options} series={generateChartData().series} type="bar" height={350} />
        </div>
    );
}

export default EgovAdminGalleryEdit;
