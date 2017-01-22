module.exports = function (grunt) {

	// load all grunt modules
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		meta: {
			jsFilesForTesting: [
				'bower_components/jquery/jquery.js',
				'bower_components/angular-route/angular-route.js',
		        'bower_components/angular-sanitize/angular-sanitize.js',
		        'bower_components/angular-mocks/angular-mocks.js',
		        'bower_components/restangular/dist/restangular.js',
		        'bower_components/underscore/underscore.js',
		        'bower_components/underscore/underscore.js',
		        'test/**/*Spec.js'
		    ]
	    },

	    karma: {
	      development: {
	        configFile: 'karma.conf.js',
	        options: {
	          files: [
	            '<%= meta.jsFilesForTesting %>',
	            'source/**/*.js'
	          ],
	        }
	      }
		},
		jshint: {
			options: {
			    reporter: require('jshint-stylish')
			},
			beforebuild: [
                'src/**/*.js'
            ]
		},
		copy: {
			build: {
				cwd: 'src',
				src: ['**'],
				dest: 'dist',
				expand: true
			}
		},
		clean: {
			client: {
				src: ['dist/public']
			},
            server: {
                src: ['dist/**','!dist/public/**']
            },
			all: {
				src: ['dist']
			},
			js: {
				src: ['dist/public/js','dist/public/jsx']
			},
			css: {
				src: ['dist/public/css']
			}
		},
		uglify: {
			build: {
				options: {
					mangle: true
				},
				files: {
					'dist/public/app.min.js': ['dist/public/js/app.js'],
                    'dist/public/resultspage.min.js': ['dist/public/js/resultspage.js'],
                    'dist/public/signuppage.min.js': ['dist/public/js/signuppage.js']
				}
			}
		},
		postcss: {
		    options: {
		    	map: true,
		    	processors: [
	                require('autoprefixer')({
	                	browsers: ['last 3 versions']
	                })
		        ]
		    },
		    build: {
		        src: 'dist/public/css/**/*.css'
		    }
		},
		cssmin: {
            buildMain: {
                files: {
                    'dist/public/style.min.css': ['dist/public/css/style.css','dist/public/css/fonts.css','dist/public/css/gw.css']
                }
            },
			buildResults: {
				files: {
					'dist/public/resultspage.min.css': ['dist/public/css/resultspage.css','dist/public/css/gw.css','dist/public/css/fonts.css']
				}
			},
            buildSignUp: {
                files: {
                    'dist/public/signuppage.min.css': ['dist/public/css/gw.css','dist/public/css/fonts.css']
                }
            }
		},
		processhtml: {
			build: {
				files: {
					'dist/public/index.html': ['dist/public/index.html'],
                    'dist/public/results.html': ['dist/public/results.html'],
                    'dist/public/signup.html': ['dist/public/signup.html']
				}
			}
		},
		browserify: {
            options: {
                browserifyOptions: {
                    extensions: ['.jsx']
                },
                transform: [
                    ['babelify', {presets: ['es2015','react']}]
                ]
//                    watch: true
            },
            buildMain: {
                src: ['src/public/jsx/*.jsx'],
                dest: 'dist/public/js/app.js'
            },
            buildResults: {
                src: ['src/public/jsx/results/*.jsx'],
                dest: 'dist/public/js/resultspage.js'
            },
            buildSignUp: {
                src: ['src/public/jsx/signup/*.jsx'],
                dest: 'dist/public/js/signuppage.js'
            }
        },
		copy: {
            client: {
                files: [{
                    cwd: 'src',
                    src: ['public','!public/jsx/**'],
                    dest: 'dist',
                    expand: true
                }]
            },
            server: {
                files: [{
                    cwd: 'src',
                    src: ['**','!public/**'],
                    dest: 'dist',
                    expand: true
                }]
            },
            all: {
                files: [{
                    cwd: 'src',
                    src: ['**','!public/jsx/**'],
                    dest: 'dist',
                    expand: true
                }]
            }
//			src: {
//				files: [{
//					cwd: 'src',
//					src: ['**'],
//					dest: 'dist',
//					expand: true
//				}]
//			}
//			dependencies: {
//				files: [{
//					src: ['node_modules/**','my_components/**','bower_components/**'],
//					dest: 'dist',
//					expand: true
//				}]
//			}
		},
	    watch: {
			options: {
				livereload: true
			},
			dev: {
				files: ['src/**/*'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			},
			prod: {
				files: ['src/public/index.html'],
				tasks: ['build-all','express:prod'],
				options: {
					spawn: false
				}
			}
		},
		express: {
			dev: {
				options: {
					script: 'src/ServerApp.js'
				}
			},
			prod: {
				options: {
					script: 'dist/ServerApp.js'
				}
			}
		},
		babel: {
			options: {
	            plugins: ['transform-react-jsx'],
	            presets: ['es2015','react']
	        },
	        jsx: {
	            files: [{
	            	expand: true,
	            	cwd: 'dist/public/jsx',
	            	src: '*.jsx',
	            	dest: 'dist/public/js',
	            	ext: '.js'
	            }]
	        }
		}
	});

	grunt.registerTask('test', ['karma:development']);
	
	grunt.registerTask('build-src', ['clean:src','copy:src','postcss:build','cssmin','clean:css','babel:jsx','uglify:build','clean:js','processhtml:buildMain','processhtml:buildResults']);
    grunt.registerTask('build-src2', ['clean:src','browserify:build']);
	grunt.registerTask('build-dependencies', ['clean:dependencies','copy:dependencies']);
	grunt.registerTask('build-all', ['build-dependencies','build-src']);
	grunt.registerTask('run-dev', ['express:dev','watch:dev']);
	grunt.registerTask('run-prod', ['express:prod','watch:prod']);
    grunt.registerTask('run-prod-nowatch', ['express:prod']);
	grunt.registerTask('rebuild-run', ['build-src2','run-prod']);
    
    
    
    
    
    grunt.registerTask('build-jsx', ['browserify:buildMain','browserify:buildResults','browserify:buildSignUp']);
    grunt.registerTask('build-css', ['cssmin:buildMain','cssmin:buildResults','cssmin:buildSignUp']);
    grunt.registerTask('build-html', ['processhtml:build']);
    
    grunt.registerTask('run', ['express:prod','keepalive']);
    
    grunt.registerTask('build-debug', ['clean:all','copy:all','build-jsx','postcss:build']);
    grunt.registerTask('build-debug-run', ['build-debug','run']);
    
    grunt.registerTask('build-prod', ['clean:all','copy:all','build-jsx','uglify:build','clean:js','postcss:build','build-css','clean:css','build-html']);
    grunt.registerTask('build-prod-run', ['build-prod','run']);
};