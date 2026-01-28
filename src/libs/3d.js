/* =========================================================
   Mini3D.js – tiny software 3D engine
   ========================================================= */

// ===== Vector =====
export class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }
}

// ===== Camera =====
export class Camera {
  constructor() {
    this.pos = new Vec3(0, 0, -6)
    this.fov = 400
  }
}

// ===== Mesh =====
export class Mesh {
  constructor(vertices, edges) {
    this.vertices = vertices
    this.edges = edges
    this.rotation = new Vec3()
  }
}

// ===== Engine =====
export class Engine {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d')
    this.w = canvas.width
    this.h = canvas.height
    this.camera = new Camera()
    this.meshes = []
  }

  add(mesh) {
    this.meshes.push(mesh)
  }

  rotate(v, r) {
    let { x, y, z } = v

    // X rotation
    let cos = Math.cos(r.x), sin = Math.sin(r.x)
    let y1 = y * cos - z * sin
    let z1 = y * sin + z * cos
    y = y1; z = z1

    // Y rotation
    cos = Math.cos(r.y); sin = Math.sin(r.y)
    let x1 = x * cos + z * sin
    z1 = -x * sin + z * cos
    x = x1; z = z1

    // Z rotation
    cos = Math.cos(r.z); sin = Math.sin(r.z)
    x1 = x * cos - y * sin
    y1 = x * sin + y * cos

    return new Vec3(x1, y1, z)
  }

  project(v) {
    const z = v.z - this.camera.pos.z
    const scale = this.camera.fov / z

    return {
      x: v.x * scale + this.w / 2,
      y: -v.y * scale + this.h / 2
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.ctx.strokeStyle = '#00ffff'

    for (const m of this.meshes) {
      const transformed = m.vertices.map(v =>
        this.project(this.rotate(v, m.rotation))
      )

      for (const [a, b] of m.edges) {
        this.ctx.beginPath()
        this.ctx.moveTo(transformed[a].x, transformed[a].y)
        this.ctx.lineTo(transformed[b].x, transformed[b].y)
        this.ctx.stroke()
      }
    }
  }
}

// ===== Cube Helper =====
export function Cube(size = 1) {
  const s = size / 2

  const v = [
    new Vec3(-s, -s, -s),
    new Vec3(s, -s, -s),
    new Vec3(s, s, -s),
    new Vec3(-s, s, -s),
    new Vec3(-s, -s, s),
    new Vec3(s, -s, s),
    new Vec3(s, s, s),
    new Vec3(-s, s, s)
  ]

  const e = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ]

  return new Mesh(v, e)
}
