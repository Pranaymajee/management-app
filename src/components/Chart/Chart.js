import React from 'react';
import Chart from './components/Chart/Chart';
import {Bar, Pie} from 'react-chartjs-2';

function Chart(props) {
  return (
    <div>{props.value1}</div>
  )
}

export default Chart