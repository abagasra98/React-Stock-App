import React, { Component } from 'react';
import DATA from '../data';

const ReactHighcharts = require('react-highcharts');

export default class StockGraph extends Component {
  render() {
    return (
      <ReactHighcharts config={DATA} />
    );
  }
}
