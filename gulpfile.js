// 在gulpfile中先载入gulp包
var gulp = require('gulp');
// 使用$引用以gulp开头的模块
var $ = require('gulp-load-plugins')();

// 定义一个对象保存路径
var path = {
    srcPath: 'src/',
    devPath: 'alipay/',
    // prdPath: 'dist/'
};

// 拷贝 axml文件
gulp.task('axml', function () {
    gulp.src(path.srcPath + '**/*.axml')
        .pipe($.plumber())
        .pipe(gulp.dest(path.devPath))
});

// 拷贝 js文件
gulp.task('js', function () {
    gulp.src(path.srcPath + '**/*.js')
        .pipe($.plumber())
        .pipe(gulp.dest(path.devPath))
});

// 拷贝 json文件
gulp.task('json', function () {
    gulp.src(path.srcPath + '**/*.json')
        .pipe($.plumber())
        .pipe(gulp.dest(path.devPath))
});

// 编译 拷贝sass文件
gulp.task('sass', function () {
    gulp.src(path.srcPath + '**/*.scss')
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.px2rpx({
            screenWidth: 750, // 设计稿屏幕, 默认750
            wxappScreenWidth: 750, // 微信小程序屏幕, 默认750
            remPrecision: 6 // 小数精度, 默认6
        }))
        .pipe($.rename(function (path) {
            path.extname = ".acss"
          }))
        .pipe(gulp.dest(path.devPath))
})

// 拷贝 非scss文件
gulp.task('other', function () {
    gulp.src(path.srcPath + '**/!(*.scss)')
        .pipe($.plumber())
        .pipe(gulp.dest(path.devPath))
});


gulp.task('build', ['other', 'sass']);

gulp.task('clean', function () {
    gulp.src([path.devPath])
        .pipe($.clean());
});

gulp.task('serve', ['build'], function () {
    gulp.watch(path.srcPath + '**/*.scss', ['sass']);
    gulp.watch(path.srcPath + '**/*.axml', ['axml']);
    gulp.watch(path.srcPath + '**/*.js', ['js']);
    gulp.watch(path.srcPath + '**/*.json', ['json']);
    gulp.watch(path.srcPath + '**/*.scss', ['js']);
});