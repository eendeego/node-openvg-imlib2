var imlib = module.exports = require('./build/Release/node-openvg-imlib2.node');

var vg = require('openvg');

function checkError(message) {
  var err = vg.getError();
  if(err) {
    console.log("Error: " + message + " : " + vg.VGErrorCodeReverse[err]);
  }
}

var load = imlib.load = function(file) {
  var image = {
    imlibHandle : null,
    vgHandle: null,
    width: null,
    height: null,
  };

  image.imlibHandle = imlib.loadImageImmediately(file);
  imlib.contextSetImage(image.imlibHandle);
  image.width = imlib.getWidth();
  image.height = imlib.getHeight();
  var data = imlib.getDataForReadingOnly();

  image.vgHandle =
    vg.createImage(vg.VGImageFormat.VG_sARGB_8888,
                   image.width, image.height,
                   vg.VGImageQuality.VG_IMAGE_QUALITY_BETTER);
  checkError("createImage");

  vg.imageSubData(image.vgHandle,                 // VGImage
                  data, image.width * 4,          // data, stride
                  vg.VGImageFormat.VG_lARGB_8888, // Format
                  0, 0,                           // sx, sy
                  image.width, image.height);     // w, h
  checkError("imageSubData");

  imlib.freeImage();

  return image;
};

var drawImage = imlib.drawImage = function(x, y, image) {
  var mm = new Float32Array(9);
  var mat = new Float32Array([
    1.0,  0.0,   0,
    0.0, -1.0,   0,
      x,    y + image.height, 1.0
  ]);

  vg.setI(vg.VGParamType.VG_MATRIX_MODE,
          vg.VGMatrixMode.VG_MATRIX_IMAGE_USER_TO_SURFACE);

  vg.getMatrix(mm);

  vg.loadMatrix(mm);
  vg.multMatrix(mat);

  vg.setI(vg.VGParamType.VG_IMAGE_MODE,
          vg.VGImageMode.VG_DRAW_IMAGE_NORMAL);
  checkError("setI(VG_IMAGE_MODE)");

  vg.drawImage(image.vgHandle);
  // vg.setPixels(x, y, image.vgHandle, 0, 0, image.width, image.height);
  checkError("setPixels");

  vg.loadMatrix(mm);
}