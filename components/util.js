export function isNumber (str) {
  const number = /^[-+]?[0-9]+$/
  return number.test(str)
}