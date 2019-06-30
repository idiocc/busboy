import Multipart from './types/multipart'
import Urlencoded from './types/urlencoded'
import BusBoy from './BusBoy'

export default class extends BusBoy {
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