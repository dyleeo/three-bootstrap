const gulp = require('gulp');
const gutil = require('gulp-util');
const jshint = require('gulp-jshint');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const image = require('gulp-image');
const postcss = require('gulp-postcss');
const changed = require('gulp-changed');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const buble = require('gulp-buble');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const rollup = require('rollup-stream');
const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-js-harmony').minify;
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const includePaths = require('rollup-plugin-includepaths');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const modernizr = require('gulp-modernizr');



gulp.task('default', [ 'watch' ]);

gulp.task('html', function(){

  gutil.log('HTML UPDATED');
  return gulp.src('./app/*.html')
    .pipe( gulp.dest('./pub'))
    .pipe(connect.reload());
});

gulp.task('jshint', function(){
  return gulp.src('./app/javascript/**/*.js')
    .pipe( jshint({"esversion": 6}) )
    .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('cleanImage', function(){
  return del(
    [
      './pub/images/optimized',
      '../images/optimized'
    ],
    {
      force: true,
      dryrun: true
    }
  );
});

gulp.task('images', ['cleanImage'], function(){
  return gulp.src('./app/images/**/*')
  .pipe( changed('./pub/images/optimized') )
  .pipe( image({ svgo: true }) )
  .pipe( gulp.dest( './pub/images/optimized' ) )
});

gulp.task('modernizr', function() {
  gulp.src('./app/javascript/**/*.js')
    .pipe(modernizr())
    .pipe(gulp.dest("./app/javascript"))
});

gulp.task('sass', function(){
  return gulp.src('./app/scss/main.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass( { outputStyle: 'compressed', includePaths: './node_modules' } ).on( 'error', sass.logError ) ) //compressed  on launch
    .pipe( postcss([ require('autoprefixer') ]) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./pub/stylesheets') )
    .pipe(connect.reload());
});

gulp.task('sass-lint', function() {
  gulp.src([
    './app/scss/**/*.scss',
    '!./app/scss/partials/_reset.scss'])
      .pipe( sassLint({
        options: {
          configFile: '.sass-lint.yml'
        }
      }) )
      .pipe( sassLint.format() )
      .pipe( sassLint.failOnError() );
});

let cache;

//BUILD JS
gulp.task('bundleJS', function(){
  return rollup({
    format: "umd", //umd,amd,cjs
    name: "mainBundle", //only for umd
    exports: "named",
    input: "./app/javascript/main.js",
    sourcemap: true,
    strict: true,
    cache: cache,
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true,
        preferBuiltins: true,
        browser: true,
      }),
      commonjs({
        ignoreGlobal: true,
        namedExports: {
          './node_modules/gsap': [ 'TweenMax', 'EasePack' ]
        },
        include: 'node_modules/**'
      }),
      includePaths({
        paths: [ './app/javascript/' ]
      }),
      //uglify({}, minify )
    ]
  })
  .on('bundle', function(bundle) {
    cache = bundle;
  })
  .pipe( source( 'main.js', './app/javascript' ) )
  .pipe( buffer() )
  .pipe( sourcemaps.init( { loadMaps: true } ) )
  .pipe( buble() )
  .pipe( rename('bundle.js' ) )
  .pipe( sourcemaps.write('.') )
  .pipe( gulp.dest('./pub/javascript') )
  .pipe(connect.reload());
});



gulp.task('serve', [ 'build', 'watch'], function(){
  connect.server({
    port: 9000,
    root: ['./pub'],
    livereload: true
  });
});

gulp.task('reload', function(){
  gutil.log("reloaded");
  connect.reload();
});

gulp.task('build', ['images', 'html', 'sass', 'modernizr', 'bundleJS'], function(){
  return del(['./app/javascript/modernizr.js' ]);
});


gulp.task('watch', function(){
  gulp.watch('./app/**/*.html', ['html']);
  gulp.watch('./app/javascript/**/*.js', ['bundleJS', 'reload']);
  gulp.watch('./app/scss/**/*.scss', ['sass', 'sass-lint', 'reload']);
});
