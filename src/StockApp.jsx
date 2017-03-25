import React, { Component } from 'react';
import axios from 'axios';
import StockGraph from './StockGraph';

export default class StockApp extends Component {
  constructor(props) {
    super(props);

    this.state = { stockTicker: 'AAPL', data: [] }; // change to empty string
    this.getStockData = this.getStockData.bind(this);
  }

  componentDidMount() {
    this.getStockData();
  }

  getStockData() {
    axios.get(`${this.props.url}/${this.state.stockTicker}`)
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const config = {
      rangeSelector: {
        selected: 1,
      },
      title: {
        text: 'AAPL Stock Price',
      },
      series: [{
        name: 'AAPL',
        data: this.state.data,
        tooltip: {
          valueDecimal: 2,
        },
      }],
    };

    return (
      <StockGraph config={config} />
    );
  }
}

StockApp.propTypes = {
  url: React.PropTypes.string.isRequired,
};
