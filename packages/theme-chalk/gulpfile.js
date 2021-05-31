'use strict'

const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const concat = require('gulp-concat')

function compile () {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'))
}

function copyfont () {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'))
}

function copyElement () {
  return src('./src/element.css')
    .pipe(dest('./lib'))
}

function concatElement () {
  return src(['./src/element.css', './lib/index.css'])
    .pipe(concat('index.css'))
    .pipe(dest('./lib'))
}

exports.build = series(compile, copyfont, copyElement, concatElement)
