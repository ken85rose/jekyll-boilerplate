// For finding task names
'use strict'
module.exports = (gulp, config) => {

	gulp.task('tasks', () => {
		require('gulp-task-listing')()
	})

	gulp.task('task', ['tasks'])

}