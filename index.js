var crypto = require('crypto'),
  gutil = require('gulp-util'),
  path = require('path'),
  through = require('through2');

const PLUGIN_NAME = 'gulp-bankrupt',
  DEFAULTS = {
    fileName: 'manifest.json',
    hashAlgorithm: 'md5',
    sriAlgorithm: 'sha384'
  }

var manifest = {};

module.exports = function() {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb();
    }

    if (file.isBuffer()) {
      manifest[file.path] = crypto.createHash(DEFAULTS.hashAlgorithm)
        .update(file.contents).digest('hex');
    }

    // We can't actually support streams right now since we need to do two
    // simultaneous reads of the stream. This seems to be fine though since
    // most gulp plugins don't support streams either. You can checkout
    // commit 946b8300de5a6f5acc9614ab5c974b88857db338 to see an simple hash
    // implementation.
    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME,
        'Streaming is not currently supported'));
    }

    cb();
  }, function(cb) {
    this.push(new gutil.File({
      path: path.join(process.cwd(), DEFAULTS.fileName),
      contents: new Buffer(JSON.stringify(manifest))
    }));
    cb();
  });
};
