#include <node.h>
#include <node_buffer.h>
#include <v8.h>

#include <Imlib2.h>
#include "imlib2.h"
#include "util.h"

using namespace node;
using namespace v8;

extern "C" void
init(Handle<Object> target) {
  NODE_SET_METHOD(target, "loadImage"            , imlib2::LoadImage);
  NODE_SET_METHOD(target, "loadImageImmediately" , imlib2::LoadImageImmediately);
  NODE_SET_METHOD(target, "saveImage"            , imlib2::SaveImage);
  NODE_SET_METHOD(target, "freeImage"            , imlib2::FreeImage);
  NODE_SET_METHOD(target, "contextSetImage"      , imlib2::ContextSetImage);
  NODE_SET_METHOD(target, "getWidth"             , imlib2::GetWidth);
  NODE_SET_METHOD(target, "getHeight"            , imlib2::GetHeight);
  NODE_SET_METHOD(target, "getDataForReadingOnly", imlib2::GetDataForReadingOnly);
  NODE_SET_METHOD(target, "setFormat"            , imlib2::SetFormat);
}

Handle<Value> imlib2::LoadImage(const Arguments& args) {
  HandleScope scope;

  String::Utf8Value filename(args[0]->ToString());
  Imlib_Image image = imlib_load_image(*filename);

  return scope.Close(External::Wrap(image));
}

Handle<Value> imlib2::LoadImageImmediately(const Arguments& args) {
  HandleScope scope;

  String::Utf8Value filename(args[0]->ToString());
  Imlib_Image image = imlib_load_image_immediately(*filename);

  return scope.Close(External::Wrap(image));
}

Handle<Value> imlib2::SaveImage(const Arguments& args) {
  HandleScope scope;

  String::Utf8Value filename(args[0]->ToString());
  imlib_save_image(*filename);

  return Undefined();
}

Handle<Value> imlib2::FreeImage(const Arguments& args) {
  HandleScope scope;

  imlib_free_image();

  return Undefined();
}

Handle<Value> imlib2::ContextSetImage(const Arguments& args) {
  HandleScope scope;

  Imlib_Image image = (Imlib_Image) External::Unwrap(args[0]);
  imlib_context_set_image(image);

  return Undefined();
}

Handle<Value> imlib2::GetWidth(const Arguments& args) {
  HandleScope scope;

  int width = imlib_image_get_width();
  
  return scope.Close(Int32::New(width));
}

Handle<Value> imlib2::GetHeight(const Arguments& args) {
  HandleScope scope;

  int height = imlib_image_get_height();
  
  return scope.Close(Int32::New(height));
}

Handle<Value> imlib2::GetDataForReadingOnly(const Arguments& args) {
  HandleScope scope;

  int width  = imlib_image_get_width();
  int height = imlib_image_get_height();
  int size   = width * height * 4;

  DATA32* data = imlib_image_get_data_for_reading_only();
  Local<Value> result = newInt8Array(size);
  fillArray(result, data, size);

  return scope.Close(result);
}

Handle<Value> imlib2::SetFormat(const Arguments& args) {
  HandleScope scope;

  String::Utf8Value format(args[0]->ToString());
  imlib_image_set_format(*format);

  return Undefined();
}
