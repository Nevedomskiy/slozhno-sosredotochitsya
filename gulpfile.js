const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
}

function html() {
  return gulp
    .src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return gulp
    .src('src/styles/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return gulp
    .src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
}

function jscript() {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({ stream: true }));
}

function favicon() {
  return gulp
    .src('src/favicon/**/*.{png,ico,webmanifest}')
    .pipe(gulp.dest('dist/favicon'))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return gulp
    .src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/styles/**/*.css'], css);
  gulp.watch(['src/scripts/**/*.js'], jscript);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/fonts/**/*'], fonts);
  gulp.watch(['src/favicon/**/*.{png,ico,webmanifest}'], favicon);
}

const build = gulp.series(
  clean,
  gulp.parallel(html, css, images, fonts, jscript, favicon)
);
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.fonts = images;
exports.favicon = favicon;
exports.jscript = jscript;
exports.clean = clean;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
