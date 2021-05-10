
const FILE_INPUT_PATH = "./public/css/style-map/style-map-raw.less";
const FILE_OUTPUT_PATH = "./public/css/style-map/style-map-generated.less";

var fs = require('fs');
var CSSJSON = require('./cssjson');
var _ = require('lodash');

function convert_attributes(attributes) {
    if (attributes['font-size']) {
        var fontpx = attributes['font-size'].slice(0, -2);
        attributes['font-size'] = "1rem * (" + fontpx + "/16)";
    }
    if (attributes['line-height']) {
        var linepx = attributes['line-height'].slice(0, -2);
        attributes['line-height'] = "1rem * (" + linepx + "/16)";
    }
    return attributes;
};

function convert_rule(rule) {
    convert_attributes(rule.attributes);
    Object.keys(rule.children).forEach(function (key) {
        convert_rule(rule.children[key]);
    });
}

try {
    console.log("Reading " + FILE_INPUT_PATH);
    var data = fs.readFileSync(FILE_INPUT_PATH, 'utf8');

    var css_as_json = CSSJSON.toJSON(data);
    convert_rule(css_as_json);
    css_as_json.children = _.mapKeys(css_as_json.children, function (value, key) {
        return ".deluxe-" + key.slice(1);
    });
    var css_output = CSSJSON.toCSS(css_as_json);

    fs.writeFileSync(FILE_OUTPUT_PATH, css_output);
    console.log("Success! Writteen to  " + FILE_OUTPUT_PATH);

} catch (e) {
    console.log('Error:', e.stack);
}