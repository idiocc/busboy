/* alanode example/ */
import busboy from '../src'

(async () => {
  const res = await busboy({
    text: 'example',
  })
  console.log(res)
})()