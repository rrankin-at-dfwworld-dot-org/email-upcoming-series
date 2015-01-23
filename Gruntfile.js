"use strict"

module.exports = function(grunt) {

    grunt.initConfig({

        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: "src/css",
                    src: ["**"],
                    dest: "tmp/css"
                }, {
                    expand: true,
                    cwd: "src/image",
                    src: ["**"],
                    dest: "tmp/image"
                }, {
                    expand: true,
                    cwd: "src",
                    src: ["*.html"],
                    dest: "tmp"
                }]
            },
            tmp: {
                files: [{
                    expand: true,
                    cwd: "tmp",
                    src: ["*.html"],
                    dest: "dist"
                }]
            }
        },

        connect: {
            options: {
                port: "8080",
                useAvailablePort: true,
                livereload: true,
                open: true
            },
            dev: {
                options: {
                    base: "tmp/"
                }
            }
        },

        watch: {
            src: {
                files: ["src/css/**/*.scss", "src/images/**/*.{gif,png,jpg,jpeg}", "src/**/*.jade", "src/data/*.json"],
                tasks: ["build:development"],
                options: {
                    livereload: true
                }
            }
        },

        sass: {
            compile: {
                files: {
                     "tmp/css/style.css" : "src/css/style.scss",
                     "tmp/css/mobile.css": "src/css/mobile.scss"
                }
            }
        },

        jade: {
            html: {
                files: {
                    'src/': ['src/views/index.jade']
                },
                options: {
                    client: false,
                    pretty: true,
                    data: {
                        global: grunt.file.readJSON('src/data/data.json'),
                        //featured: grunt.file.readJSON('src/data/featured.json'),
                        body: grunt.file.readJSON('src/data/body.json'),
                        columns: grunt.file.readJSON('src/data/columns.json')
                    }
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "tmp/image",
                    src: ["**/*.{png,jpg,jpeg}"],
                    dest: "dist/image"
                }]
            }
        },

        uncss: {
            options: {
                //media: ['screen'],
                stylesheets: ['css/style.css']
            },
            dist: {
                files: {
                    "tmp/css/tidy.css": ["tmp/index.html"]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true
                },
                files: {
                    "tmp/index.html": "tmp/index.html"
                }
            }
        },

        premailer: {
            options: {
                baseUrl: 'https://www.dfwworld.org',
                css: 'tmp/css/tidy.css',
                removeClasses: false,
                preserveStyles: true,
                verbose: true
            },
            dist: {
                files: {
                    "tmp/index.html": "tmp/index.html"
                }
            }
        }
    });

    grunt.registerTask("start", "Compiles the development environment and serves to browser", [
        "build:development",
        "connect:dev",
        "watch:src"
    ]);

    grunt.registerTask("build:development", "Compiles the development build", [
        "jade:html",
        "copy:src",
        "sass:compile",
        "copy:tmp"
    ]);

    grunt.registerTask("build:distribution", "Compiles the distribution build", [
        "copy:src",
        "sass:compile",
        "uncss:dist",
        "htmlmin:dist",
        //"premailer:dist",
        "imagemin:dist",
        "copy:tmp"
    ]);


    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-uncss");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-premailer");

    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks('grunt-jade');



};