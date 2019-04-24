const argv = require("minimist")(process.argv.slice(2))

const gulp = require("gulp")
const sass = require("gulp-sass")
const base64 = require("gulp-base64")
const inline_base64 = require("gulp-inline-base64")
const { src, dest, watch, series, parallel } = require("gulp")

const resetCSS = require("node-reset-scss").includePath
const autoprefixer = require("gulp-autoprefixer")

const files = {
  scssPath: "src/scss/*.scss",
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write(".")) // write sourcemaps file in current directory
    .pipe(dest(".")) // put final CSS in dist folder
}

//our CSS pre-processor
gulp.task("sass", function() {
  gulp
    .src("./src/scss/main.scss")

    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
      })
    )

    /*.pipe(base64({
    baseDir: '',
    extensions: ['svg', 'png', /\.jpg#datauri$/i],
    debug: true
  }))*/

    .pipe(
      inline_base64({
        baseDir: __dirname,
        maxSize: 800 * 1024,
        debug: true,
      })
    )

    .pipe(
      sass({
        outputStyle: argv.production ? "compressed" : undefined,
        includePaths: [resetCSS],
      }).on("error", sass.logError)
    )

    .pipe(gulp.dest("."))
})

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  watch([files.scssPath], parallel(scssTask))
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(watchTask)

/*const { watch } = require("gulp")

watch("src/scss/*.scss", { delay: 300 }, "sass")*/
//the development task
/*gulp.task("watch", ["sass"], function(cb) {
  //watch SASS
  gulp.watch("src/scss/*.scss", ["sass"])
})*/
/*
  //the distribution bundle task
  gulp.task('bundle', ['sass'], function() {
    var bundler = browserify(entry, { transform: babelify })
          .bundle()
    return bundler
      .pipe(source('index.js'))
      .pipe(streamify(uglify()))
      .pipe(rename(outfile))
      .pipe(gulp.dest('./app'))
  })*/
