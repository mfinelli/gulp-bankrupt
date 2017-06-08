# gulp-bankrupt

[![Build Status](https://travis-ci.org/mfinelli/gulp-bankrupt.svg?branch=master)](https://travis-ci.org/mfinelli/gulp-bankrupt)

An asset manifest generator that includes hashes and subresource integrity.

## Usage

```javascript
const bankrupt = require('gulp-bankrupt'),
  gulp = require('gulp');

gulp.task('bankrupt', function() {
  return gulp.src('./public/*.png').pipe(bankrupt()).pipe(gulp.dest('.'))
});
```

When you run `gulp bankrupt` you should see a file in your `gulp.dest` named
`manifest.json` that has the hashes and sri values for every file in the
input.

For example:

```json
{
  "/home/mario/src/express-example/public/logo.png": {
    "hash":"ef910cd40fefc2b1e641e84e95328425",
    "sri":"sha384-YR9vHfDsFvr2xGF1PXPTa/UPKKZh/U8hYJc9kd+pr/dbNo/on9Ovt2QMKUsJwm9z"
  },
  "/home/mario/src/express-example/public/img1.png": {
    "hash":"4018517e00fbc5a6516857fe1875e989",
    "sri":"sha384-ixgi3CSwa9S3vguJmugaYNA30MCZXW3wSFoOk241yNS1zn9mZVaNoNniJbBUe3e4"
  }
}
```
