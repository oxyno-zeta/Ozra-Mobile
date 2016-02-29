
// Require
var path = require('path');
var gulp = require('gulp');
var bump = require('gulp-bump');
var gulpSequence = require('run-sequence');
var del = require('del');
var es = require('event-stream');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var csso = require('gulp-csso');
var uglifySaveLicense = require('uglify-save-license');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

var paths = {
  	sass: ['./scss/**/*.scss'],
	sources: ['app/**/*'],
	sourcesDir: 'app/',
	tmpDir: '.tmp/',
	distDir: 'www/',
	bower: 'bower_components/'
};

var wiredepConf = {
	directory: paths.bower
};

gulp.task('default', ['dev']);

gulp.task('watch', function(){
	gulp.watch([
		path.join(paths.sourcesDir, '/**/*')
	], ['dev']);
});

gulp.task('dev', function(cb){
	return gulpSequence('clean', ['partials', 'sass', 'js'], 'inject', 'build', cb);
});

gulp.task('clean', function(cb){
	return gulpSequence(['clean:tmp', 'clean:dist'], cb);
});

gulp.task('clean:tmp', function(){
	return del(paths.tmpDir);
});

gulp.task('clean:dist', function(){
	return del(paths.distDir);
});

gulp.task('partials', function () {
	return gulp.src([
		path.join(paths.sourcesDir, '/**/*.html'),
		path.join('!' + paths.sourcesDir, '/index.html')
	])
		.pipe(minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(angularTemplatecache('templateCacheHtml.js', {
			module: 'ozra'
		}))
		.pipe(gulp.dest(paths.tmpDir));
});

gulp.task('sass', function(){
	var injectFiles = gulp.src([
		path.join(paths.sourcesDir, '/**/*.scss'),
		path.join('!' + paths.sourcesDir, '/ozra.scss')
	], {
		read: false
	});

	var injectOptions = {
		transform: function (filePath) {
			filePath = filePath.replace(paths.sourcesDir + '/', '');
			return '@import "' + filePath + '";';
		},
		starttag: '// inject',
		endtag: '// endinject',
		addRootSlash: false
	};

	return gulp.src(path.join(paths.sourcesDir, '/ozra.scss'))
		.pipe(inject(injectFiles, injectOptions))
		.pipe(sourcemaps.init())
		.pipe(sass()).on('error', sass.logError)
		.pipe(autoprefixer()).on('error', console.error)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.tmpDir));
});

gulp.task('js', function(){
	return gulp.src([
		path.join(paths.sourcesDir, '/**/*.js')
	]).pipe(gulp.dest(paths.tmpDir));
});

gulp.task('inject', function(){
	var injectStyles = gulp.src([
		path.join(paths.tmpDir, '/**/*.css')
	], {
		read: false
	});

	var injectScripts = gulp.src([
		path.join(paths.tmpDir, '/**/*.js')
	])
		.pipe(angularFilesort()).on('error', console.error);

	var injectOptions = {
		ignorePath: [paths.tmpDir],
		addRootSlash: false
	};

	return gulp.src(path.join(paths.sourcesDir, '/index.html'))
		.pipe(inject(injectStyles, injectOptions))
		.pipe(inject(injectScripts, injectOptions))
		.pipe(wiredep({}, wiredepConf))
		.pipe(gulp.dest(paths.tmpDir));
});



gulp.task('build', function(){
	return gulp.src(path.join(paths.tmpDir, '/*.html'))
		.pipe(useref())
		.pipe(gulpif('*.js', ngAnnotate()))
		.pipe(gulpif('*.js', uglify({
			preserveComments: uglifySaveLicense
		})))
		.pipe(gulpif('*.css', csso()))
		.pipe(gulpif('*.html', minifyHtml({
			empty: true,
			spare: true,
			quotes: true,
			conditionals: true
		})))
		.pipe(gulp.dest(paths.distDir));
});


