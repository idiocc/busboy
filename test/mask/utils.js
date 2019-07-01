import makeTestSuite from '@zoroaster/mask'
import { parseParams } from '../../src/utils'

export const ParseParams = makeTestSuite('test/result/parse-params', {
  getResults() {
    return parseParams(this.input)
  },
  jsProps: ['expected'],
})