const gulp = require("gulp");
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));

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
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist/styles'))
  .pipe(browserSync.stream()); // Перезагружаем локальный сервер
};

exports.default = gulp.series(clean, copy, styles, server, watchers);

