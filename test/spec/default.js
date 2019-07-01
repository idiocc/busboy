import { equal, deepEqual } from '@zoroaster/assert'
import Context from '../context'
import BusBoy from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof BusBoy, 'function')
  },
  async 'multipart-stream-pause'({ formDataFile, formDataSection, BOUNDARY }) {
    const reqChunks = [
      Buffer.concat([
        formDataFile('file', 'file.bin', 'application/octet-stream'),
        formDataSection('foo', 'foo value'),
      ]),
      formDataSection('bar', 'bar value'),
      Buffer.from('\r\n--' + BOUNDARY + '--\r\n'),
    ]
    const busboy = new BusBoy({
      headers: {
        'content-type': 'multipart/form-data; boundary=' + BOUNDARY,
      },
    })
    const results = []
    busboy.on('field', (key, val, keyTrunc, valTrunc, encoding, contype) => {
      results.push(['field', key, val, keyTrunc, valTrunc, encoding, contype])
    })
    busboy.on('file', (fieldname, stream, filename, encoding, mimeType) => {
      results.push(['file', fieldname, filename, encoding, mimeType])
      // Simulate a pipe where the destination is pausing (perhaps due to waiting
      // for file system write to finish)
      setTimeout(() => {
        stream.resume()
      }, 10)
    })
    reqChunks.forEach((buf) => {
      busboy.write(buf)
    })
    busboy.end()
    await new Promise((r, j) => {
      busboy.on('finish', r).on('error', j)
    })
    deepEqual(results, [
      ['file', 'file', 'file.bin', '7bit', 'application/octet-stream'],
      ['field', 'foo', 'foo value', false, false, '7bit', 'text/plain'],
      ['field', 'bar', 'bar value', false, false, '7bit', 'text/plain'],
    ])
  },
}

export default T