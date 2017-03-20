'use strict';

const soap = require('soap');

var eachArr = function(arr, cb){
  for (var i = 0, len = arr.length; i < len; i++) {
    cb(arr[i], i, arr);
  }
};

var eachObj = function(obj, cb){
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    cb(obj[key], key, obj);
  }
};

var get = function(obj, keypath) {
  var paths = keypath.split('.');

  eachArr(paths, function(path){
    obj = obj && obj[path];
  });

  return obj;
};

var WsdlSchema = module.exports = exports = function(client) {
  this.client = client;
  var schemas = get(this.client, 'wsdl.definitions.schemas');
  this._types = this.loadTypes(schemas);
};

WsdlSchema.prototype.loadTypes = function(schemas){

  var types = {};

  eachObj(schemas, function(schema, namespaceUri){
    var complexTypes = get(schema, 'complexTypes');
    eachObj(complexTypes, function(typeDef, typeName){
      types[typeName] = {
        name: typeName,
        namespaceUri: namespaceUri,
        definition: typeDef,
      };
    });
  });

  return types;
};

WsdlSchema.prototype.getType = function(typeName){
  return this._types[typeName];
};

WsdlSchema.getSchema = function(file, cb){
  soap.createClient(file, function(err, client){
    if(err) { return cb(err); }
    var schema = new WsdlSchema(client);
    cb(null, schema);
  });
};
