var moment = require('moment');

var generateMessage = (from, text, emoji) =>{
  return {
    from,
    text,
    emoji,
    createdAt: moment().valueOf()
  };
};

var generateLocMsg = (from, lat, lng) =>{
  return {
    from,
    url: `https://www.google.com/maps/?q=${lat},${lng}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocMsg};
//
