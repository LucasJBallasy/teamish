var load = require('load-grunt-tasks');

module.exports = function(grunt) {

	load(grunt);

	grunt.initConfig({
		sass: {
			main: {
				options: {
					sourceMap: true
				},
				src: 'styles/scss/main.scss',
				dest: 'styles/main.css'
			}
		},

		autoprefixer: {
			main: {
				options: {
					map: true
				},
				src: 'styles/main.css',
				dest: 'styles/main.css'
			}
		},

		'sftp-deploy': {
			main: {
				auth: {
					host: 'barrelclient.com',
					port: 2222,
					authKey: 'barrelclient'
				},
				cache: 'sftp-cache.json',
				src: ['./'],
				exclusions: ['./*.*', './.*', 'html', 'node_modules'],
				dest: '/var/www/vhosts/barrelclient.com/subdomains/staging/subdomains/creativedays/httpdocs/'
			}
		},

		watch: {
			sass: {
				files: ['styles/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer'/*, 'sftp-deploy'*/]
			},
			// js: {
			// 	files: ['scripts/**/*.js'],
			// 	tasks: ['sftp-deploy']
			// }
		}
	});

	grunt.registerTask('build', [
		'sass',
		'autoprefixer'
	]);

	// grunt.registerTask('push', [
	// 	'sftp-deploy'
	// ]);

	grunt.registerTask('default', ['build']);

};