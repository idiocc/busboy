import Multipart from './types/multipart'
import Urlencoded from './types/urlencoded'
import _BusBoy from './BusBoy'

/**
 * @implements {_goa.BusBoy}
 */
export default class BusBoy extends _BusBoy {
  /**
   * @param {_goa.BusBoyConfig} opts
   */
  constructor(opts) {
    super(opts)
  }
  get TYPES() {
    return [Multipart, Urlencoded]
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').BusBoyConfig} _goa.BusBoyConfig
 */