const { TextDecoder } = require(/* depack */'text-decoding')

const RE_ENCODED = /%([a-fA-F0-9]{2})/g

function encodedReplacer(match, byte) {
  return String.fromCharCode(parseInt(byte, 16))
}

/**
 * Parses the content-type header.
 * @param {string} str
 */
export function parseParams(str) {
  let res = [],
    state = 'key',
    charset = '',
    inquote = false,
    escaping = false,
    p = 0,
    tmp = ''

  for (var i = 0, len = str.length; i < len; ++i) {
    if (str[i] === '\\' && inquote) {
      if (escaping)
        escaping = false
      else {
        escaping = true
        continue
      }
    } else if (str[i] == '"') {
      if (!escaping) {
        if (inquote) {
          inquote = false
          state = 'key'
        } else
          inquote = true
        continue
      } else
        escaping = false
    } else {
      if (escaping && inquote)
        tmp += '\\'
      escaping = false
      if ((state === 'charset' || state === 'lang') && str[i] === "'") {
        if (state === 'charset') {
          state = 'lang'
          charset = tmp.substring(1)
        } else
          state = 'value'
        tmp = ''
        continue
      } else if (state == 'key'
                 && (str[i] == '*' || str[i] == '=')
                 && res.length) {
        if (str[i] == '*')
          state = 'charset'
        else
          state = 'value'
        res[p] = [tmp, undefined]
        tmp = ''
        continue
      } else if (!inquote && str[i] == ';') {
        state = 'key'
        if (charset) {
          if (tmp.length) {
            tmp = decodeText(tmp.replace(RE_ENCODED, encodedReplacer),
              'binary',
              charset)
          }
          charset = ''
        }
        if (res[p] === undefined)
          res[p] = tmp
        else
          res[p][1] = tmp
        tmp = ''
        ++p
        continue
      } else if (!inquote && (str[i] === ' ' || str[i] === '\t'))
        continue
    }
    tmp += str[i]
  }
  if (charset && tmp.length) {
    tmp = decodeText(tmp.replace(RE_ENCODED, encodedReplacer),
      'binary',
      charset)
  }

  if (res[p] === undefined) {
    if (tmp)
      res[p] = tmp
  } else
    res[p][1] = tmp

  return res
}

/**
 * @param {string} text
 * @param {string} textEncoding
 * @param {string} destEncoding
 */
export function decodeText(text, textEncoding, destEncoding) {
  let ret
  if (text) {
    try {
      ret = new TextDecoder(destEncoding)
        .decode(Buffer.from(text, textEncoding))
    } catch(e) {
      /* ok */
    }
  }
  return (typeof ret == 'string' ? ret : text)
}
/**
 * @param {Buffer} text
 * @param {string} textEncoding
 * @param {string} destEncoding
 */
export function decodeBuffer(buffer, textEncoding, destEncoding) {
  try {
    buffer = new TextDecoder(destEncoding)
      .decode(buffer)
  } catch(e) {
    /* ok */
  }
  return buffer
  // return (typeof ret == 'string' ? ret : text)
}

const HEX = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ], RE_PLUS = /\+/g

export class Decoder {
  constructor() {
    this.buffer = undefined
  }
  write(str) {
    // Replace '+' with ' ' before decoding
    str = str.replace(RE_PLUS, ' ')
    var res = ''
    var i = 0, p = 0, len = str.length
    for (; i < len; ++i) {
      if (this.buffer !== undefined) {
        if (!HEX[str.charCodeAt(i)]) {
          res += '%' + this.buffer
          this.buffer = undefined
          --i // retry character
        } else {
          this.buffer += str[i]
          ++p
          if (this.buffer.length === 2) {
            res += String.fromCharCode(parseInt(this.buffer, 16))
            this.buffer = undefined
          }
        }
      } else if (str[i] == '%') {
        if (i > p) {
          res += str.substring(p, i)
          p = i
        }
        this.buffer = ''
        ++p
      }
    }
    if (p < len && this.buffer === undefined)
      res += str.substring(p)
    return res
  }
  reset() {
    this.buffer = undefined
  }
}

export function basename(path) {
  if (typeof path != 'string')
    return ''
  for (let i = path.length - 1; i >= 0; --i) {
    switch (path.charCodeAt(i)) {
    case 0x2F: // '/'
    case 0x5C: // '\'
      path = path.slice(i + 1)
      return (path == '..' || path == '.' ? '' : path)
    }
  }
  return (path == '..' || path == '.' ? '' : path)
}


/**
 * @param {_goa.BusBoyLimits} limits
 */
export const getLimits = (limits) => {
  const {
    fieldSize: fieldSizeLimit = 1 * 1024 * 1024,
    fieldNameSize: fieldNameSizeLimit = 100,
    fileSize: fileSizeLimit = Infinity,
    files: filesLimit = Infinity,
    fields: fieldsLimit = Infinity,
    parts: partsLimit = Infinity,
  } = limits
  return {
    fieldSizeLimit, fileSizeLimit, filesLimit, fieldsLimit, partsLimit,
    fieldNameSizeLimit,
  }
}