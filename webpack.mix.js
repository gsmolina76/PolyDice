const mix = require('laravel-mix');



mix.sourcemaps().js([
    'src/js/app.js',    
], 'public/js/app.js')
.sass('src/sass/app.scss', 'public/css');