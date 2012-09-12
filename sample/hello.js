#!/usr/bin/env ./node_modules/openvg/bin/node-pi

var util = require('util');
var fs = require('fs');

var vg = require('openvg');
var vu = require('../node_modules/openvg/sample/modules/util');
var imlib = require('../imlib');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var imagePath = "/usr/share/raspberrypi-artwork/raspberry-pi-logo.png";

if (process.argv.length > 2) {
  imagePath = process.argv[2];
}

if(!fs.existsSync(imagePath)) {
  console.log("Image not found (" + imagePath + ").");
  console.log("Usage: sample/hello.js <image>");
  process.exit(1);
}

var image;
var width, height;
vu.init({ loadFonts : false });

width  = vg.screen.width;
height = vg.screen.height;

var angle = 0;
var angleStep = 0;

function hello() {
  vu.background(0, 0, 0);
  vu.fill(44, 77, 232, 1);
  vu.circle(width/2, 0, width);
  vu.fill(255, 255, 255, 1);

  var rot = new Float32Array(9);

  vg.setI(vg.VGParamType.VG_MATRIX_MODE,
          vg.VGMatrixMode.VG_MATRIX_IMAGE_USER_TO_SURFACE);

  vg.getMatrix(rot);
  vg.translate(vg.screen.width/2, vg.screen.height/2);
  angle += angleStep;
  vg.rotate(angle);
  imlib.drawImage(-image.width/2, -image.height/2, image);
  vg.setI(vg.VGParamType.VG_MATRIX_MODE,
          vg.VGMatrixMode.VG_MATRIX_IMAGE_USER_TO_SURFACE);
  vg.loadMatrix(rot);
  vu.end();
}

function resetAngle() {
  angleStep = (Math.random() - 0.5) * (Math.PI * 0.5);
}

if (process.argv.length > 2) {
  fontPath = process.argv[2];
}

var timers = [];

image = imlib.load(imagePath);
// console.log(util.inspect(image));
vu.start();
timers.push(setInterval(hello, 1000/25));
timers.push(setInterval(resetAngle, 1000));
console.log("done");

function terminate() {
  vu.finish();
  console.log("Making a clean exit.");
}
process.on('exit', terminate);

console.log("Press return to exit.");
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.once('data', function (chunk) {
  timers.map(function(t) {
    clearInterval(t);
  });
  process.stdin.pause();
});
