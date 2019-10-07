import React from 'react';
import './App.css';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			options: {
				chart: {
					shadow: {
						enabled: true,
						color: '#000',
						top: 18,
						left: 7,
						blur: 10,
						opacity: 1
					},
					toolbar: {
						show: false
					}
				},
				colors: [ '#77B6EA', '#545454' ],
				dataLabels: {
					enabled: true
				},
				stroke: {
					curve: 'smooth'
				},
				title: {
					text: 'Average High & Low Temperature',
					align: 'left'
				},
				grid: {
					borderColor: '#e7e7e7',
					row: {
						colors: [ '#f3f3f3', 'transparent' ], // takes an array which will be repeated on columns
						opacity: 0.5
					}
				},
				markers: {
					size: 6
				},
				xaxis: {
					categories: [ '1', '2','3','4','5','6','7','8','9','10' ],
					title: {
						text: 'Miesiąc'
					}
				},
				yaxis: {
					title: {
						text: 'Temperatura'
					},
					min: 5,
					max: 40
				},
				legend: {
					position: 'top',
					horizontalAlign: 'right',
					floating: true,
					offsetY: -25,
					offsetX: -5
				}
			},
			series: [
			
			]
		};
	}

	odczytaj = () => {

		axios
			.get('http://localhost:8080/api/temperature')
			.then((response) => {
       // const state = this.state;
				const data = response.data.map((value) => value.value);
        const date = response.data.map((value) => moment(new Date(+value.dateTime)).format("h:mm:ss "));
        const obj = {
          ...this.state.options, 
          xaxis: {
					categories: date,
					title: {
						text: 'Miesiąc'
					}
        }
      };
				this.setState({
          series: [ { name: 'Temperatura', data } ], 
          options: obj
				});
			})
			.catch((error) => {
				console.log(error);
      });
      
      axios
			.get('http://localhost:8080/api/humidity')
			.then((response) => {
       // const state = this.state;
        const data = response.data.map((value) => value.value);
				this.setState({
          series: [...this.state.series, { name: 'Wigotność', data }  ],
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

  componentDidMount(){
    this.odczytaj();
  }
	render() {
		return (
			<div>

				<div id="chart">
					<ReactApexChart
						options={this.state.options}
						series={this.state.series}
						type="line"
						width={900}
						height={420}
					/>
				</div>

				{/* <LineChart
            sets={[
              arrayOfValue,
            ]}
            times={[
               arrayOfDate.map((e) => new Date(e))
            ]}
        /> */}
			</div>
		);
	}
}

export default App;
