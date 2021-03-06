const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// export helper functions to separate 'utils' files
function parseJsonResponse(response) {
  const parsedData = [];
  const dataArray = response.dataset.data;

  dataArray.forEach((dayData) => {
    const parsedDayData = [];
    parsedDayData.push(Math.floor(Date.parse(dayData[0]))); // make indices constants
    parsedDayData.push(dayData[1]);
    parsedData.push(parsedDayData);
  });

  return parsedData.reverse();
}

router.get('/', (req, res) => {
  res.json({ message: 'API Initialized' });
});

router.route('/stocks/:stock_ticker')
  .get((req, res) => {
    const baseUrl = 'https://www.quandl.com/api/v3/datasets/WIKI/'; // export to helper func
    const currentTimestamp = '2017-03-25';// Math.floor(Date.now() / 1000);
    const beginTimestamp = '2016-01-01';// Math.floor(Date.parse('01/01/2017') / 1000);
    const requestUrl = `${baseUrl}${req.params.stock_ticker}.json?start_date=${beginTimestamp}&end_date=${currentTimestamp}&api_key=${process.env.QUANDL_API_KEY}`;

    axios.get(requestUrl)
      .then(response => res.send(parseJsonResponse(response.data)))
      .catch(err => res.send(err));
  });

app.use('/api', router);

/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
/* eslint-enable no-console */
