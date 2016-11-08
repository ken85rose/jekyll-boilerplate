// For finding task names
'use strict'
module.exports = function(gulp, config){

	gulp.task('tasks', function(){
		require('gulp-task-listing')()
	})



}