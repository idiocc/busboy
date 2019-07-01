/* start example */
import idio from '@idio/idio'
import render from '@depack/render'
import Busboy from '../src'

(async () => {
  const { app, url } = await idio({
    async post(ctx, next) {
      if (ctx.request.method != 'POST') {
        return await next()
      }
      const busboy = new Busboy({ headers: ctx.request.headers })

      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log(
          'File [%s]: filename: %s, encoding: %s, mimetype: %s',
          fieldname, filename, encoding, mimetype)
        file.on('data', (data) => {
          console.log('File [%s] got %s bytes', fieldname, data.length)
        })
        file.on('end', () => {
          console.log('File [%s] Finished', fieldname)
        })
      })

      busboy.on('field', (
        fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype,
      ) => {
        console.log('Field [%s]: value: %O', fieldname, val)
      })

      ctx.req.pipe(busboy)

      await new Promise((r, j) => {
        busboy.on('finish', () => {
          console.log('Done parsing form!')
          r()
        }).on('error', j)
      })
      ctx.status = 303
      ctx.body = 'OK'
      exitExample(app)
    },
    get(ctx) {
      ctx.body = render(<html>
        <body>
          <form method="POST" encType="multipart/form-data">
            <input type="text" name="textfield" /><br />
            <input type="file" name="filefield" /><br />
            <input type="submit" />
          </form>
        </body>
      </html>)
    },
  })
  console.log(url)
})()
/* end example */

function exitExample(app) {
  app.destroy()
}