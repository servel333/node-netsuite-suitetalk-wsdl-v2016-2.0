'use strict';

const path = require('path');

exports.path = path.join(__dirname, 'src');
exports.file = path.join(exports.path, 'netsuite.wsdl');
exports.version = '2016_2';

// [ "<operation name>"]
exports.operations = require('./data/operations.json');

// { "<namespace prefix>" : "<namespace uri>" }
exports.namespaces = require('./data/namespaces.json');

// { "<complex type name>" : "<namespace uri>" }
exports.complexTypes = require('./data/complexTypes.json');
