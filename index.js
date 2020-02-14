// index.js

// The code below is temporary and can be commented out.
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("67.71.216.6", (error, data) => {
//   if (error) {
//     console.log("uh-oh", error);
//     return;
//   }

//   console.log("yuppie", data);
// });

// let testData = { latitude: '43.63190', longitude: '-79.37160' };
// fetchISSFlyOverTimes(testData, (error, data) => {
//   if (error) {
//     console.log("nuh-huh!!!", error);
//     return;
//   }

//   console.log("nailed it!", data);
// });

const printTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  return printTimes(passTimes);
});

