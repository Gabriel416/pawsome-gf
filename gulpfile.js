var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task("watch", function() {
	var watcher = gulp.watch("public/assets/*.js");
	watcher.on("change", function(event) {
		console.log("file " + event.path + " changed.");
	});
});

gulp.task("default", function() {
	console.log("gulp is running");
});

gulp.task("uglify", function() {
	gulp.src("public/assets/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("production"));
});
