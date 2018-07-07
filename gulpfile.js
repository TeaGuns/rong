const gulp = require("gulp")
const sass = require("gulp-sass")
const sourcemaps = require("gulp-sourcemaps")

const del = require("del")

function clean() {
    return del("./dist")
}

function runSass(production) {
    let sassOptions = {
        outputStyle: production ? 'compressed' : 'nested'
    }
    return gulp.src("./src/rong.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist"))
}

gulp.task("clean", clean)
gulp.task("sass", function() {
    return runSass(false)
})
gulp.task("sass-production", function() {
    return runSass(true)
})
gulp.task("default", gulp.series("clean", "sass"))
gulp.task("production", gulp.series("clean", "sass-production"))