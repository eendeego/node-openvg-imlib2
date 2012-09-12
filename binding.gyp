{
  'targets': [
    {
      # have to specify 'liblib' here since gyp will remove the first one :\
      'target_name': 'libnode-openvg-imlib2',
      'sources': [
        'src/imlib2.cc',
        'src/util.cc'
      ],
      'ldflags': [
        "-L/usr/lib",
        "-lImlib2",
        "-L/usr/lib/arm-linux-gnueabihf",
        "-lfreetype",
        "-lz",
        "-lX11",
        "-lXext",
        "-ldl",
        "-lm"
      ],
      'cflags': [
        "-DENABLE_GDB_JIT_INTERFACE",
        "-DBUILDING_NODE_EXTENSION",
        "-Wall"
      ]
    }
  ]
}
