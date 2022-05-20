const gulp = require("gulp");
const del = require("del");
const browserSync = require("browser-sync").create();

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
  return gulp.src("src/**/*.*")
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

const reload = (done) => {
  browserSync.reload();
  done();
};

const watchers = (done) => {
  gulp.watch('src/**/*.html').on('all', gulp.series(copy, reload));
  done();
};

exports.default = gulp.series(clean, copy, gulp.parallel(server, watchers));

