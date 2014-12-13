var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    log = gutil.log,
    colors = gutil.colors,
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

paths = {
    src: {
        scripts: 'src/scripts/**/*.js',
        styles: 'src/styles/**/*.less'
    },
    assets: {
        scripts: 'assets/scripts/**/*.js',
        styles: 'assets/styles/**/*.css' 
    },
    output: {
        scripts: 'assets/scripts/',
        styles: 'assets/styles/'
    }
};

// script taks
gulp.task('lint', function () {
    return gulp.src('src/scripts/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('concat:scripts', [ 'lint' ], function () {
    return gulp.src(paths.src.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.output.scripts));
});

gulp.task('minify:scripts', [ 'concat:scripts' ], function () {
    if (!gutil.env.u) {
        return gulp.src(paths.assets.scripts)
            .pipe(uglify())
            .pipe(gulp.dest(paths.output.scripts));
    } else {
        log(colors.red('Scripts have not been minified!'));
    }
});

// styles task
gulp.task('concat:styles', function () {
    return gulp.src(paths.src.styles)
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.output.styles));
});

gulp.task('minify:styles', [ 'concat:styles' ], function () {
    if (!gutil.env.u) {
        return gulp.src(paths.assets.styles)
            .pipe(minifyCss())
            .pipe(gulp.dest(paths.output.styles));
    } else {
        log(colors.red('Styles have not been minifided!'))
    }
});

// default task
gulp.task('default', [ 'minify:styles', 'minify:scripts' ]);

gulp.task('watch', function () {
    gulp.watch(paths.src.scripts, [ 'minify:scripts' ]);
    gulp.watch(paths.src.styles, [ 'minify:styles' ]);
});
