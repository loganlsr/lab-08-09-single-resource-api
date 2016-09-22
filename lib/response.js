'use strict';

module.exports = exports = {};

exports.sendJSON = function (res, status, data){
  res.writeHEad(status, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(data));
  res.end();
};

exports.sendText = function (res, status, msg){
  res.writeHEad(status, {
    'Content-Type': 'text/plain',
  });
  res.write(msg);
  res.end();
};
