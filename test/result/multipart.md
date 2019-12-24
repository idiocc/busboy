## Fields and files
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="file_name_0"

super alpha file
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="file_name_1"

super beta file
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_0"; filename="1k_a.dat"
Content-Type: application/octet-stream

AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_1"; filename="1k_b.dat"
Content-Type: application/octet-stream

BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--

/* boundary */
---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
/**/

/* expected */
[
  ['field', 'file_name_0', 'super alpha file', false, false, '7bit', 'text/plain'],
  ['field', 'file_name_1', 'super beta file', false, false, '7bit', 'text/plain'],
  ['file', 'upload_file_0', 1023, 0, '1k_a.dat', '7bit', 'application/octet-stream'],
  ['file', 'upload_file_1', 1023, 0, '1k_b.dat', '7bit', 'application/octet-stream']
]
/**/

## Fields only
------WebKitFormBoundaryTB2MiQ36fnSJlrhY
Content-Disposition: form-data; name="cont"

some random content
------WebKitFormBoundaryTB2MiQ36fnSJlrhY
Content-Disposition: form-data; name="pass"

some random pass
------WebKitFormBoundaryTB2MiQ36fnSJlrhY
Content-Disposition: form-data; name="bit"

2
------WebKitFormBoundaryTB2MiQ36fnSJlrhY--

/* boundary */
----WebKitFormBoundaryTB2MiQ36fnSJlrhY
/**/

/* expected */
[
  ['field', 'cont', 'some random content', false, false, '7bit', 'text/plain'],
  ['field', 'pass', 'some random pass', false, false, '7bit', 'text/plain'],
  ['field', 'bit', '2', false, false, '7bit', 'text/plain']
]
/**/

## No fields and no files

/* boundary */
----WebKitFormBoundaryTB2MiQ36fnSJlrhY
/**/

/* expected */
[]
/**/

## Fields and files (limits)
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="file_name_0"

super alpha file
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_0"; filename="1k_a.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--

/* boundary */
---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
/**/

/* limits */
{ fileSize: 13, fieldSize: 5 }
/**/

/* expected */
[
  ['field', 'file_name_0', 'super', false, true, '7bit', 'text/plain'],
  ['file', 'upload_file_0', 13, 2, '1k_a.dat', '7bit', 'application/octet-stream']
]
/**/

## Fields and files (limits: 0 files)
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="file_name_0"

super alpha file
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_0"; filename="1k_a.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--

/* boundary */
---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
/**/

/* limits */
{ files: 0 }
/**/

/* expected */
[
  ['field', 'file_name_0', 'super alpha file', false, false, '7bit', 'text/plain'],
]
/**/

## Fields and (ignored) files
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="file_name_0"

super alpha file
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="file_name_1"

super beta file
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_0"; filename="1k_a.dat"
Content-Type: application/octet-stream

AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_1"; filename="1k_b.dat"
Content-Type: application/octet-stream

BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--

/* boundary */
---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
/**/

/* events */
['field']
/**/

/* expected */
[
  ['field', 'file_name_0', 'super alpha file', false, false, '7bit', 'text/plain'],
  ['field', 'file_name_1', 'super beta file', false, false, '7bit', 'text/plain'],
]
/**/


## Files with filenames containing paths
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_0"; filename="/tmp/1k_a.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_1"; filename="C:\\files\\1k_b.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_2"; filename="relative/1k_c.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--

/* boundary */
---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
/**/

/* expected */
[
  ['file', 'upload_file_0', 26, 0, '1k_a.dat', '7bit', 'application/octet-stream'],
  ['file', 'upload_file_1', 26, 0, '1k_b.dat', '7bit', 'application/octet-stream'],
  ['file', 'upload_file_2', 26, 0, '1k_c.dat', '7bit', 'application/octet-stream'],
]
/**/

## Paths to be preserved through the preservePath option
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_0"; filename="/absolute/1k_a.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_1"; filename="C:\\absolute\\1k_b.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_2"; filename="relative/1k_c.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--

/* boundary */
---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
/**/

/* preservePath */
true
/**/

/* expected */
[
  ['file', 'upload_file_0', 26, 0, '/absolute/1k_a.dat', '7bit', 'application/octet-stream'],
  ['file', 'upload_file_1', 26, 0, 'C:\\absolute\\1k_b.dat', '7bit', 'application/octet-stream'],
  ['file', 'upload_file_2', 26, 0, 'relative/1k_c.dat', '7bit', 'application/octet-stream']
]
/**/

## Empty content-type and empty content-disposition
------WebKitFormBoundaryTB2MiQ36fnSJlrhY
Content-Disposition: form-data; name="cont"
Content-Type:

some random content
------WebKitFormBoundaryTB2MiQ36fnSJlrhY
Content-Disposition:

some random pass
------WebKitFormBoundaryTB2MiQ36fnSJlrhY--

/* boundary */
----WebKitFormBoundaryTB2MiQ36fnSJlrhY
/**/

/* expected */
[
  ['field', 'cont', 'some random content', false, false, '7bit', 'text/plain']
]
/**/

## Stopped mid-header
--asdasdasdasd
:)Content-Type: text/plain
:)Content-Disposition: form-data; name="foo"
:)
:)asd
:)--asdasdasdasd--

/* boundary */
asdasdasdasd
/**/

/* expected */
'Unexpected end of multipart data'
/**/

## content-type for fields
------WebKitFormBoundaryTB2MiQ36fnSJlrhY
Content-Disposition: form-data; name="cont"
Content-Type: application/json

{}
------WebKitFormBoundaryTB2MiQ36fnSJlrhY--

/* boundary */
----WebKitFormBoundaryTB2MiQ36fnSJlrhY
/**/

/* expected */
[ ['field', 'cont', '{}', false, false, '7bit', 'application/json'] ]
/**/

## empty form
------WebKitFormBoundaryTB2MiQ36fnSJlrhY--


/* boundary */
----WebKitFormBoundaryTB2MiQ36fnSJlrhY
/**/

/* expected */
[]
/**/

## unicode filenames
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
Content-Disposition: form-data; name="upload_file_0"; filename="🦕.dat"
Content-Type: application/octet-stream

ABCDEFGHIJKLMNOPQRSTUVWXYZ
-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--

/* boundary */
---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k
/**/

/* expected */
[ ['file', 'upload_file_0', 26, 0, '🦕.dat', '7bit', 'application/octet-stream'] ]
/**/