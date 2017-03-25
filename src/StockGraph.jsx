import React from 'react';

const ReactHighstock = require('react-highcharts/ReactHighstock.src');

export default function StockGraph(props) {
  return (
    <ReactHighstock config={props.config} />
  );
}

StockGraph.propTypes = {
  config: React.PropTypes.object.isRequired,
};
