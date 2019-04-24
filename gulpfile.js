const argv = require("minimist")(process.argv.slice(2))

const gulp = require("gulp")
const sass = require("gulp-sass")
const sourcemaps = require('gulp-sourcemaps');
const base64 = require("gulp-base64")
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const inline_base64 = require("gulp-inline-base64")
const { src, dest, watch, series, parallel } = require("gulp")

const resetCSS = require("node-reset-scss").includePath

const files = {
  scssPath: "src/scss/*.scss",
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass({outputStyle: argv.production ? 'compressed' : undefined,
    includePaths: [resetCSS]})) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write(".")) // write sourcemaps file in current directory
    .pipe(dest(".")) // put final CSS in dist folder
}

gulp.task("sass", scssTask)

function watchTask() {
  watch([files.scssPath], parallel(scssTask))
}

exports.default = series(watchTask)
