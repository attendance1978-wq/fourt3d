import { Vec3, Mesh } from './core.js'

export function Triangle(size=1){
  const v=[
    new Vec3(0,size,0),
    new Vec3(-size,-size,0),
    new Vec3(size,-size,0)
  ]
  return new Mesh(v,[[0,1],[1,2],[2,0]])
}
