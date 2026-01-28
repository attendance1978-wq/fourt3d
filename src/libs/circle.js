import { Vec3, Mesh } from './core.js'

export function Circle(radius = 1, segments = 32){
  const v = []
  const e = []

  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2
    v.push(
      new Vec3(
        Math.cos(a) * radius,
        Math.sin(a) * radius,
        0
      )
    )

    if (i > 0) e.push([i - 1, i])
  }

  // close the circle
  e.push([segments - 1, 0])

  return new Mesh(v, e)
}
