'use strict';

const _ = require('lodash');
const soap = require('soap');

var WsdlSchema = module.exports = exports = function(client) {
  this.client = client;
  var schemas = _.get(this.client, 'wsdl.definitions.schemas');
  this._types = this.loadTypes(schemas);
};

WsdlSchema.prototype.loadTypes = function(schemas){

  var types = {};

  _.each(schemas, function(schema, namespaceUri){
    var complexTypes = _.get(schema, 'complexTypes');
    _.each(complexTypes, function(typeDef, typeName){
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
