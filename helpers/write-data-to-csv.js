const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let excelWriter
exports.csvWriter = async () => {
  try {
    excelWriter = createCsvWriter({
      path: './access-log-report/logData.csv',
      header: [
        { id: 'ipAddress', title: 'IP ADDRESS' },
        { id: 'city', title: 'CITY' },
        { id: 'country', title: 'COUNTRY' },
        { id: 'browser', title: 'BROWSER' },
        { id: 'deviceType', title: 'TYPE' },
        { id: 'url', title: 'URL' },

      ]
    });
  } catch (err) {
    console.log(err)
  }

}

exports.writeRecords = async (logData) => {
  try {
    await excelWriter.writeRecords(logData);
    return "success"
  } catch (err) {
    console.log(err);
    return "failure"
  }

}