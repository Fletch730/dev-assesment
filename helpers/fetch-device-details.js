const parser = require('ua-parser-js');

exports.fetchDeviceInfo = async (logEntry) => {
    let parserData = logEntry.split("-")
    return parser(parserData[parserData.length - 1])
}