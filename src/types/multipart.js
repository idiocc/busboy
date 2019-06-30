
// TODO:
//  * support 1 nested multipart level
//    (see second multipart example here:
//     http://www.w3.org/TR/html401/interact/forms.html#didx-multipartform-data)
//  * support limits.fieldNameSize
//     -- this will require modifications to utils.parseParams

import { Readable } from 'stream'
import Dicer from '@idio/dicer'
import { parseParams, decodeText, basename, getLimits } from '../utils'
import BusBoy from '../BusBoy' // eslint-disable-line

const RE_BOUNDARY = /^boundary$/i
const RE_FIELD = /^form-data$/i
const RE_CHARSET = /^charset$/i
const RE_FILENAME = /^filename$/i
const RE_NAME = /^name$/i

export default class Multipart {
  static get detect() {
    return /^multipart\/form-data/i
  }
  /**
   * @param {BusBoy} boy
   * @param {_goa.BusBoyParserConfig} cfg
   */
  constructor(boy, {
    limits = {}, defCharset = 'utf8', preservePath, fileHwm,
    parsedConType = [], highWaterMark,
  }) {
    let i, len

    const [,boundary] = parsedConType.find((t) => {
      return Array.isArray(t) && RE_BOUNDARY.test(t[0])
    }) || []
    if (typeof boundary != 'string')
      throw new Error('Multipart: Boundary not found')

    function checkFinished() {
      if (nends === 0 && finished && !boy._done) {
        finished = false
        process.nextTick(() => {
          boy._done = true
          boy.emit('finish')
        })
      }
    }

    const {
      partsLimit, filesLimit, fileSizeLimit, fieldsLimit, fieldSizeLimit,
    } = getLimits(limits)

    /** @type {!stream.Readable|undefined} */
    let curFile

    let nfiles = 0,
      nfields = 0,
      nends = 0,
      curField,
      finished = false

    this._needDrain = false
    this._pause = false
    this._cb = undefined
    this._nparts = 0
    this._boy = boy

    const parserCfg = {
      boundary: boundary,
      maxHeaderPairs: limits.headerPairs,
      highWaterMark,
      fileHwm,
    }

    this.parser = new Dicer(parserCfg)
    this.parser.on('drain', () => {
      this._needDrain = false
      if (this._cb && !this._pause) {
        const cb = this._cb
        this._cb = undefined
        cb()
      }
    }).on('error', (err) => {
      boy.emit('error', err)
    }).on('finish', () => {
      finished = true
      checkFinished()
    })

    /** @param {stream.Readable} part */
    const onPart = (part) => {
      if (++this._nparts > partsLimit) {
        this.parser.removeListener('part', onPart)
        this.parser.on('part', skipPart)
        boy.hitPartsLimit = true
        boy.emit('partsLimit')
        return skipPart(part)
      }

      // hack because streams2 _always_ doesn't emit 'end' until nextTick, so let
      // us emit 'end' early since we know the part has ended if we are already
      // seeing the next part
      if (curField) {
        const field = curField
        field.emit('end')
        field.removeAllListeners('end')
      }

      part.on('header', (/** @type {!Object<string, !Array<string>>} */ header) => {
        let contype = 'text/plain'
        let charset = defCharset
        let encoding = '7bit'

        let fieldname,
          filename,
          nsize = 0

        if (header['content-type']) {
          const parsed = parseParams(header['content-type'][0])
          if (parsed[0]) {
            contype = parsed[0].toLowerCase()
            for (i = 0, len = parsed.length; i < len; ++i) {
              if (RE_CHARSET.test(parsed[i][0])) {
                charset = parsed[i][1].toLowerCase()
                break
              }
            }
          }
        }

        if (header['content-disposition']) {
          const parsed = parseParams(header['content-disposition'][0])
          if (!RE_FIELD.test(parsed[0]))
            return skipPart(part)
          for (i = 0, len = parsed.length; i < len; ++i) {
            if (RE_NAME.test(parsed[i][0])) {
              fieldname = decodeText(parsed[i][1], 'binary', 'utf8')
            } else if (RE_FILENAME.test(parsed[i][0])) {
              filename = decodeText(parsed[i][1], 'binary', 'utf8')
              if (!preservePath)
                filename = basename(filename)
            }
          }
        } else
          return skipPart(part)

        if (header['content-transfer-encoding'])
          encoding = header['content-transfer-encoding'][0].toLowerCase()

        let onData,
          onEnd
        if (contype == 'application/octet-stream' || filename !== undefined) {
          // file/binary field
          if (nfiles === filesLimit) {
            if (!boy.hitFilesLimit) {
              boy.hitFilesLimit = true
              boy.emit('filesLimit')
            }
            return skipPart(part)
          }

          ++nfiles

          if (!boy._events.file) {
            this.parser._ignore()
            return
          }

          ++nends
          const file = new FileStream({ highWaterMark: fileHwm })
          curFile = file
          file.on('end', () => {
            --nends
            this._pause = false
            checkFinished()
            if (this._cb && !this._needDrain) {
              const cb = this._cb
              this._cb = undefined
              cb()
            }
          })
          file._read = () => {
            if (!this._pause)
              return
            this._pause = false
            if (this._cb && !this._needDrain) {
              const cb = this._cb
              this._cb = undefined
              cb()
            }
          }
          boy.emit('file', fieldname, file, filename, encoding, contype)

          onData = (data) => {
            if ((nsize += data.length) > fileSizeLimit) {
              var extralen = (fileSizeLimit - (nsize - data.length))
              if (extralen > 0)
                file.push(data.slice(0, extralen))
              file.emit('limit')
              file.truncated = true
              part.removeAllListeners('data')
            } else if (!file.push(data))
              this._pause = true
          }

          onEnd = () => {
            curFile = undefined
            file.push(null)
          }
        } else {
          // non-file field
          if (nfields === fieldsLimit) {
            if (!boy.hitFieldsLimit) {
              boy.hitFieldsLimit = true
              boy.emit('fieldsLimit')
            }
            return skipPart(part)
          }

          ++nfields
          ++nends
          var buffer = '',
            truncated = false
          curField = part

          onData = (data) => {
            if ((nsize += data.length) > fieldSizeLimit) {
              var extralen = (fieldSizeLimit - (nsize - data.length))
              buffer += data.toString('binary', 0, extralen)
              truncated = true
              part.removeAllListeners('data')
            } else
              buffer += data.toString('binary')
          }

          onEnd = () => {
            curField = undefined
            if (buffer.length)
              buffer = decodeText(buffer, 'binary', charset)
            boy.emit('field', fieldname, buffer, false, truncated, encoding, contype)
            --nends
            checkFinished()
          }
        }

        /* As of node@2efe4ab761666 (v0.10.29+/v0.11.14+), busboy had become
           broken. Streams2/streams3 is a huge black box of confusion, but
           somehow overriding the sync state seems to fix things again (and still
           seems to work for previous node versions).
        */
        part._readableState.sync = false

        part.on('data', onData)
        part.on('end', onEnd)
      }).on('error', (err) => {
        if (curFile)
          curFile.emit('error', err)
      })
    }

    this.parser.on('part', onPart)
  }
  end() {
    if (this._nparts === 0 && !this._boy._done) {
      process.nextTick(() => {
        this._boy._done = true
        this._boy.emit('finish')
      })
    } else if (this.parser.writable)
      this.parser.end()
  }
  write(chunk, cb) {
    var r
    if ((r = this.parser.write(chunk)) && !this._pause)
      cb()
    else {
      this._needDrain = !r
      this._cb = cb
    }
  }
}

/**
 * @param {stream.Readable} part
 */
function skipPart(part) {
  part.resume()
}

class FileStream extends Readable {
  constructor(opts) {
    super(opts)
    this.truncated = false
  }
  _read() {}
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').BusBoyParserConfig} _goa.BusBoyParserConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').BusBoyLimits} _goa.BusBoyLimits
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable} stream.Readable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingHttpHeaders} http.IncomingHttpHeaders
 */