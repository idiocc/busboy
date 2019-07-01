import makeTestSuite from '@zoroaster/mask'
import BusBoy from '../../src'

export const multipart = makeTestSuite('test/result/multipart', {
  async getResults() {
    const busboy = new BusBoy({
      limits: this.limits,
      preservePath: this.preservePath,
      headers: {
        'content-type': 'multipart/form-data; boundary=' + this.boundary,
      },
    })
    const results = []

    if (this.events === undefined || this.events.indexOf('field') > -1) {
      busboy.on('field', (key, val, keyTrunc, valTrunc, encoding, contype) => {
        results.push(['field', key, val, keyTrunc, valTrunc, encoding, contype])
      })
    }
    if (this.events === undefined || this.events.indexOf('file') > -1) {
      busboy.on('file', (fieldname, stream, filename, encoding, mimeType) => {
        let nb = 0
        const info = ['file', fieldname, nb, 0, filename, encoding, mimeType]
        results.push(info)
        stream.on('data', (d) => {
          nb += d.length
        }).on('limit', () => {
          ++info[3]
        }).on('end', () => {
          info[2] = nb
          if (stream.truncated)
            ++info[3]
        })
      })
    }

    busboy.end(this.input.replace(/\n/g, '\r\n'))

    return await new Promise((r) => {
      busboy.on('finish', () => {
        r(results)
      }).on('error', ({ message }) => r(message))
    })
  },
  jsProps: ['expected', 'limits', 'events'],
})

export const urlencoded = makeTestSuite('test/result/urlencoded', {
  async getResults() {
    const busboy = new BusBoy({
      limits: this.limits,
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    })
    const results = []

    busboy.on('field', function(key, val, keyTrunc, valTrunc) {
      results.push([key, val, keyTrunc, valTrunc])
    })
    busboy.on('file', () => {
      throw new Error('Unexpected filed')
    })

    busboy.end(this.input.replace(/\n/g, '\r\n'))

    return await new Promise((r) => {
      busboy.on('finish', () => {
        r(results)
      }).on('error', ({ message }) => r(message))
    })
  },
  jsonProps: ['limits', 'expected'],
})