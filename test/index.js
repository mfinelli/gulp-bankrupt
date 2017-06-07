const bankrupt = require('../'),
  gulp = require('gulp'),
  path = require('path'),
  test = require('tape');

let fixtures = function(glob) {
  return path.join(__dirname, 'fixtures', glob);
};

test('streaming mode', function(t) {
  gulp.src(fixtures('*'), { buffer: false  })
    .pipe(bankrupt())
    .once('error', function(err) {
      t.equal(err.message, 'Streaming is not currently supported');
      t.end();
    });
});
