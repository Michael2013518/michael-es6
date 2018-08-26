var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss =require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
gulp.task('hello',function(){
  console.log('你好');
});
// gulp 默认任务
gulp.task('default',['server','watch']);
//gulp src/pipe/dest
gulp.task('copy-index',function(){
  return gulp.src('index.html')
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});
// gulp 复制图片  images/**/* 文件下面所有的文件包括目录
gulp.task('images',function(){
  return gulp.src('images/*.{jpg,png}')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
});

gulp.task('data',function(){
  return gulp.src(['xml/*.xml','json/*.json','!json/secret-*.json'])
         .pipe(gulp.dest('dist/data'))
});

gulp.task('build',['copy-index','images','data'],function(){
  console.log('编译成功！');
});

gulp.task('watch',function(){
 console.log('监视文件');
 gulp.watch('index.html',['copy-index']);
 gulp.watch('images/**/*.{jpg,png}',['images']);
 gulp.watch(['xml/*.xml','json/*.json','!json/secret-*.json'],['data']);
 });

 gulp.task('sass',function(){
   return gulp.src('css/**/*.scss')
   .pipe(sass())
   .pipe(gulp.dest('dist/css'))
 });
 gulp.task('less',function(){
   return gulp.src('css/**/*.less')
   .pipe(less())
   .pipe(minifyCss())
   .pipe(gulp.dest('dist/css'))
 });

gulp.task('server',function(){
  connect.server({
    root:'dist',
    livereload:true
  })
})
gulp.task('scripts',function(){
  return gulp.src('js/*.js')
  .pipe(babel())
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(rename('vendor.min.js'))
  .pipe(gulp.dest('dist/js'));
});
gulp.task('browserSync',function(){
  browserSync.init({
    server:{
      baseDir:'./'
    },
    files:['index.html','css/*.css','js/*.js']
  })
})
