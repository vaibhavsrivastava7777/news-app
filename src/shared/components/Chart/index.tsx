import React from 'react';
import { Line } from 'react-chartjs-2';

interface Datasets {
    data: string[];
    [key: string]: any;
}

interface Data {
    labels: string[];
    datasets: Datasets[];
}

interface Chart {
    upVoteMap: UpVoteMap[];
}

interface UpVoteMap {
    [key: string]: string;
}

const data: Data = {
    labels: [],
    datasets: [
        {
            label: 'Up Votes',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
        },
    ],
};

const Chart: React.FC<Chart> = (props) => {
    console.log(props);
    const { upVoteMap = {} } = props;
    data.labels = Object.keys(upVoteMap);
    data.datasets[0].data = Object.values(upVoteMap || []);
    return <div>{data.labels.length && <Line data={data} />}</div>;
};
export default Chart;
