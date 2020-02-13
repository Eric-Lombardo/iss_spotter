const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = function(ipString, callback) {
  let fullURL = "https://ipvigilante.com/" + ipString;

  request(fullURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code is: ${response.statusCode}`), null);
      return;
    }

    const geoPointsLat = JSON.parse(body).data.latitude;
    const geoPointsLon = JSON.parse(body).data.longitude;
    let outputGeoPoints = {
      latitude: geoPointsLat,
      longitude: geoPointsLon
    };

    return callback(null, outputGeoPoints);
  });
};


const fetchISSFlyOverTimes = function(geoObj, callback) {
  const fullURL = `http://api.open-notify.org/iss-pass.json?lat=${geoObj.latitude}&lon=${geoObj.longitude}`;

  request(fullURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`status code is not OK`), null);
      return;
    }

    let outputArr = JSON.parse(body).response;
    return callback(null, outputArr);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      })
    })
  })
}


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
