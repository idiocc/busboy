import { Writable } from 'stream'
import { parseParams } from './utils'

export default class Busboy extends Writable {
  /**
   * @param {_goa.BusBoyConfig} opts
   */
  constructor(opts) {
    super({
      ...(opts.highWaterMark ? { highWaterMark: opts.highWaterMark } : {}),
    })

    this._done = false
    this._parser = undefined
    this._finished = false

    this.opts = opts
    if (opts.headers && typeof opts.headers['content-type'] == 'string')
      this.parseHeaders(opts.headers)
    else
      throw new Error('Missing Content-Type')
  }
  emit(ev) {
    if (ev == 'finish') {
      if (!this._done) {
        this._parser && this._parser.end()
        return
      } else if (this._finished) {
        return
      }
      this._finished = true
    }
  }
  parseHeaders(headers) {
    this._parser = undefined
    if (headers['content-type']) {
      const parsed = parseParams(headers['content-type'])
      let matched, type
      for (let i = 0; i < this.TYPES.length; ++i) {
        type = this.TYPES[i]
        if (typeof type.detect == 'function')
          matched = type.detect(parsed)
        else
          matched = type.detect.test(parsed[0])
        if (matched)
          break
      }
      if (matched) {
        const cfg = {
          limits: this.opts.limits,
          headers: headers,
          parsedConType: parsed,
          highWaterMark: undefined,
          fileHwm: undefined,
          defCharset: undefined,
          preservePath: false,
        }
        if (this.opts.highWaterMark)
          cfg.highWaterMark = this.opts.highWaterMark
        if (this.opts.fileHwm)
          cfg.fileHwm = this.opts.fileHwm
        cfg.defCharset = this.opts.defCharset
        cfg.preservePath = this.opts.preservePath
        this._parser = type(this, cfg)
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