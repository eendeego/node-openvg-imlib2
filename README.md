# node-openvg-imlib2 (imlib2 bindings for node-openvg)

This module implemenents bindings for Imlib2 and the necessary functions to load images into OpenVG.

## 0. Installation

This library depends on imlib2. To install imlib2:

    apt-get install -y libimlib2 libimlib2-dev

To install node-openvg-imlib2, fetch the source:

    git clone https://github.com/luismreis/node-openvg-imlib2.git

Build the package:

    cd node-openvg-imlib2
    node-waf configure build

To test:

    node-pi sample/hello.js

