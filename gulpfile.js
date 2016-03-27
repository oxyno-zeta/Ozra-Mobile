
// Require
var path = require('path');
var gulp = require('gulp');
var bump = require('gulp-bump');
var gulpSequence = require('run-sequence');
var del = require('del');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var csso = require('gulp-csso');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

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

gulp.task('default', function(cb){
	return gulpSequence('clean', 'dev', cb);
});

gulp.task('watch', function(){
	gulp.watch([
		path.join(paths.sourcesDir, '/**/*')
	], ['dev']);
});

gulp.task('dev', function(cb){
	return gulpSequence(['partials', 'sass', 'js', 'others'], 'inject', 'build', cb);
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
			return '\n@import "' + filePath + '";\n';
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

gulp.task('others', function(){
	return gulp.src([
		path.join(paths.sourcesDir, '/**/*.png'),
		path.join(paths.sourcesDir, '/**/*.{eot,svg,ttf,woff}'),
		path.join(paths.bower, '/ionic/**/*.{eot,svg,ttf,woff}'),
		path.join('!' + paths.bower, '/**/vendor/**/*'),
		path.join('!' + paths.sourcesDir, '/**/vendor/**/*')
	]).pipe(gulp.dest(paths.distDir));
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
		/*.pipe(gulpif('*.js', uglify({
			preserveComments: uglifySaveLicense
		})))*/
		.pipe(gulpif('*.css', csso()))
		.pipe(gulpif('*.html', minifyHtml({
			empty: true,
			spare: true,
			quotes: true,
			conditionals: true
		})))
		.pipe(gulpif('!index.html', rev()))
		.pipe(revReplace())
		.pipe(gulp.dest(paths.distDir));
});


