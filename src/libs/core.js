/* ===============================
   fourt3d core.js
   =============================== */

export class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }
}

export class Mesh {
  constructor(vertices = [], edges = []) {
    this.vertices = vertices
    this.edges = edges
    this.rotation = new Vec3()
  }
}

export class Camera {
  constructor() {
    this.pos = new Vec3(0, 0, -6)
    this.fov = 400
  }
}

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
    let x = v.x, y = v.y, z = v.z

    // X
    let c = Math.cos(r.x), s = Math.sin(r.x)
    let y1 = y * c - z * s
    let z1 = y * s + z * c
    y = y1; z = z1

    // Y
    c = Math.cos(r.y); s = Math.sin(r.y)
    let x1 = x * c + z * s
    z1 = -x * s + z * c
    x = x1; z = z1

    // Z
    c = Math.cos(r.z); s = Math.sin(r.z)
    x1 = x * c - y * s
    y1 = x * s + y * c

    return new Vec3(x1, y1, z)
  }

  project(v) {
    const z = v.z - this.camera.pos.z
    if (z <= 0) return null

    const scale = this.camera.fov / z
    return {
      x: v.x * scale + this.w / 2,
      y: -v.y * scale + this.h / 2
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.ctx.strokeStyle = '#0ff'

    for (const m of this.meshes) {
      const pts = m.vertices.map(v => {
        const rv = this.rotate(v, m.rotation)
        return this.project(rv)
      })

      for (const [a, b] of m.edges) {
        if (!pts[a] || !pts[b]) continue
        this.ctx.beginPath()
        this.ctx.moveTo(pts[a].x, pts[a].y)
        this.ctx.lineTo(pts[b].x, pts[b].y)
        this.ctx.stroke()
      }
    }
  }
}
