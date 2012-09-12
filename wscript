#!/usr/bin/env python

from os import popen

srcdir = '.'
blddir = 'build'
VERSION = '0.0.1'

def set_options(opt):
  opt.tool_options('compiler_cxx')

def configure(conf):
  conf.check_tool('compiler_cxx')
  conf.check_tool('node_addon')

def build(bld):
  obj = bld.new_task_gen('cxx', 'shlib', 'node_addon')
  obj.target = "node-openvg-imlib2"
  obj.cxxflags = ["-pthread", "-Wall", "-DARG_CHECKS"]
  obj.linkflags = ["-L/usr/lib", "-lImlib2", "-L/usr/lib/arm-linux-gnueabihf", "-lfreetype", "-lz", "-lX11", "-lXext", "-ldl", "-lm"]
  obj.source = ["src/imlib2.cc", "src/util.cc"]
