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

    if (file.isStream()) {
      var hash = crypto.createHash(DEFAULTS.hashAlgorithm);
      hash.setEncoding('hex');

      file.on('end', function() {
        hash.end();
        manifest[file.path] = hash.read();
      });

      file.pipe(hash);
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
