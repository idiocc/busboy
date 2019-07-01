## No parameters
video/ogg

/* expected */
['video/ogg']
/**/

## No parameters (with separator)
video/ogg;

/* expected */
['video/ogg']
/**/

## No parameters (with separator followed by whitespace)
video/ogg;

/* expected */
['video/ogg']
/**/

## Empty parameter
;video/ogg

/* expected */
['', 'video/ogg']
/**/

## Subtype with asterisk
video/*

/* expected */
['video/*']
/**/

## Unquoted
text/plain; encoding=utf8

/* expected */
['text/plain', ['encoding', 'utf8']]
/**/

## Unquoted empty string
text/plain; encoding=

/* expected */
['text/plain', ['encoding', '']]
/**/

## Quoted
text/plain; encoding="utf8"

/* expected */
['text/plain', ['encoding', 'utf8']]
/**/

## Quotes within quoted
text/plain; greeting="hello \"world\""

/* expected */
['text/plain', ['greeting', 'hello "world"']]
/**/

## Quoted empty string
text/plain; encoding=""

/* expected */
['text/plain', ['encoding', '']]
/**/

## Multiple params with various spacing
text/plain; encoding="utf8";	   foo=bar;test

/* expected */
['text/plain', ['encoding', 'utf8'], ['foo', 'bar'], 'test']
/**/

## Extended parameter (RFC 5987) with language
text/plain; filename*=iso-8859-1'en'%A3%20rates

/* expected */
['text/plain', ['filename', '£ rates']]
/**/

## Extended parameter (RFC 5987) without language
text/plain; filename*=utf-8''%c2%a3%20and%20%e2%82%ac%20rates

/* expected */
['text/plain', ['filename', '£ and € rates']]
/**/

## Extended parameter (RFC 5987) without language #2
text/plain; filename*=utf-8''%E6%B5%8B%E8%AF%95%E6%96%87%E6%A1%A3

/* expected */
['text/plain', ['filename', '测试文档']]
/**/

## Multiple extended parameters (RFC 5987) with mixed charsets
text/plain; filename*=iso-8859-1'en'%A3%20rates; altfilename*=utf-8''%c2%a3%20and%20%e2%82%ac%20rates

/* expected */
['text/plain', ['filename', '£ rates'], ['altfilename', '£ and € rates']]
/**/

## Mixed regular and extended parameters (RFC 5987)
text/plain; filename*=iso-8859-1'en'%A3%20rates; altfilename="foobarbaz"

/* expected */
['text/plain', ['filename', '£ rates'], ['altfilename', 'foobarbaz']]
/**/

## Mixed regular and extended parameters (RFC 5987) #2
text/plain; filename="foobarbaz"; altfilename*=iso-8859-1'en'%A3%20rates

/* expected */
['text/plain', ['filename', 'foobarbaz'], ['altfilename', '£ rates']]
/**/

## Unescaped backslashes should be considered backslashes
text/plain; filename="C:\\folder\\test.png"

/* expected */
['text/plain', ['filename', 'C:\\folder\\test.png']]
/**/

## Escaped double-quotes should be considered double-quotes
text/plain; filename="John \"Magic\" Smith.png"

/* expected */
['text/plain', ['filename', 'John "Magic" Smith.png']]
/**/

## Multiple non-quoted parameters
multipart/form-data; charset=utf-8; boundary=0xKhTmLbOuNdArY

/* expected */
['multipart/form-data', ['charset', 'utf-8'], ['boundary', '0xKhTmLbOuNdArY']]
/**/