# Gulp-It

A Gulp project using [Nunjucks](http://mozilla.github.io/nunjucks/),[SASS](http://sass-lang.com/) and [Gulp](http://gulpjs.com/). Browsersync runs out of 'public' folder and watches all Nunjucks templates/subfolders, SASS/subfolders and JS/subfolders and live reloads in browser on change. It can also minify images and move fonts and assets to a 'public' folder for easy deployment.


Gulp tasks used:

- sass
- autoprefixer
- sassdoc
- browserSync
- nunjucksRender
- script concat
- imagemin
- pngquant


## Setup

1) Install [Gulp](http://gulpjs.com/) and [NPM](http://nodejs.org) if you do not already have them.

2) Install npm dependencies
```
cd src
npm install
```

3) Run Gulp from src
```
gulp
```
