export const levels = Array.from({ length: 70 }, (_, i) => `${i + 1}`)

interface RGB {
  r: number
  g: number
  b: number
  a?: number
}

export function toRGBString(rgb: RGB) {
  return rgb.a
    ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
    : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

export function transparentize(rgb: RGB, opacity = 0.5) {
  rgb.a = 1 - opacity
  return toRGBString(rgb)
}

export const RGB: Record<string, RGB> = {
  red: { r: 255, g: 99, b: 132 },
  orange: { r: 255, g: 159, b: 64 },
  yellow: { r: 255, g: 205, b: 86 },
  green: { r: 75, g: 192, b: 192 },
  blue: { r: 54, g: 162, b: 235 },
  purple: { r: 153, g: 102, b: 255 },
  grey: { r: 201, g: 203, b: 207 },
}

const COLORS_RGB = Object.values(RGB)

export function getColor(index?: number) {
  const i =
    index != null
      ? index % COLORS_RGB.length
      : Math.floor(Math.random() * COLORS_RGB.length)
  return COLORS_RGB[i]
}
