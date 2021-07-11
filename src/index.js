const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const { YELP_SEARCH_PARKING_API_URL, YELP_KEY } = require('./constants');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//create a server object:
app.get('/', function (req, res) {
  res.write('Hello from Durgesh Singh!...');
  res.end(); //end the response
});

app.get('/getparkingbylocation', function (req, res) {
  const { location, limit = 20 } = req.query || {};
  console.log('location ', location);
  if (location) {
    axios
      .get(`${YELP_SEARCH_PARKING_API_URL}${location}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${YELP_KEY}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res
          .status(500)
          .send(`Something went wrong due to ${err && err.message}`);
      });
  } else {
    res.status(500).send('Please enter valid address.');
  }
});

app.listen(8080, function () {
  console.log('server running on 8080');
}); //the server object listens on port 8080
