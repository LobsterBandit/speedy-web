import { unzlib } from "fflate"

interface FuncWithVarArgs {
  (...args: unknown[]): void
}

interface DebouncedFunc<F extends FuncWithVarArgs> {
  // (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F>
  (...args: Parameters<F>): ReturnType<F>
  cancel: () => void
}

export function debounce<F extends FuncWithVarArgs>(
  func: F,
  wait: number,
  immediate = false
): DebouncedFunc<F> {
  let timeout: NodeJS.Timeout
  const debounced = (...args: Parameters<F>) => {
    const callNow = immediate && !timeout
    const next = () => func(...args)

    clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) {
      next()
    }

    return void 0
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
  }

  return debounced
}

export function parseAddonExportString(str: string) {
  const u8 = base64DecToArr(str)
  return new Promise((resolve, reject) => {
    unzlib(u8, { consume: true }, (error, data) => {
      if (error) {
        reject(error)
      } else {
        if (data) {
          const s = UTF8ArrToStr(data)
          const json: unknown = JSON.parse(s)
          resolve(json)
        }
      }
    })
  })
}

// https://developer.mozilla.org/en-US/docs/Glossary/Base64#solution_2_%E2%80%93_rewriting_atob_and_btoa_using_typedarrays_and_utf-8
function b64ToUint6(nChr: number) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
    ? nChr - 71
    : nChr > 47 && nChr < 58
    ? nChr + 4
    : nChr === 43
    ? 62
    : nChr === 47
    ? 63
    : 0
}

function base64DecToArr(sBase64: string) {
  const sB64Enc = sBase64.replace(/[^A-Za-z0-9+/]/g, ""),
    nInLen = sB64Enc.length,
    nOutLen = (nInLen * 3 + 1) >> 2,
    taBytes = new Uint8Array(nOutLen)

  for (
    let nMod3: number, nMod4: number, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
    nInIdx < nInLen;
    nInIdx++
  ) {
    nMod4 = nInIdx & 3
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (6 * (3 - nMod4))
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255
      }
      nUint24 = 0
    }
  }

  return taBytes
}

function UTF8ArrToStr(aBytes: Uint8Array) {
  let sView = ""

  for (let nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
    nPart = aBytes[nIdx]
    sView += String.fromCharCode(
      nPart > 251 && nPart < 254 && nIdx + 5 < nLen /* six bytes */
        ? /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
          (nPart - 252) * 1073741824 +
            ((aBytes[++nIdx] - 128) << 24) +
            ((aBytes[++nIdx] - 128) << 18) +
            ((aBytes[++nIdx] - 128) << 12) +
            ((aBytes[++nIdx] - 128) << 6) +
            aBytes[++nIdx] -
            128
        : nPart > 247 && nPart < 252 && nIdx + 4 < nLen /* five bytes */
        ? ((nPart - 248) << 24) +
          ((aBytes[++nIdx] - 128) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 239 && nPart < 248 && nIdx + 3 < nLen /* four bytes */
        ? ((nPart - 240) << 18) +
          ((aBytes[++nIdx] - 128) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 223 && nPart < 240 && nIdx + 2 < nLen /* three bytes */
        ? ((nPart - 224) << 12) +
          ((aBytes[++nIdx] - 128) << 6) +
          aBytes[++nIdx] -
          128
        : nPart > 191 && nPart < 224 && nIdx + 1 < nLen /* two bytes */
        ? ((nPart - 192) << 6) + aBytes[++nIdx] - 128
        : /* nPart < 127 ? */ /* one byte */
          nPart
    )
  }

  return sView
}
