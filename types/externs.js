/* typal types/parser.xml externs */
/** @const */
var _goa = {}
/**
 * The config for the parser.
 * @extends {_goa.BusBoyConfig}
 * @record
 */
_goa.BusBoyParserConfig
/**
 * Parsed content type.
 * @type {!Array<string|!Array<String>>}
 */
_goa.BusBoyParserConfig.prototype.parsedConType

/* typal types/index.xml externs */
/**
 * Options for the program.
 * @record
 */
_goa.BusBoyConfig
/**
 * These are the HTTP headers of the incoming request, which are used by individual parsers.
 * @type {(!Object)|undefined}
 */
_goa.BusBoyConfig.prototype.headers
/**
 * The `highWaterMark` to use for this Busboy instance (Default: WritableStream default).
 * @type {number|undefined}
 */
_goa.BusBoyConfig.prototype.highWaterMark
/**
 * The `highWaterMark` to use for file streams (Default: ReadableStream default).
 * @type {number|undefined}
 */
_goa.BusBoyConfig.prototype.fileHwm
/**
 * The default character set to use when one isn't defined. Default `utf8`.
 * @type {string|undefined}
 */
_goa.BusBoyConfig.prototype.defCharset
/**
 * If paths in the multipart 'filename' field shall be preserved.
 * @type {boolean|undefined}
 */
_goa.BusBoyConfig.prototype.preservePath
/**
 * Various limits on incoming data.
 * @type {_goa.BusBoyLimits|undefined}
 */
_goa.BusBoyConfig.prototype.limits
/**
 * Various limits on incoming data.
 * @record
 */
_goa.BusBoyLimits
/**
 * Max field name size in bytes. Default `100`.
 * @type {number|undefined}
 */
_goa.BusBoyLimits.prototype.fieldNameSize
/**
 * Max field value size in bytes. Default `1024`.
 * @type {number|undefined}
 */
_goa.BusBoyLimits.prototype.fieldSize
/**
 * Max number of non-file fields. Default `Infinity`.
 * @type {number|undefined}
 */
_goa.BusBoyLimits.prototype.fields
/**
 * For multipart forms, the max file size in bytes. Default `Infinity`.
 * @type {number|undefined}
 */
_goa.BusBoyLimits.prototype.fileSize
/**
 * For multipart forms, the max number of file fields. Default `Infinity`.
 * @type {number|undefined}
 */
_goa.BusBoyLimits.prototype.files
/**
 * For multipart forms, the max number of parts (fields + files). Default `Infinity`.
 * @type {number|undefined}
 */
_goa.BusBoyLimits.prototype.parts
/**
 * For multipart forms, the max number of header key=> value pairs to parse. Default `2000`.
 * @type {number|undefined}
 */
_goa.BusBoyLimits.prototype.headerPairs

/** * @type {!Object} */
stream.Writable.prototype._events
/** * @type {*} */
stream.Writable.prototype._events.file

/** * @type {!Object} */
stream.Readable.prototype._readableState
/** * @type {boolean} */
stream.Readable.prototype._readableState.sync

/**
 * @interface
 * @param {?} opts
 */
_goa.BusBoyFileStream = function(opts) {}

/**
 * @type {boolean}
 */
_goa.BusBoyFileStream.prototype.truncated

/**
 * @constructor
 * @param {*} busBoy
 * @param {!_goa.BusBoyParserConfig} parserConfig
 */
_goa.BusBoyParser = function(busBoy, parserConfig) {}
_goa.BusBoyParser.prototype.write = function(chunk, cb) {}
_goa.BusBoyParser.prototype.end = function() {}
/**
 * @type {function(!Array<string|!Array<string>>)|!RegExp}
 */
_goa.BusBoyParser.detect