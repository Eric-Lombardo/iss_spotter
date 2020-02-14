const { nextISSTimesForMyLocation } = require("./iss_promised");

const printTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printTimes(passTimes)
  })
  // .catch((error) => {
  //   console.log("it didnt work bud ...", error.message)
  // })