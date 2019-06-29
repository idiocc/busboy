import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import busboy from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await busboy({
      text: this.input,
    })
    return res
  },
  context: Context,
})