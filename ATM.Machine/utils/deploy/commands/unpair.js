'use strict';

var cp = require('child_process');
var async = require('./async');
var report = require('./report').report;

var hardwareCode = process.argv[2] || 'N7G1';

var connectionInfoPath = hardwareCode === 'N7G1' ?
  '/var/lib/sencha/connection_info.json' :
  '/var/lib/atm_base-machine/connection_info.json';

var restartCommand = hardwareCode === 'N7G1' ?
 'poweroff -d 2' :
 'restart atm_base-machine';

var TIMEOUT = 10000;

function command(cmd, cb) {
  cp.exec(cmd, {timeout: TIMEOUT}, function(err) {
    cb(err);
  });
}

console.log('********** STARTED *************');

// TODO: not idempotent, base this on versions
async.waterfall([
  async.apply(report, null, 'started'),
  async.apply(command, 'rm ' + connectionInfoPath),
  async.apply(report, null, 'afterUnpair'),
  async.apply(command, restartCommand),
  async.apply(report, null, 'afterRestart'),
], function(err) {
  report(err, 'finished', function() {
    if (err) throw err;
    console.log('done updatescript');
    process.exit();
  });
});
