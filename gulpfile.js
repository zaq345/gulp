const gulp = require("gulp");
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));
//
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');

const pug = require('gulp-pug');

const concat = require('gulp-concat');
const babel = require('gulp-babel');

const gulpif = require('gulp-if');
const {SRC_PATH, DIST_PATH} = require('./gulp.config')
const env = process.env.NODE_ENV;

/**
 * Очищаем папку dist
 */
const clean = () => {
  return del(DIST_PATH);
};

/**
 * Запускаем сервер
 */
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: DIST_PATH
    }
  });
  done();
};

// обновляем сервер
const reload = (done) => {
  browserSync.reload();
  done();
};

// следим за html
const watchers = (done) => {
  gulp.watch(SRC_PATH + '/**/*.pug', gulp.series(compilePug, reload));
  gulp.watch(SRC_PATH + '/**/*.scss', gulp.series(compileScss));
  gulp.watch(SRC_PATH + '/assets/*.*', gulp.series(copyImg, reload));
  gulp.watch(SRC_PATH + '/**/*.js', gulp.series(concatJS, reload));
  gulp.watch(SRC_PATH + '/assets/slick/*.*', gulp.series(reload))
  done();
};

// компиляция стилей
const compileScss = () => {
  return gulp.src(SRC_PATH + '/styles/main.scss')
  .pipe(gulpif(env === "serve", sourcemaps.init())) 
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulpif(env === "build", autoprefixer(['last 4 versions']))) 
  .pipe(gulpif(env === "build", gcmq()))
  .pipe(gulpif(env === "build", cleanCSS()))
  .pipe(gulpif(env === "serve", sourcemaps.write())) 
  .pipe(gulp.dest(DIST_PATH + '/styles'))
  .pipe(browserSync.stream()); 
};

const compilePug = () => {
  return gulp.src(SRC_PATH + '/pages/*.pug')
  .pipe(pug({
    pretty: true,
  }))
  .pipe(gulp.dest(DIST_PATH))
}

const copyImg = () => {
  return gulp.src(SRC_PATH + '/assets/*.*')
    .pipe(gulp.dest(DIST_PATH + '/images'));
};

const concatJS = () => {
  return gulp.src(SRC_PATH + '/js/*.js')
  .pipe(gulpif(env === "serve", sourcemaps.init())) 
  .pipe(concat('main.js'))
  .pipe(gulpif(env === "build", babel({
    presets: ['@babel/env']
  })))
  .pipe(gulpif(env === "serve", sourcemaps.write())) 
  .pipe(gulp.dest(DIST_PATH + '/js'));
};

const copyVendorsJS = () => {
  return gulp.src(SRC_PATH + '/js/vendors/*.js')
    .pipe(gulp.dest(DIST_PATH + '/js'));
};

const copySlickFiles = () => {
  return gulp.src(SRC_PATH + '/assets/slick/**')
    .pipe(gulp.dest(DIST_PATH + '/styles'));
};

exports.serve = gulp.series(
  clean, 
  gulp.parallel(copyImg, copyVendorsJS, copySlickFiles, compilePug, compileScss, concatJS), 
  gulp.parallel(watchers, server)
); 

exports.build = gulp.series(
  clean, 
  gulp.parallel(copyImg, copyVendorsJS, copySlickFiles, compilePug, compileScss, concatJS), 
); 
