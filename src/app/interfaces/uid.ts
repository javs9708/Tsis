export interface Uid {
  puntuationStateC1L:boolean;
  puntuationStateC1D:boolean;
  puntuationStateC2L:boolean;
  puntuationStateC2D:boolean;
  puntuationStateC3L:boolean;
  puntuationStateC3D:boolean;
  uid:string;
}
export interface Usuarios {
  data:any;
}
export interface Candidatos {
  id:string;
  data:any;
}

export interface Comentarios{
  candidate:string;
  comment:string;
  uid:string;
  nombre:string;
  date:number;
}
