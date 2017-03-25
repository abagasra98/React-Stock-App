import React, { Component } from 'react';
import axios from 'axios';
import StockGraph from './StockGraph';
import StockForm from './StockForm';

export default class StockApp extends Component {
  constructor(props) {
    super(props);

    this.state = { stockTicker: '', data: [] }; // change to empty string
    this.getStockData = this.getStockData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
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

  loadDataFromServer(ticker) {
    axios.get(`${this.props.url}/${ticker}`)
      .then((res) => {
        this.setState({ stockTicker: ticker, data: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleFormSubmit(ticker) {
    this.loadDataFromServer(ticker);
  }

  getChartData() {
    const config = {
      rangeSelector: {
        selected: 1,
      },
      title: {
        text: `${this.state.stockTicker} Stock Price`,
      },
      series: [{
        name: this.state.stockTicker,
        data: this.state.data,
        tooltip: {
          valueDecimal: 2,
        },
      }],
    };

    return config;
  }

  render() {
    return (
      <div>
        <StockGraph config={this.getChartData()} />
        <StockForm onFormSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

StockApp.propTypes = {
  url: React.PropTypes.string.isRequired,
};
