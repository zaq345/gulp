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

/**
 * Очищаем папку dist
 */
const clean = () => {
  return del("dist");
};

/**
 * Копируем все содержимое из папки src в dist
 */
const copy = () => {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist"))
};

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
  gulp.watch('src/**/*.html').on('all', gulp.series(copy, reload));
  gulp.watch('src/**/*.scss', gulp.series(styles));
  done();
};

// компиляция стилей
const styles = () => {
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

/**
 * настройка работы плагинов: gulp-sourcemaps, gulp-sass-glob, 
 * autoprefixer, gulp-group-css-media-queries, gulp-clean-css.
 * (вернее попытка)
 */
 
exports.default = gulp.series(clean, copy, styles, server, watchers);

