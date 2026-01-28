import { Vec3, Mesh } from './core.js'

export function Hole(r=1,seg=32){
  const v=[], e=[]
  for(let i=0;i<seg;i++){
    const a=i/seg*Math.PI*2
    v.push(new Vec3(Math.cos(a)*r,0,Math.sin(a)*r))
    if(i>0) e.push([i-1,i])
  }
  e.push([seg-1,0])
  return new Mesh(v,e)
}
