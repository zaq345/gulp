const gulp = require("gulp");
const del = require("del");
const browserSync = require('browser-sync').create();

/**
 * Очищаем папку dist
 */
const clean = () => {
  return del("build");
};

/**
 * Копируем все содержимое из папки src в dist
 */
const copy = () => {
  return gulp.src('src/**/*.*')
    .pipe(gulp.dest('build'))
};

/**
 * Запускаем сервер
 */

const server = () => {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('src/**/*').on('all', gulp.series(copy, browserSync.reload));
};

exports.default = gulp.series(clean, copy, server);
