import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

const cts = require('check-ticker-symbol');

export default class StockForm extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateTicker = this.validateTicker.bind(this);
  }

  validateTicker() {
    if (this.state.value === '') {
      return null;
    } else if (cts.valid(this.state.value)) {
      return 'success';
    }

    return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const ticker = this.state.value.trim();
    // if (!this.validateTicker()) {
    //   return;
    // }
    this.props.onFormSubmit(ticker);
  }

  render() {
    return (
      <form>
        <FormGroup controlId="stockTickerForm" validationState={this.validateTicker()}>
          <ControlLabel>Syncs in realtime across clients</ControlLabel>
          <FormControl
            type="text" value={this.state.value}
            placeholder="Enter Stock Ticker" onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <Button type="submit" bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
      </form>
    );
  }
}

StockForm.propTypes = {
  onFormSubmit: React.PropTypes.func.isRequired,
};
