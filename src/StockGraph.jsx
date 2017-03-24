import React, { Component } from 'react';
import CONFIG from '../data';

const ReactHighstock = require('react-highcharts/ReactHighstock.src');

export default class StockGraph extends Component {
  render() {
    return (
      <ReactHighstock config={CONFIG} />
    );
  }
}
