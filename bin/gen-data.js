#!/usr/local/bin/node
'use strict';
/* eslint-disable no-alert, no-console */

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const wsdl = require('../');
const xmldoc = require('xmldoc');

const FILENAMES = fs.readdirSync(wsdl.path);
const OUT = path.join(__dirname, '..', 'data.gen');
if (!fs.existsSync(OUT)){
  fs.mkdirSync(OUT);
}

function doFile(filename){
  if (!_.endsWith(filename, '.wsdl') && !_.endsWith(filename, '.xsd')) { return; }
  console.log('Processing: "'+filename+'"');
  var filePath = path.join(wsdl.path, filename);
  var xml = fs.readFileSync(filePath, 'utf8');
  var document = new xmldoc.XmlDocument(xml);
  doDocument(document, filename);
}

function doDocument(node, filename){
  switch(node.name) {
  default: doUnknownNode(filename, [node]); break;
  case undefined: break;
  case 'definitions': doDefinition(node, filename, []); break;
  case 'schema': doSchema(node, filename, []); break;
  case 'xsd:schema': doSchema(node, filename, []); break;
  }
}

function doDefinition(node, filename, parents){
  _.each(node.children, cNode => {
    switch(cNode.name) {
    default: doUnknownNode(filename, parents.concat([node, cNode])); break;
    case undefined: break;
    case 'message': break;
    case 'portType': break;
    case 'binding': break;
    case 'service': break;
    case 'types': break;
    }
  });
}

function doSchema(node, filename, parents) {
  _.each(node.children, cNode => {
    switch(cNode.name) {
    default: doUnknownNode(filename, parents.concat([node, cNode])); break;
    case undefined: break;
    case 'simpleType': doSimpleType(cNode, filename, parents.concat([node])); break;
    case 'complexType': doComplexType(cNode, filename, parents.concat([node])); break;
    case 'element': break;
    case 'import': break;
    case 'xsd:import': break;
    }
  });
}

function doUnknownNode(filename, nodes) {
  var list = nodes.map(function(n){ return '<'+n.name+'>'; }).join('');
  console.log('Unknown node: '+list+'');
}

// simpleType

function doSimpleType(node, filename, parents){

  // <simpleType name="CurrencyLocale">
  //   <restriction base="xsd:string">
  //     <enumeration value="_afghanistanPashto"/>

  var name = node.attr.name;
  var data = {
    name: name,
    type: node.name,
    file: filename,
    enumeration: [],
  };

  _.each(node.children, cNode => {
    switch(cNode.name) {
    default: doUnknownNode(filename, parents.concat([node, cNode])); break;
    case undefined: break;
    case 'restriction': doSimpleTypeRestriction(data, cNode, filename, parents.concat([node])); break;
    }
  });

  fs.writeFileSync(path.join(OUT, 'simpleType.'+name+'.json'), JSON.stringify(data, null, 2));

  return;
}

function doSimpleTypeRestriction(data, node, filename, parents){
  _.each(node.children, cNode => {
    switch(cNode.name) {
    default: doUnknownNode(filename, parents.concat([node, cNode])); break;
    case undefined: break;
    case 'enumeration':
      data.enumeration.push(cNode.attr.value);
      break;
    }
  });
}

// complexType

function doComplexType(complexTypeNode, filename, parents){
  // <complexType name="Deposit">
  //   <complexContent>
  //     <extension base="platformCore:Record">
  //       <attribute name="internalId" type="xsd:string"/>
  //       <sequence>
  //         <element name="account"          type="platformCore:RecordRef"       minOccurs="0"/>
  // <complexType name="CustomerRefundApply">
  //   <sequence>
  //     <element name="apply" type="xsd:boolean" minOccurs="0"/>

  var name = complexTypeNode.attr.name;
  var data = {
    name: name,
    type: complexTypeNode.name,
    file: filename,
    elements: {},
  };

  _.each(complexTypeNode.children, cNode => {

    var args = [data, cNode, filename, parents.concat([complexTypeNode])];

    switch(cNode.name) {
    default: doUnknownNode(filename, parents.concat([complexTypeNode, cNode])); break;
    case undefined       : break;
    case 'simpleContent' : doComplexTypeSimpleContent.apply(null, args); break;
    case 'attribute'     : doComplexTypeAttribute.apply(null, args); break;
    case 'sequence'      : doComplexTypeSequence.apply(null, args); break;
    case 'complexContent': doComplexTypeComplexContent.apply(null, args); break;
    }
  });

  fs.writeFileSync(path.join(OUT, 'complexType.'+name+'.json'), JSON.stringify(data, null, 2));
}

function doComplexTypeSequence(data, node, filename, parents){
  _.each(node.children, cNode => {

    switch(cNode.name) {
    default: doUnknownNode(filename, parents.concat([node, cNode])); break;
    case undefined: break;

    case 'element': doComplexTypeElement(data, cNode, filename, parents.concat([node]));
      break;
    }
  });
}

function doComplexTypeComplexContent(data, node, filename, parents){
  _.each(node.children, cNode => {

    var args = [data, cNode, filename, parents.concat([node])];

    switch(cNode.name) {
    default: doUnknownNode(filename, parents.concat([node, cNode])); break;
    case undefined: break;
    case 'attribute': doComplexTypeAttribute.apply(null, args); break;
    case 'extension': doComplexTypeExtension.apply(null, args); break;
    }
  });
}

function doComplexTypeExtension(data, node, filename, parents){

  data.extends = (''+node.attr.base).split(':').pop();
  data.extendsNamespace = (''+node.attr.base).split(':').shift();

  _.each(node.children, cNode => {

    var args = [data, cNode, filename, parents.concat([node])];

    switch(cNode.name) {
    default: doUnknownNode(filename, parents.concat([node, cNode])); break;
    case undefined: break;
    case 'attribute': doComplexTypeAttribute.apply(null, args); break;
    case 'sequence': doComplexTypeSequence.apply(null, args); break;
    }
  });
}

function doComplexTypeAttribute(data, node, filename, parents){}

function doComplexTypeSimpleContent(data, node, filename, parents){}

function doComplexTypeElement(data, node, filename, parents){
  data.elements[node.attr.name] = node.attr;
  var type = data.elements[node.attr.name].type;
  data.elements[node.attr.name].type = (''+type).split(':').pop();
  data.elements[node.attr.name].typeNamespace = (''+type).split(':').shift();
}

// BASE PARSER
_.each(FILENAMES, filename => doFile(filename));

