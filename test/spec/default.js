import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import busboy from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof busboy, 'function')
  },
  // async 'calls package without error'() {
  //   await busboy()
  // },
  // async 'gets a link to the fixture'({ fixture }) {
  //   const text = fixture`text.txt`
  //   const res = await busboy({
  //     text,
  //   })
  //   ok(res, text)
  // },
}

export default T