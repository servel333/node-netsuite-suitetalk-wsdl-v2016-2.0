'use strict';

const path = require('path');
const WsdlSchema = require('./WsdlSchema');

exports.path = path.join(__dirname, 'src');
exports.file = path.join(exports.path, 'netsuite.wsdl');
exports.version = '2016_2';

exports.operations = require('./operations.json');

// Namespace prefix : Namespace URI
exports.namespaces = require('./namespaces.json');

var _schema;
exports.getSchema = function(cb){
  if (_schema) { cb(null, _schema); }

  WsdlSchema.getSchema(this.file, function(err, schema){
    if(err) { return cb(err); }
    _schema = schema;
    cb(null, _schema);
  });
};
