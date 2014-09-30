var fs = require('fs');
var _ = require('lodash');

var path = process.argv[2];
var mf = JSON.parse(fs.readFileSync(path).toString());

// currently this context doesn't exist
var result = {
  "@context": "http://microformats.org/context.jsonld"
};

// TODO support nested microformats
result["@graph"] = mf.items.map(function(item){
  var ld = {};

  // map types (remove '-' hyphens)
  ld["@type"] = item.type.map(function(type){
    return type.replace('-', '');
  });

  // map properties
  _.each(item.properties, function(value, key){
    ld[key] = value;
  });

  return ld;
});

console.log(JSON.stringify(result));
