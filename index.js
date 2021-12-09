const express = require('express')
const app = express();
const environment = require("./environment/environment")
const port = environment.port;
const excelWriter = require("./helpers/write-data-to-csv"); //write operations performed on the csv file
const extractIP = require("./helpers/extract-ip");//extract ip from the log entry
const geoLocation = require("./helpers/fetch-location-ip");//extract location from the ip address
const deviceDetails = require("./helpers/fetch-device-details");//extract user agent from the log entry and find device information
const getURL = require('./helpers/fetch-url')//extract url from log entry
const fs = require('fs')
const path = require('path');
const options = {
  root: path.join(__dirname)
};


excelWriter.csvWriter();

app.get('/', async (req, res) => {

  let result = []
  fs.readFile('./access-log-files/access.log', 'utf8', async (err, data) => {
    if (err) {
      console.log(err)
      return err
    } else {

      const parsedData = data.split("\n")
      for (let i = 0; i < parsedData.length; i++) {
        let ipAddress = await extractIP.getIpAddress(parsedData[i])
        if (!ipAddress) { continue }
        let URL = await getURL.extractURL(parsedData[i]);
        let location = await geoLocation.extractLocation(ipAddress[0].length ? ipAddress[0] : '')
        let device = await deviceDetails.fetchDeviceInfo(parsedData[i]);

        result.push({
          ipAddress: ipAddress[0],
          city: location.city,
          country: location.country,
          browser: device.browser.name ? device.browser.name : '',
          deviceType: device.device.type ? device.device.type : ''
        }, { url: URL ? URL[0] : '' });

      }

      await excelWriter.writeRecords(result);
      res.sendFile("./access-log-report/logData.csv", options);
    }
  });

});

app.listen(port, () => { });
