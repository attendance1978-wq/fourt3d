import { Vec3, Mesh } from './core.js'

export function Cube(size=1){
  const s=size/2
  const v=[
    new Vec3(-s,-s,-s),new Vec3(s,-s,-s),
    new Vec3(s,s,-s), new Vec3(-s,s,-s),
    new Vec3(-s,-s,s), new Vec3(s,-s,s),
    new Vec3(s,s,s),  new Vec3(-s,s,s)
  ]
  const e=[
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ]
  return new Mesh(v,e)
}
