# @goa/busboy

[![npm version](https://badge.fury.io/js/%40goa%2Fbusboy.svg)](https://www.npmjs.com/package/@goa/busboy)

`@goa/busboy` is a fork of [A Streaming Parser For HTML Form Data For Node.JS](https://github.com/mscdex/busboy) Written In ES6 And Optimised With [JavaScript Compiler](https://compiler.page).

```sh
yarn add @goa/busboy
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`class Busboy`](#class-busboy)
  * [File Event](#file-event)
  * [Field Event](#field-event)
- [`constructor(conf=: !BusBoyConfig)`](#constructorconf-busboyconfig-busboy)
  * [`BusBoyConfig`](#type-busboyconfig)
  * [`BusBoyLimits`](#type-busboylimits)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import Busboy from '@goa/busboy'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## `class Busboy`

Busboy is a _Writable_ stream. Emits the following events:

|         Event         |                                                                                             Description                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [file](#file-event)   | Emitted for each new file form field found. `transferEncoding` contains the 'Content-Transfer-Encoding' value for the file stream. `mimeType` contains the 'Content-Type' value for the file stream. |
| [field](#field-event) | Emitted for each new non-file field found.                                                                                                                                                           |
| partsLimit            | Emitted when specified `parts` limit has been reached. No more 'file' or 'field' events will be emitted.                                                              |
| filesLimit            | Emitted when specified `files` limit has been reached. No more 'file' events will be emitted.                                                                         |
| fieldsLimit           | Emitted when specified `fields` limit has been reached. No more 'field' events will be emitted.                                                                        |

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true" width="25">
</a></p>

### File Event

```ts
busboy.on('file',
  <string> fieldname,
  <ReadableStream> stream,
  <string> filename,
  <string> transferEncoding,
  <string> mimeType
)
```

- Note: if you listen for this event, you should always handle the stream no matter if you care about the file contents or not (e.g. you can simply just do `stream.resume()`; if you want to discard the contents), otherwise the 'finish' event will never fire on the Busboy instance. However, if you don't care about **any** incoming files, you can simply not listen for the 'file' event at all and any/all files will be automatically and safely discarded (these discarded files do still count towards `files` and `parts` limits).
- If a configured file size limit was reached, `stream` will both have a boolean property `truncated` (best checked at the end of the stream) and emit a 'limit' event to notify you when this happens.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true" width="25">
</a></p>

### Field Event

```ts
busboy.on('field',
  <string> fieldname,
  <string> value,
  <boolean> fieldnameTruncated,
  <boolean> valueTruncated,
  <string> transferEncoding,
  <string> mimeType
)
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/4.svg?sanitize=true" width="25">
</a></p>

## <code><ins>constructor</ins>(</code><sub><br/>&nbsp;&nbsp;`conf=: !BusBoyConfig,`<br/></sub><code>): <i>BusBoy</i></code>

 - <kbd>conf</kbd> <em><code><a href="#type-busboyconfig" title="Options for the program.">!BusBoyConfig</a></code></em> (optional): The configuration.

__<a name="type-busboyconfig">`BusBoyConfig`</a>__: Options for the program.


|     Name      |                                              Type                                               |                                        Description                                        | Default |
| ------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------- |
| headers       | <em>!Object</em>                                                                                | These are the HTTP headers of the incoming request, which are used by individual parsers. | -       |
| highWaterMark | <em>number</em>                                                                                 | The `highWaterMark` to use for this Busboy instance (Default: WritableStream default).    | -       |
| fileHwm       | <em>number</em>                                                                                 | The `highWaterMark` to use for file streams (Default: ReadableStream default).            | -       |
| defCharset    | <em>string</em>                                                                                 | The default character set to use when one isn't defined.                                  | `utf8`  |
| preservePath  | <em>boolean</em>                                                                                | If paths in the multipart 'filename' field shall be preserved.                            | `false` |
| limits        | <em><a href="#type-busboylimits" title="Various limits on incoming data.">BusBoyLimits</a></em> | Various limits on incoming data.                                                          | -       |

__<a name="type-busboylimits">`BusBoyLimits`</a>__: Various limits on incoming data.


|     Name      |      Type       |                                 Description                                  |  Default   |
| ------------- | --------------- | ---------------------------------------------------------------------------- | ---------- |
| fieldNameSize | <em>number</em> | Max field name size in bytes.                                                | `100`      |
| fieldSize     | <em>number</em> | Max field value size in bytes.                                               | `1024`     |
| fields        | <em>number</em> | Max number of non-file fields.                                               | `Infinity` |
| fileSize      | <em>number</em> | For multipart forms, the max file size in bytes.                             | `Infinity` |
| files         | <em>number</em> | For multipart forms, the max number of file fields.                          | `Infinity` |
| parts         | <em>number</em> | For multipart forms, the max number of parts (fields + files).               | `Infinity` |
| headerPairs   | <em>number</em> | For multipart forms, the max number of header key=&gt; value pairs to parse. | `2000`     |

The constructor can throw errors:

- Unsupported content type: $type - The Content-Type isn't one Busboy can parse.
- Missing Content-Type - The provided headers don't include Content-Type at all.

```jsx
import idio from '@idio/idio'
import render from '@depack/render'
import Busboy from '@goa/busboy'

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
```
```
http://localhost:5000
Field [textfield]: value: ''
File [filefield]: filename: hi, encoding: 7bit, mimetype: application/octet-stream
File [filefield] got 12 bytes
File [filefield] Finished
Done parsing form!
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/5.svg?sanitize=true">
</a></p>

## Copyright

Original Work by [Brian White aka mscdex](https://github.com/mscdex/busboy).

---

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2019</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio">
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>