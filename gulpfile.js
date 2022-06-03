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

var concat = require('gulp-concat');
const babel = require('gulp-babel');

/**
 * Очищаем папку dist
 */
const clean = () => {
  return del("dist");
};

/**
 * Копируем все содержимое из папки src в dist
 */
// const copy = () => {
//   return gulp.src("src/**/*.html")
//     .pipe(gulp.dest("dist"))
// };

/**
 * Запускаем сервер
 */
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: "./dist"
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
  //gulp.watch('src/**/*.html').on('all', gulp.series(copy, reload));
  gulp.watch('src/**/*.pug', gulp.series(compilePug, reload));
  gulp.watch('src/**/*.scss', gulp.series(compileScss));
  gulp.watch('src/assets/*.*', gulp.series(copyImg, reload));
  gulp.watch('src/**/*.js', gulp.series(concatJS, reload));
  done();
};

// компиляция стилей
const compileScss = () => {
  return gulp.src('src/styles/main.scss')
  .pipe(sourcemaps.init()) 
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(['last 4 versions'])) 
  .pipe(gcmq())
  .pipe(cleanCSS())
  .pipe(sourcemaps.write()) 
  .pipe(gulp.dest('./dist/styles'))
  .pipe(browserSync.stream()); 
};

const compilePug = () => {
  return gulp.src('src/pages/*.pug')
  .pipe(pug({
    pretty: true,
  }))
  .pipe(gulp.dest('dist'))
}

const copyImg = () => {
  return gulp.src('src/assets/*.*')
    .pipe(gulp.dest("dist/images"))
};

const concatJS = () => {
  return gulp.src('./src/js/*.js')
  .pipe(sourcemaps.init()) 
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(sourcemaps.write()) 
  .pipe(gulp.dest('dist/js'))
};

exports.default = gulp.series(clean, copyImg, compilePug, compileScss, concatJS, watchers, server); 
