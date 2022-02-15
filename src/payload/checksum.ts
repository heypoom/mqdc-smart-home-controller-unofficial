export function checksum(input: string): string {
  let upperCase = input.trim().toUpperCase()
  let i = 0
  let i2 = 0
  let i3 = 16

  while (true) {
    if (i >= upperCase.length) break

    let index = '0123456789ABCDEF'.indexOf(upperCase.charAt(i))

    if (index < 0) {
      i2 = -1
      break
    }

    i2 += index * i3
    i3 = i3 == 16 ? 1 : 16
    i++
  }

  if (i2 >= 0 && i3 != 1) {
    const n = (((i2 & 255) ^ -1) + 1) & 255

    return n.toString(16).toUpperCase()
  }

  return null
}
