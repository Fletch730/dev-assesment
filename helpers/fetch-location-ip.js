var geoip = require('geoip-lite');

exports.extractLocation = async (ipAddress) => {
    return ipAddress ? geoip.lookup(ipAddress) : '';
}