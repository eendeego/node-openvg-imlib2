#ifndef NODE_OPENVG_IMLIB2_H_
#define NODE_OPENVG_IMLIB2_H_

#include <node.h>
#include <v8.h>

using namespace v8;

namespace imlib2 {
  static Handle<Value> LoadImage(const Arguments& args);
  static Handle<Value> LoadImageImmediately(const Arguments& args);
  static Handle<Value> SaveImage(const Arguments& args);
  static Handle<Value> FreeImage(const Arguments& args);
  static Handle<Value> ContextSetImage(const Arguments& args);
  static Handle<Value> GetWidth(const Arguments& args);
  static Handle<Value> GetHeight(const Arguments& args);
  static Handle<Value> GetDataForReadingOnly(const Arguments& args);
  static Handle<Value> SetFormat(const Arguments& args);
}

#endif
