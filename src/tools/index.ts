import Base64 from 'js-base64'
import sha1 from 'js-sha1'

/**
 * 密码加密
 * @param pwd
 * @returns {any}
 */
export function AfterPassWord (pwd) {
  let base = 'incool'
  let baseEncode = Base64.Base64.encode(base)
  let baseSha1 = sha1(baseEncode + pwd)
  let result = sha1('q' + baseSha1 + 'c')
  return result
}

export function AfterObjClear (before) {
  let obj = {}
  for (let item in before) {
    console.log(item, 'item')

    if (before[item]) {
      obj[item] = before[item]
    }
  }
  return obj
}
