const _BusBoy = require('./depack')

class BusBoy extends _BusBoy {
  /**
   * Busboy is a Writable stream.
   * @param {_goa.BusBoyConfig} opts Options for the program.
   * @param {!Object} [opts.headers] These are the HTTP headers of the incoming request, which are used by individual parsers.
   * @param {number} [opts.highWaterMark] The `highWaterMark` to use for this Busboy instance (Default: WritableStream default).
   * @param {number} [opts.fileHwm] The `highWaterMark` to use for file streams (Default: ReadableStream default).
   * @param {string} [opts.defCharset="utf8"] The default character set to use when one isn't defined. Default `utf8`.
   * @param {boolean} [opts.preservePath=false] If paths in the multipart 'filename' field shall be preserved. Default `false`.
   * @param {_goa.BusBoyLimits} [opts.limits] Various limits on incoming data.
   */
  constructor(opts) {
    super(opts)
  }
}

module.exports = BusBoy

/* typal types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_goa.BusBoyConfig} BusBoyConfig `＠record` Options for the program.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _goa.BusBoyConfig `＠record` Options for the program.
 * @prop {!Object} [headers] These are the HTTP headers of the incoming request, which are used by individual parsers.
 * @prop {number} [highWaterMark] The `highWaterMark` to use for this Busboy instance (Default: WritableStream default).
 * @prop {number} [fileHwm] The `highWaterMark` to use for file streams (Default: ReadableStream default).
 * @prop {string} [defCharset="utf8"] The default character set to use when one isn't defined. Default `utf8`.
 * @prop {boolean} [preservePath=false] If paths in the multipart 'filename' field shall be preserved. Default `false`.
 * @prop {_goa.BusBoyLimits} [limits] Various limits on incoming data.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_goa.BusBoyLimits} BusBoyLimits `＠record` Various limits on incoming data.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _goa.BusBoyLimits `＠record` Various limits on incoming data.
 * @prop {number} [fieldNameSize=100] Max field name size in bytes. Default `100`.
 * @prop {number} [fieldSize=1024] Max field value size in bytes. Default `1024`.
 * @prop {number} [fields=Infinity] Max number of non-file fields. Default `Infinity`.
 * @prop {number} [fileSize=Infinity] For multipart forms, the max file size in bytes. Default `Infinity`.
 * @prop {number} [files=Infinity] For multipart forms, the max number of file fields. Default `Infinity`.
 * @prop {number} [parts=Infinity] For multipart forms, the max number of parts (fields + files). Default `Infinity`.
 * @prop {number} [headerPairs=2000] For multipart forms, the max number of header key=> value pairs to parse. Default `2000`.
 */
