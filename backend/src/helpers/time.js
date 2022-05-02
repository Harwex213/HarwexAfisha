module.exports.getNextDay = (date) => {
    const newDate = new Date(date);
    newDate.setUTCDate(newDate.getUTCDate() + 1);
    newDate.setUTCHours(0);
    newDate.setUTCMinutes(0);
    newDate.setUTCSeconds(0);
    newDate.setUTCMilliseconds(0);
    return newDate;
};

module.exports.getWithAddMinutes = (date, add) => {
    const newDate = new Date(date);
    newDate.setUTCMinutes(date.getUTCMinutes() + add);
    return newDate;
};
