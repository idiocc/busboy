# @goa/busboy

[![npm version](https://badge.fury.io/js/%40goa%2Fbusboy.svg)](https://npmjs.org/package/@goa/busboy)

`@goa/busboy` is a[fork](https://github.com/mscdex/busboy) of A Streaming Parser For HTML Form Data For Node.JS written in ES6 and optimised with [JavaScript Compiler](https://compiler.page).

```sh
yarn add @goa/busboy
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [class Busboy](#class-busboy)
  * [File Event](#file-event)
  * [Field Event](#field-event)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import Busboy from '@goa/busboy'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## class Busboy

Busboy is a _Writable_ stream. Emits the following events:

|  **file**   | Emitted for each new file form field found. `transferEncoding` contains the 'Content-Transfer-Encoding' value for the file stream. `mimeType` contains the 'Content-Type' value for the file stream. |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **field**   | Emitted for each new non-file field found.                                                                                                                                                           |
| partsLimit  | Emitted when specified `parts` limit has been reached. No more 'file' or 'field' events will be emitted.                                                              |
| filesLimit  | Emitted when specified `files` limit has been reached. No more 'file' events will be emitted.                                                                         |
| fieldsLimit | Emitted when specified `fields` limit has been reached. No more 'field' events will be emitted.                                                                        |

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true" width="25"></a></p>

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

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true" width="25"></a></p>

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

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/4.svg?sanitize=true" width="25"></a></p>

```constructor => Busboy
[
  ["config", "BusBoyConfig"]
]
```

%TYPEDEF types/index.xml%

```js
/* alanode example/ */
import busboy from '@goa/busboy'

(async () => {
  const res = await busboy({
    text: 'example',
  })
  console.log(res)
})()
```
```

```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/5.svg?sanitize=true"></a></p>

## Copyright

Original Work by [Brian White aka mscdex](https://github.com/mscdex/busboy).

---

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco">
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
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>