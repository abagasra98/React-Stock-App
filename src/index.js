import React from 'react';
import ReactDOM from 'react-dom';
import StockApp from './StockApp';

ReactDOM.render(
  <StockApp url="http://localhost:3001/api/stocks" />,
  document.getElementById('root')
);
