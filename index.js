'use strict';

const path = require('path');

exports.path = path.join(__dirname, 'src');
exports.wsdl = exports.netsuiteWsdl = path.join(exports.path, 'netsuite.wsdl');
exports.version = '2016_2';
