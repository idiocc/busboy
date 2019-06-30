import { Writable } from 'stream'
import { parseParams } from './utils'

export default class Busboy extends Writable {
  /**
   * @param {_goa.BusBoyConfig} [opts]
   */
  constructor(opts = {}) {
    super(/** @type {!stream.WritableOptions} */ ({
      ...(opts.highWaterMark ? { highWaterMark: opts.highWaterMark } : {}),
    }))

    this._done = false
    this._parser = undefined
    this._finished = false
    this.hitFieldsLimit = false
    this.hitFilesLimit = false
    this.hitPartsLimit = false

    this.opts = opts
    if (opts.headers && typeof opts.headers['content-type'] == 'string')
      this.parseHeaders(opts.headers)
    else
      throw new Error('Missing Content-Type')
  }
  /**
   * @param {string|symbol} ev
   * @param {...?} args
   */
  emit(ev, ...args) {
    if (ev == 'finish') {
      if (!this._done) {
        this._parser && this._parser.end()
        return false
      } else if (this._finished) {
        return false
      }
      this._finished = true
    }
    super.emit(ev, ...args)
    return false
  }
  /**
   * This is overridden by index.js file to avoid circular dependencies.
   */
  get TYPES() {
    return []
  }
  parseHeaders(headers) {
    this._parser = undefined
    if (headers['content-type']) {
      const parsed = parseParams(headers['content-type'])
      let matched
      /** @type {_goa.BusBoyParser} */
      let Type
      for (let i = 0; i < this.TYPES.length; ++i) {
        Type = this.TYPES[i]
        if (typeof Type.detect == 'function')
          matched = Type.detect(parsed)
        else
          matched = Type.detect.test(parsed[0])
        if (matched)
          break
      }
      if (matched) {
        const cfg = {
          limits: this.opts.limits,
          headers: headers,
          parsedConType: parsed,
          highWaterMark: this.opts.highWaterMark,
          fileHwm: this.opts.fileHwm,
          defCharset: this.opts.defCharset,
          preservePath: this.opts.preservePath,
        }
        this._parser = new Type(this, cfg)
        return
      }
    }
    throw new Error('Unsupported content type: ' + headers['content-type'])
  }
  _write(chunk, encoding, cb) {
    if (!this._parser)
      return cb(new Error('Not ready to parse. Missing Content-Type?'))
    this._parser.write(chunk, cb)
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').BusBoyConfig} _goa.BusBoyConfig
 */