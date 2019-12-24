const _BusBoy = require('./busboy')

/**
 * @constructor {_idio.BusBoy}
 */
class BusBoy extends _BusBoy {}

module.exports = BusBoy

/* typal types/parser.xml namespace */
/**
 * @typedef {_goa.BusBoyParserConfig} BusBoyParserConfig `＠record` The config for the parser.
 * @typedef {_goa.BusBoyConfig & _goa.$BusBoyParserConfig} _goa.BusBoyParserConfig `＠record` The config for the parser.
 * @typedef {Object} _goa.$BusBoyParserConfig `＠record` The config for the parser.
 * @prop {!Array<string|!Array<String>>} parsedConType Parsed content type.
 */

/* typal types/index.xml namespace */
/**
 * @typedef {_goa.BusBoyConfig} BusBoyConfig `＠record` Options for the program.
 * @typedef {Object} _goa.BusBoyConfig `＠record` Options for the program.
 * @prop {!Object} [headers] These are the HTTP headers of the incoming request, which are used by individual parsers.
 * @prop {number} [highWaterMark] The `highWaterMark` to use for this Busboy instance (Default: WritableStream default).
 * @prop {number} [fileHwm] The `highWaterMark` to use for file streams (Default: ReadableStream default).
 * @prop {string} [defCharset="utf8"] The default character set to use when one isn't defined. Default `utf8`.
 * @prop {boolean} [preservePath=false] If paths in the multipart 'filename' field shall be preserved. Default `false`.
 * @prop {_goa.BusBoyLimits} [limits] Various limits on incoming data.
 * @typedef {_goa.BusBoyLimits} BusBoyLimits `＠record` Various limits on incoming data.
 * @typedef {Object} _goa.BusBoyLimits `＠record` Various limits on incoming data.
 * @prop {number} [fieldNameSize=100] Max field name size in bytes. Default `100`.
 * @prop {number} [fieldSize=1024] Max field value size in bytes. Default `1024`.
 * @prop {number} [fields=Infinity] Max number of non-file fields. Default `Infinity`.
 * @prop {number} [fileSize=Infinity] For multipart forms, the max file size in bytes. Default `Infinity`.
 * @prop {number} [files=Infinity] For multipart forms, the max number of file fields. Default `Infinity`.
 * @prop {number} [parts=Infinity] For multipart forms, the max number of parts (fields + files). Default `Infinity`.
 * @prop {number} [headerPairs=2000] For multipart forms, the max number of header key=> value pairs to parse. Default `2000`.
 */
