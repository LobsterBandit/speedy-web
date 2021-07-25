export function toStringRGBA(rgb) {
  return rgb.a
    ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
    : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

export function transparentize(rgb, opacity = 0.5) {
  rgb.a = 1 - opacity
  return toStringRGBA(rgb)
}

export const COLORS = {
  red: { r: 255, g: 99, b: 132 },
  orange: { r: 255, g: 159, b: 64 },
  yellow: { r: 255, g: 205, b: 86 },
  green: { r: 75, g: 192, b: 192 },
  blue: { r: 54, g: 162, b: 235 },
  purple: { r: 153, g: 102, b: 255 },
  grey: { r: 201, g: 203, b: 207 },
}

const NAMED_COLORS = [
  COLORS.red,
  COLORS.orange,
  COLORS.yellow,
  COLORS.green,
  COLORS.blue,
  COLORS.purple,
  COLORS.grey,
]

export function getColor(index) {
  const i =
    index != null
      ? index % NAMED_COLORS.length
      : Math.floor(Math.random() * NAMED_COLORS.length)
  return NAMED_COLORS[i]
}
