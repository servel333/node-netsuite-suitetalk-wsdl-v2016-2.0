Contains the [NetSuite SuiteTalk](http://www.netsuite.com/portal/developers/resources/suitetalk-documentation.shtml) [WSDL_v2016_2_0 files](http://www.netsuite.com/download/WSDL_v2016_2_0.zip) with zero dependencies.

[![npm version](https://badge.fury.io/js/netsuite-suitetalk-wsdl-v2016-2.0.svg)](https://badge.fury.io/js/netsuite-suitetalk-wsdl-v2016-2.0)

## Install

    npm install --save netsuite-suitetalk-wsdl-v2016-2.0

## Usage

```
const soap = require('soap');
const wsdl = require('netsuite-suitetalk-wsdl-v2016-2.0');

soap.createClient(wsdl.file, (err, client) => {
  if(err) {
    console.log(err);
    process.exit(1);
  }

  // client ...
});
```
