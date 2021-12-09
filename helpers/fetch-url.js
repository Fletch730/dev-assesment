const regex = /\bhttps?:\/\/\S+/gi

exports.extractURL = async (logEntry) => {
    return logEntry.match(regex)
}