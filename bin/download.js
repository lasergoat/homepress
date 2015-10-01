
// from: http://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js
// specifically this comment: http://stackoverflow.com/a/32134846

module.exports = function(url, dest, cb) {

  var fs = require('fs');
  var request = require('request');

  var file = fs.createWriteStream(dest);
  var sendReq = request.get(url);

  // verify response code
  sendReq.on('response', function(response) {
    if (response.statusCode !== 200) {
      return cb('Response status was ' + response.statusCode);
    }
  });

  // check for request errors
  sendReq.on('error', function (err) {
    fs.unlink(dest);

    if (cb) {
      return cb(err.message);
    }
  });

  sendReq.pipe(file);

  file.on('finish', function() {
    file.close(cb);  // close() is async, call cb after close completes.
  });

  file.on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)

    if (cb) {
      return cb(err.message);
    }
  });
}
