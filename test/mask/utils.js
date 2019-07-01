import makeTestSuite from '@zoroaster/mask'
import { parseParams, Decoder } from '../../src/utils'

export const ParseParams = makeTestSuite('test/result/parse-params', {
  getResults() {
    return parseParams(this.input)
  },
  jsProps: ['expected'],
})

export const decoder = makeTestSuite('test/result/decoder', {
  getResults() {
    const dec = new Decoder()
    let result = ''
    this.input.split('\n').forEach((s) => {
      result += dec.write(s)
    })
    return result
  },
})