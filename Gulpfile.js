'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var include = require('gulp-include');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var concat      = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var siteOutput = './public';


// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var input = 'src/stylesheets/**/*.scss';
var inputMain = 'src/stylesheets/main.scss';
var output = siteOutput + '/css';
var inputTemplates = 'src/pages/*.html';
var srcTemplates = 'src/templates/**/*.html';
var sassOptions = { outputStyle: 'expanded' };
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var sassdocOptions = { dest: siteOutput + '/sassdoc' };


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function() {
  return gulp
    .src(inputMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});


// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------

gulp.task('scripts', function() {
  return gulp.src([
	  	'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
	  	'src/js/**/*.js'
  	])
    .pipe(concat({ path: 'main.js'}))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(siteOutput + '/js'));
});


// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['src/templates/']);
  // Gets .html and .nunjucks files in pages
  return gulp.src(inputTemplates)
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in public folder
  .pipe(gulp.dest(siteOutput))
});


// -----------------------------------------------------------------------------
// Imagemin
// -----------------------------------------------------------------------------

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      verbose: true,
      quality: "50",
      use: [pngquant()]
    }))
    .pipe(gulp.dest(siteOutput + '/img'));
});


// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

// gulp.task('fonts', function() {
//   return gulp.src(['./src/fonts/*'])
//   .pipe(gulp.dest(siteOutput + '/fonts/'));
// });


// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------

gulp.task('sassdoc', function() {
  return gulp
    .src(input)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});


// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
    // Watch the sass input folder for change,
    // and run `sass` task when something happens
    gulp.watch(input, ['sass']).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gulp.watch('src/js/**/*.js', ['scripts']).on('change', browserSync.reload);

    // Watch nunjuck templates and reload browser if change
    gulp.watch(inputTemplates, ['nunjucks']).on('change', browserSync.reload);
    gulp.watch(srcTemplates, ['nunjucks']).on('change', browserSync.reload);

});


// -----------------------------------------------------------------------------
// Static server
// -----------------------------------------------------------------------------

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: siteOutput
    }
  });
});


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['sass', 'nunjucks', 'img', 'scripts', 'watch', 'browser-sync']);
