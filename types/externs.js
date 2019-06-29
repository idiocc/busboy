/* typal types/index.xml externs */
/** @const */
var _goa = {}
/**
 * Options for the program.
 * @typedef {{ headers: !Object, highWaterMark: number, fileHwm: number, defCharset: (string|undefined), preservePath: (boolean|undefined), limits: (_goa.Limits|undefined) }}
 */
_goa.BusBoyConfig
/**
 * Various limits on incoming data.
 * @typedef {{ fieldNameSize: (number|undefined), fieldSize: (number|undefined), fields: (number|undefined), fileSize: (number|undefined), files: (number|undefined), parts: (number|undefined), headerPairs: (number|undefined) }}
 */
_goa.Limits

/**
 * @type {!Object}
 */
stream.Writable._events