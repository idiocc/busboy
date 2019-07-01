var Busboy = require('..');

var path = require('path'),
    inspect = require('util').inspect,
    assert = require('assert');

var EMPTY_FN = function() {};

var t = 0,
    group = path.basename(__filename, '.js') + '/';
var tests = [
  { source: [
      '------WebKitFormBoundaryTB2MiQ36fnSJlrhY--\r\n'
    ],
    boundary: '----WebKitFormBoundaryTB2MiQ36fnSJlrhY',
    expected: [],
    what: 'empty form'
  }
];