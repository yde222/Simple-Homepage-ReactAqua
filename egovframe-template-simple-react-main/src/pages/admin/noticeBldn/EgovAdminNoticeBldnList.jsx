import React from 'react';
import ReactApexChart from 'react-apexcharts';

class EgovAdminNoticeBldnList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Series 1',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        },
        {
          name: 'Series 2',
          data: [45, 52, 38, 70, 67, 82, 95, 115, 140]
        },
        {
          name: 'Series 3',
          data: [60, 70, 55, 80, 77, 92, 105, 130, 155]
        }
      ],
      options: {
        chart: {
          height: 700,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Monthly Sales',
          align: 'left'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={700} />
      </div>
    );
  }
}


export default EgovAdminNoticeBldnList;