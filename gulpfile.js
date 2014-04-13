'use strict';

/*
  ______ _____ __  __            ______          _                  
 |  ____/ ____|  \/  |   /\     |  ____|        | |                 
 | |__ | |    | \  / |  /  \    | |__ __ _ _ __ | |_ __ _ ___ _   _ 
 |  __|| |    | |\/| | / /\ \   |  __/ _` | '_ \| __/ _` / __| | | |
 | |___| |____| |  | |/ ____ \  | | | (_| | | | | || (_| \__ \ |_| |
 |______\_____|_|  |_/_/    \_\ |_|  \__,_|_| |_|\__\__,_|___/\__, |
                         __      _______                       __/ |
                         \ \    / /_   _|                     |___/ 
                          \ \  / /  | |                             
                           \ \/ /   | |                             
                            \  /   _| |_                            
                             \/   |_____|                           
*/


/*
              __            
   ________  / /___  ______ 
  / ___/ _ \/ __/ / / / __ \
 (__  )  __/ /_/ /_/ / /_/ /
/____/\___/\__/\__,_/ .___/ 
                   /_/      
*/

var gulp   = require('gulp');
var gutil   = require('gulp-util');
var jshint = require('gulp-jshint');
var jscs   = require('gulp-jscs');
var mocha  = require('gulp-mocha');
var bump   = require('gulp-bump');

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
};


/*
    ___       __           
   / (_)___  / /____  _____
  / / / __ \/ __/ _ \/ ___/
 / / / / / / /_/  __/ /    
/_/_/_/ /_/\__/\___/_/     

*/                           
gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(jshint('.jshintrc'))
    .pipe(jscs())
    .pipe(jshint.reporter('jshint-stylish'));
});

/*
   __            __      
  / /____  _____/ /______
 / __/ _ \/ ___/ __/ ___/
/ /_/  __(__  ) /_(__  ) 
\__/\___/____/\__/____/  
                         
*/

gulp.task('mocha', function () {
  gulp.src(paths.tests)
    .pipe(mocha({ reporter: 'list' }));
});


/*
    __          _ __    __
   / /_  __  __(_) /___/ /
  / __ \/ / / / / / __  / 
 / /_/ / /_/ / / / /_/ /  
/_.___/\__,_/_/_/\__,_/   
                          
*/


gulp.task('bump', ['test'], function () {
  var bumpType = process.env.BUMP || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

/*
                 __       __  
 _      ______ _/ /______/ /_ 
| | /| / / __ `/ __/ ___/ __ \
| |/ |/ / /_/ / /_/ /__/ / / /
|__/|__/\__,_/\__/\___/_/ /_/ 
                              
*/

gulp.task('watch-lib', ['sweetjs'], function() {
  asciiIntro();
  gulp.watch('lib/**/*.sjs', ['sweetjs']);
  gutil.log(gutil.colors.green('Watching ./lib for changes to .sjs files...'));
});


/*
                    ____  _       __             __       
   ____ ___  __  __/ / /_(_)     / /_____ ______/ /_______
  / __ `__ \/ / / / / __/ /_____/ __/ __ `/ ___/ //_/ ___/
 / / / / / / /_/ / / /_/ /_____/ /_/ /_/ (__  ) ,< (__  ) 
/_/ /_/ /_/\__,_/_/\__/_/      \__/\__,_/____/_/|_/____/  
                                                          
*/

gulp.task('watch', ['watch-lib']);
gulp.task('test', ['lint', 'mocha']);
gulp.task('release', ['bump']);



/*
                   _ _ 
  ____ ___________(_|_)
 / __ `/ ___/ ___/ / / 
/ /_/ (__  ) /__/ / /  
\__,_/____/\___/_/_/   
                       
*/

function asciiIntro(){

  gutil.log(gutil.colors.green("\n"+
    "\n Welcome to... \n"+
    gutil.colors.yellow("  ______ _____ __  __            ")  + "______          _                   \n"+
    gutil.colors.yellow(" |  ____/ ____|  \\/  |   /\\   ")   + "  |  ____|        | |                  \n"+
    gutil.colors.yellow(" | |__ | |    | \\  / |  /  \\  ")   + "  | |__ __ _ _ __ | |_ __ _ ___ _   _  \n"+
    gutil.colors.yellow(" |  __|| |    | |\\/| | / /\\ \\")   + "   |  __/ _` | '_ \\| __/ _` / __| | | | \n"+
    gutil.colors.yellow(" | |___| |____| |  | |/ ____ \\ ")   + " | | | (_| | | | | || (_| \\__ \\ |_| | \n"+
    gutil.colors.yellow(" |______\\_____|_|  |_/_/    \\_\\") + " |_|  \\__,_|_| |_|\\__\\__,_|___/\\__, | \n"+
    gutil.colors.red("                         __      _______   ") + "                    __/ | \n"+
    gutil.colors.red("                         \\ \\    / /_   _|") + "                     |___/  \n"+
    gutil.colors.red("                          \\ \\  / /  | |  ") + "                            \n"+
    gutil.colors.red("                           \\ \\/ /   | |  ") + "                            \n"+
    gutil.colors.red("                            \\  /   _| |_  ") + "                           \n"+
    gutil.colors.red("                             \\/   |_____| ") + "                           \n"));

}
