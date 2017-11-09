module.exports = function( grunt ) {

	grunt.initConfig({

		// Directory where compiled files go
		distdir: 'dist',

		// Directory to pull from
		srcdir: 'src',

		// Clean directory
		clean: [ '<%= distdir %>' ],

		// Handlebars
		// handlebars: {
		// 	all: {
		// 		options: {
		// 			namespace: 'hbs',
		// 			processName: function(filePath) {
		// 				return filePath.replace(/.*\//, '').replace(/\.hbs$/, '');
		// 			}
		// 		},
		// 		files: {
		// 			'<%= srcdir %>/js/templates.js': '<%= srcdir %>/hbs/*.hbs'
		// 		}
		// 	}
		// },

		// Copy assets
		copy: {
			images: {
				files: [
					{
						src: [ '**' ],
						cwd: '<%= srcdir %>/img',
						dest: '<%= distdir %>/img/',
						expand: true
					}
				]
			},
			css: {
				files: [
					{
						src: [ '**' ],
						cwd: '<%= srcdir %>/css',
						dest: '<%= distdir %>/css/',
						expand: true
					}
				]
			},
			js: {
				files: [
					{
						src: [ '**' ],
						cwd: '<%= srcdir %>/js',
						dest: '<%= distdir %>/js/',
						expand: true
					}
				]
			}
		},

		// Sass
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'<%= srcdir %>/css/main.css' : '<%= srcdir %>/scss/main.scss'
				}
			}
		},

		// Sets autoprefixer for css files
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')
				]
			},
			dist: {
				src: '<%= srcdir %>/css/*.css'
			}
		},

		// Include files
		includereplacemore: {
			dist: {
				options: {
					includesDir: '<%= srcdir %>/includes/'
				},
				files: [
					{
						src: '*.html',
						dest: '<%= distdir %>/',
						expand: true,
						cwd: '<%= srcdir %>/'
					}
				]
			}
		},

		// Watches for a file save and refreshes browser with livereload 
		watch: {
			options: {
				livereload: true,
			},
			sass: {
				options: {
					livereload: false
				},
				files: [ '<%= srcdir %>/scss/*.scss' ],
				tasks: [ 'sass', 'postcss' ]
			},
			// handlebars: {
			// 	files: [ '<%= srcdir %>/hbs/**/*.hbs' ],
			// 	tasks: [ 'handlebars' ]
			// },
			images: {
				files: [ '<%= srcdir %>/img/*' ],
				tasks: [ 'copy:images' ]
			},
			css: {
				files: [ '<%= srcdir %>/css/main.css' ],
				tasks: [ 'copy:css' ]
			},
			html: {
				files: [ '<%= srcdir %>/*.html', '<%= srcdir %>/includes/*.html' ],
				tasks: [ 'includereplacemore' ]
			},
			js: {
				files: [ '<%= srcdir %>/js/*.js' ],
				tasks: [ 'copy:js' ]
			}
		},

		// Run server
		connect: {
			server: {
				options: {
					base: 'dist',
					port: 9000
				}
			}
		}
	});

	// grunt.loadNpmTasks( 'grunt-contrib-handlebars' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-postcss' );
	grunt.loadNpmTasks( 'grunt-include-replace-more' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	grunt.registerTask( 'default', [ 'sass', 'includereplacemore' ] );
	grunt.registerTask( 'local', [ 'clean', 'sass', 'postcss', 'copy', 'includereplacemore', 'connect', 'watch' ] );

};