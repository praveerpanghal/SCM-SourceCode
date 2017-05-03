var gulp        = require('gulp');
var changed     = require('gulp-changed');
var imagemin    = require('gulp-imagemin');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('imagemin', function() {
   var img_src = 'src/images/**/*', img_dest = 'build/images';
   gulp.src(img_src)
   .pipe(changed(img_dest))
   .pipe(imagemin())
   .pipe(gulp.dest(img_dest));
});

// gulp.task('browserSync', function() {
//    browserSync.init({
//       server: {
//          baseDir: 'build'
//       },
//    })
// });

gulp.task('styles', function() {   
   gulp.src(['src/styles/style.css'])
   .pipe(autoprefix('last 2 versions'))
   .pipe(minifyCSS())
   .pipe(gulp.dest('build/styles/'))
   
});

gulp.task('default', ['imagemin' ,'styles'], function() {

gulp.watch('src/styles/style.css', ['styles']);
gulp.watch('src/images/**/*', ['imagemin']);

});


