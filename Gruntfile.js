module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        exec: {
            debug: {
                cmd: "hc \\#DEBUG @source=src @lib=lib -aed src/storm"
            },
            prod: {
                cmd: "hc @source=src @lib=lib src/storm"
            }
        },
        rsync: {
            options: {
                recursive: true
            },
            prod: {
                options: {
                    src: "storm.hex",
                    dest: grunt.option( "dest" ) || "~/www/if/storm/",
                    host: grunt.option( "host" )
                }
            }
        }        
    });

    grunt.loadNpmTasks( 'grunt-exec' );
    grunt.loadNpmTasks( 'grunt-rsync' );
    

    grunt.registerTask( 'default', [ 'exec:debug' ] );
    grunt.registerTask( 'prod', [ 'exec:prod' ] );
    grunt.registerTask( 'deploy', [ 'prod', 'rsync' ] ); // use with command "grunt deploy --host=user@example.com --dest=/remote/path"
};
