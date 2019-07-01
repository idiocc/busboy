import { join } from 'path'
import { debuglog } from 'util'

const LOG = debuglog('@goa/busboy')

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    LOG('init context')
  }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  /**
   * A tagged template that returns the relative path to the fixture.
   * @param {string} file
   * @example
   * fixture`input.txt` // -> test/fixture/input.txt
   */
  fixture(file) {
    const f = file.raw[0]
    return join('test/fixture', f)
  }
  async _destroy() {
    LOG('destroy context')
  }
  formDataSection(key, value) {
    return Buffer.from('\r\n--' + this.BOUNDARY
                      + '\r\nContent-Disposition: form-data; name="'
                      + key + '"\r\n\r\n' + value)
  }
  formDataFile(key, filename, contentType) {
    return Buffer.concat([
      Buffer.from('\r\n--' + this.BOUNDARY + '\r\n'),
      Buffer.from('Content-Disposition: form-data; name="'
                  + key + '"; filename="' + filename + '"\r\n'),
      Buffer.from('Content-Type: ' + contentType + '\r\n\r\n'),
      Buffer.allocUnsafe(100000),
    ])
  }
  get BOUNDARY() {
    const BOUNDARY = 'u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh'
    return BOUNDARY
  }
}