const IOTA = require('iota.lib.js');
const fs = require('fs');
const path = require('path');
const addrFile = 'addr.txt';
var iota = new IOTA({
    'host': 'http://localhost',
    'port': 14265
});

// now you can start using all of the functions
iota.api.getNodeInfo(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log(success);
    }
});

// check if address exists
function getAddr (addrFile, callback) {
  fs.exists(addrFile, function(exists) {
    if (exists) {
      fs.readFile(addrFile, 'utf8', (err, data) => {
        if (err) throw err;
        callback(data);
      });
    } else {
      var seed = Math.random().toString();
      console.log("seed: " + seed);
      seed = iota.utils.toTrytes(seed);
      console.log("seedtrytes: " + seed);
      var options = {
      		checksum: true,
      		security: 2
      }
      iota.api.getNewAddress(seed, options, function( error, result ) {
          fs.writeFile(addrFile, addr, (err) => {console.log(err)});
          callback(result);
      });
    }
  });
}



getAddr(addrFile, (addr)=>{console.log(addr)});
