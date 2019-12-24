## API

The package is available by importing its default function:

```js
import Busboy from '@goa/busboy'
```

%~%

## `class Busboy`

Busboy is a _Writable_ stream. Emits the following events:

```table
[
  ["Event", "Description"],
  ["[file](#file-event)", "Emitted for each new file form field found. `transferEncoding` contains the 'Content-Transfer-Encoding' value for the file stream. `mimeType` contains the 'Content-Type' value for the file stream."],
  ["[field](#field-event)", "Emitted for each new non-file field found."],
  ["partsLimit", "Emitted when specified `parts` limit has been reached. No more 'file' or 'field' events will be emitted."],
  ["filesLimit", "Emitted when specified `files` limit has been reached. No more 'file' events will be emitted."],
  ["fieldsLimit", "Emitted when specified `fields` limit has been reached. No more 'field' events will be emitted."]
]
```

%~ width="25"%

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

%~ width="25"%

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

%~ width="25"%

<method name="BusBoy.constructor">types/index.xml</method>

<typedef name="BusBoyConfig">types/index.xml</typedef>

<typedef name="BusBoyLimits">types/index.xml</typedef>

The constructor can throw errors:

- Unsupported content type: $type - The Content-Type isn't one Busboy can parse.
- Missing Content-Type - The provided headers don't include Content-Type at all.

%EXAMPLE: example, ../src => @goa/busboy%
%FORK example%

%~%