export const generateId = (length: number): string => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const characterCount = characters.length
  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * characterCount))
  }
  return result
}
