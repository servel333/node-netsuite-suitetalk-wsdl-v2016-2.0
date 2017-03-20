'use strict';

const path = require('path');

exports.path = path.join(__dirname, 'src');
exports.file = path.join(exports.path, 'netsuite.wsdl');
exports.version = '2016_2';

exports.operations = require('./operations.json');

// Namespace prefix : Namespace URI
exports.namespaces = require('./namespaces.json');
